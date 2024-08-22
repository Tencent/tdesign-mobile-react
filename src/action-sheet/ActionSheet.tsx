import React from 'react';
import cx from 'classnames';

import type { TdActionSheetProps } from './type';

import { Button } from '../button';
import { Popup } from '../popup';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { ActionSheetList } from './ActionSheetList';
import { ActionSheetGrid } from './ActionSheetGrid';

export type ActionSheetProps = TdActionSheetProps & {
  showOverlay?: boolean;
  onVisibleChange?: (value: boolean) => void;
  gridHeight?: number;
};

export const ActionSheet: React.FC<ActionSheetProps> = (props) => {
  const {
    defaultVisible = false,
    items = [],
    visible: visibleFromProps,
    theme = 'list',
    align = 'center',
    showOverlay = true,
    showCancel = true,
    cancelText = '取消',
    description,
    onClose,
    onSelected,
    onCancel,
    onVisibleChange,
    count,
    gridHeight,
  } = props;

  const { classPrefix } = useConfig();

  const cls = `${classPrefix}-action-sheet`;

  const [visible, onChange] = useDefault(visibleFromProps, defaultVisible, onVisibleChange);

  const handleCancel = (ev) => {
    onCancel?.(ev);
  };

  const handleSelected = (idx) => {
    const found = items?.[idx];

    onSelected?.(found, idx);

    onClose?.('select');

    onChange(false);
  };

  return (
    <Popup
      visible={visible}
      className={cls}
      placement="bottom"
      onVisibleChange={(value) => {
        onChange(value);

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
        {theme === 'grid' && visible ? (
          <ActionSheetGrid
            items={items}
            align={align}
            onSelected={handleSelected}
            count={count}
            gridHeight={gridHeight}
          />
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
