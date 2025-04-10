import React from 'react';
import cx from 'classnames';

import type { TdActionSheetProps } from './type';

import { Button } from '../button';
import { Popup } from '../popup';
import useDefault from '../_util/useDefault';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { actionSheetDefaultProps } from './defaultProps';
import { ActionSheetList } from './ActionSheetList';
import { ActionSheetGrid } from './ActionSheetGrid';

export type ActionSheetProps = TdActionSheetProps & {
  showOverlay?: boolean;
  onVisibleChange?: (value: boolean) => void;
  gridHeight?: number;
};

export const ActionSheet: React.FC<ActionSheetProps> = (props) => {
  const {
    defaultVisible,
    items,
    visible: visibleFromProps,
    theme,
    align,
    showOverlay,
    showCancel,
    cancelText,
    description,
    onClose,
    onSelected,
    onCancel,
    onVisibleChange,
    count,
    gridHeight,
  } = useDefaultProps<ActionSheetProps>(props, actionSheetDefaultProps);

  const actionSheetClass = usePrefixClass('action-sheet');

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
      className={actionSheetClass}
      placement="bottom"
      onVisibleChange={(value) => {
        onChange(value);

        if (!value) onClose?.('overlay');
      }}
      showOverlay={showOverlay}
    >
      <div className={cx(`${actionSheetClass}__content`)}>
        {description ? (
          <p
            className={cx({
              [`${actionSheetClass}__description`]: true,
              [`${actionSheetClass}__description--left`]: align === 'left',
              [`${actionSheetClass}__description--grid`]: theme === 'grid',
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
          <div className={`${actionSheetClass}__footer`}>
            <div className={`${actionSheetClass}__gap-${theme}`}></div>
            <Button className={`${actionSheetClass}__cancel`} variant="text" block onClick={handleCancel}>
              {cancelText}
            </Button>
          </div>
        ) : null}
      </div>
    </Popup>
  );
};

export default ActionSheet;
