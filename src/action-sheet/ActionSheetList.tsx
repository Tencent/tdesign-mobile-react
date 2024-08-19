import React from 'react';
import cx from 'classnames';

import type { TElement } from 'tdesign-mobile-react/common';
import type { ActionSheetProps } from './ActionSheet';
import type { ActionSheetItem } from './type';

import { Button } from '../button';
import { Badge } from '../badge';
import useConfig from '../_util/useConfig';

type ActionSheetListProps = {
  items: ActionSheetProps['items'];
  align: ActionSheetProps['align'];
  onSelected?: (idx: number) => void;
};

export function ActionSheetList(props: ActionSheetListProps) {
  const { items, align, onSelected } = props;
  const { classPrefix } = useConfig();
  const cls = `${classPrefix}-action-sheet`;

  return (
    <div className={cx(`${cls}__list`)}>
      {items?.map((item, idx) => {
        let label: React.ReactNode;
        let disabled: ActionSheetItem['disabled'];
        let icon: ActionSheetItem['icon'];
        let color: ActionSheetItem['color'];

        if (typeof item === 'string') {
          label = item;
        } else {
          if (item?.badge) {
            label = (
              <Badge
                count={item?.badge?.count}
                max-count={item?.badge?.maxCount}
                dot={item?.badge?.dot}
                content={item?.badge?.content}
                size={item?.badge?.size}
                offset={item?.badge?.offset || [16, -10]}
              >
                <span className={cx([`${cls}__list-item-text`])}>{item?.label}</span>
              </Badge>
            );
          } else {
            label = <span className={cx([`${cls}__list-item-text`])}>{item?.label}</span>;
          }
          disabled = item?.disabled;
          icon = item?.icon;
          color = item?.color;
        }

        return (
          <Button
            key={idx}
            variant="text"
            block
            className={cx({
              [`${cls}__list-item`]: true,
              [`${cls}__list-item--left`]: align === 'left',
            })}
            onClick={() => {
              onSelected?.(idx);
            }}
            disabled={disabled}
            icon={icon as TElement}
            style={{
              color,
            }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
