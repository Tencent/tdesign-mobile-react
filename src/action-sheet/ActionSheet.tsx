import React, { useState } from 'react';
import cx from 'classnames';

import type { TdActionSheetProps } from './type';

import { Button } from '../button';
import { Popup } from '../popup';
import useConfig from '../_util/useConfig';
import { ActionSheetList } from './ActionSheetList';
import { ActionSheetGrid } from './ActionSheetGrid';

export type ActionSheetProps = TdActionSheetProps & {
  showOverlay?: boolean;
};

export const ActionSheet: React.FC<ActionSheetProps> = (props) => {
  const {
    defaultVisible = false,
    items = [],
    visible,
    theme = 'list',
    align = 'center',
    showOverlay = true,
    showCancel = true,
    cancelText = '取消',
    description,
    onClose,
    onSelected,
    onCancel,
  } = props;

  const { classPrefix } = useConfig();

  const cls = `${classPrefix}-action-sheet`;

  const [innerVisible, setInnerVisible] = useState(defaultVisible);

  const finalVisible = typeof visible !== 'undefined' ? visible : innerVisible;

  const handleCancel = (ev) => {
    onCancel?.(ev);
  };

  const handleSelected = (idx) => {
    const found = items?.[idx];

    onSelected?.(found, idx);

    onClose?.('select');

    setInnerVisible(false);
  };

  return (
    <Popup
      visible={finalVisible}
      className={cls}
      placement="bottom"
      onVisibleChange={(value) => {
        setInnerVisible(value);

        if (!value) onClose?.('overlay');
      }}
      showOverlay={showOverlay}
    >
      <div className={cx(`${cls}__content`)}>
        {description ? (
          <p
            className={cx({
              [`${cls}__description`]: true,
              [`${cls}__description--left`]: align === 'left',
              [`${cls}__description--grid`]: theme === 'grid',
            })}
          >
            {description}
          </p>
        ) : null}
        {theme === 'list' ? <ActionSheetList items={items} align={align} onSelected={handleSelected} /> : null}
        {theme === 'grid' && finalVisible ? (
          <ActionSheetGrid items={items} align={align} onSelected={handleSelected} />
        ) : null}
        {showCancel ? (
          <div className={`${cls}__footer`}>
            <div className={`${cls}__gap-${theme}`}></div>
            <Button className={`${cls}__cancel`} variant="text" block onClick={handleCancel}>
              {cancelText}
            </Button>
          </div>
        ) : null}
      </div>
    </Popup>
  );
};

export default ActionSheet;
