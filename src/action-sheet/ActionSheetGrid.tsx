import React, { useMemo } from 'react';
import cx from 'classnames';

import type { ActionSheetProps } from './ActionSheet';
import type { ActionSheetItem } from './type';

import { Grid, GridItem } from '../grid';
import { Swiper } from '../swiper';
import useConfig from '../_util/useConfig';

type ActionSheetGridProps = {
  items: ActionSheetProps['items'];
  align: ActionSheetProps['align'];
  onSelected?: (idx: number) => void;
  count?: number;
};

export function ActionSheetGrid(props: ActionSheetGridProps) {
  const { items, count = 8, onSelected } = props;
  const { classPrefix } = useConfig();
  const cls = `${classPrefix}-action-sheet`;

  const gridColumn = Math.ceil(count / 2);
  const pageNum = Math.ceil(props.items.length / count);

  const actionItems = useMemo(() => {
    const res: ActionSheetProps['items'][] = [];
    for (let i = 0; i < pageNum; i++) {
      const temp = items.slice(i * count, (i + 1) * count);
      res.push(temp);
    }
    return res;
  }, [items, count, pageNum]);

  return (
    <div
      className={cx({
        [`${cls}__grid`]: true,
        [`${cls}__grid--swiper`]: pageNum > 1,
        [`${cls}__dots`]: pageNum > 1,
      })}
    >
      <Swiper
        autoplay={false}
        className={cx(`${cls}__swiper-wrap--base`, pageNum > 1 && `${cls}__swiper-wrap`)}
        loop={false}
        navigation={pageNum > 1 ? { type: 'dots' } : undefined}
        height={169}
      >
        {actionItems.map((item, idx1) => (
          <Swiper.SwiperItem key={idx1}>
            <Grid gutter={0} column={gridColumn}>
              {item.map((it, idx2) => {
                let label: string;
                let image: React.ReactNode;
                let badge: ActionSheetItem['badge'];
                if (typeof it === 'string') {
                  label = it;
                } else {
                  label = it.label;
                  image = it.icon;
                  badge = it.badge;
                }
                return (
                  <GridItem
                    key={`${idx1}-${idx2}`}
                    image={image}
                    text={label}
                    badgeProps={badge}
                    // @ts-ignore
                    onClick={() => {
                      onSelected?.(idx1 * count + idx2);
                    }}
                  />
                );
              })}
            </Grid>
          </Swiper.SwiperItem>
        ))}
      </Swiper>
    </div>
  );
}
