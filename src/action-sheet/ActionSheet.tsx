import React from 'react';
import cx from 'classnames';
import type { TdActionSheetProps } from './type';
import { Button } from '../button';
import { Popup } from '../popup';
import { StyledProps } from '../common';
import useControlled from '../hooks/useControlled';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { actionSheetDefaultProps } from './defaultProps';
import { ActionSheetList } from './ActionSheetList';
import { ActionSheetGrid } from './ActionSheetGrid';

export interface ActionSheetProps extends TdActionSheetProps, StyledProps {}

export const ActionSheet: React.FC<ActionSheetProps> = (props) => {
  const {
    items,
    theme,
    align,
    showOverlay,
    showCancel,
    cancelText,
    description,
    popupProps,
    onClose,
    onSelected,
    onCancel,
    count,
  } = useDefaultProps<ActionSheetProps>(props, actionSheetDefaultProps);

  const actionSheetClass = usePrefixClass('action-sheet');

  const [visible, setVisible] = useControlled(props, 'visible', (visible, context) => {
    if (!visible) {
      onClose?.(context);
    }
  });

  const handleCancel = (ev) => {
    onCancel?.(ev);
  };

  const handleSelected = (idx: number) => {
    const found = items?.[idx];

    onSelected?.(found, idx);

    setVisible(false, { trigger: 'select' });
  };

  return (
    <Popup
      {...popupProps}
      visible={visible}
      className={actionSheetClass}
      placement="bottom"
      onVisibleChange={(value) => {
        setVisible(value, { trigger: 'overlay' });
      }}
      showOverlay={showOverlay}
    >
      <div className={cx(`${actionSheetClass}__content`, `${actionSheetClass}__content--${align}`)}>
        {description ? (
          <p
            className={cx({
              [`${actionSheetClass}__description`]: true,
              [`${actionSheetClass}__description--grid`]: theme === 'grid',
            })}
          >
            {description}
          </p>
        ) : null}
        {theme === 'list' ? <ActionSheetList items={items} align={align} onSelected={handleSelected} /> : null}
        {theme === 'grid' ? (
          <ActionSheetGrid items={items} align={align} onSelected={handleSelected} count={count} />
        ) : null}
        {showCancel ? (
          <div className={`${actionSheetClass}__footer`}>
            <div className={`${actionSheetClass}__gap-${theme}`}></div>
            <Button className={`${actionSheetClass}__cancel`} variant="text" block onClick={handleCancel}>
              {cancelText || '取消'}
            </Button>
          </div>
        ) : null}
      </div>
    </Popup>
  );
};

export default ActionSheet;
