import React, { FC, useContext, useMemo } from 'react';
import cls from 'classnames';
import { Badge } from 'tdesign-mobile-react';
import { TdGridItemProps, TdGridProps } from './type';
import useConfig from '../_util/useConfig';
import { GridContext } from './GridContext';

import { gridItemDefaultProps } from './defaultProps';

enum LAYOUT {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

const LAYOUT_MAP = {
  [LAYOUT.VERTICAL]: 'column',
  [LAYOUT.HORIZONTAL]: 'row',
} as const;

const getGridItemWidth = (column: number) => `${100 / column}%`;

export interface GridItemProp extends TdGridItemProps, TdGridProps {}

const GridItem: FC<GridItemProp> = (prop) => {
  const { description, image, layout, text, badgeProps, ...resetProps } = prop;

  const { classPrefix } = useConfig();
  const { align, gutter, column, border } = useContext(GridContext);

  const name = `${classPrefix}-grid-item`;

  const rootClass = useMemo(
    () =>
      cls(name, {
        [`${name}--bordered`]: border,
        [`${classPrefix}-is-large`]: column <= 3,
      }),
    [border, name, column, classPrefix],
  );

  const isHorizontal = useMemo(() => layout === 'horizontal', [layout]);

  const rootStyle = useMemo(() => {
    const percent = getGridItemWidth(column);

    if (border && typeof border !== 'boolean') {
      const { color, width, style } = border;
      return {
        borderColor: color,
        borderWidth: width,
        borderStyle: style,
      };
    }

    const flexDirection = isHorizontal ? LAYOUT_MAP.horizontal : LAYOUT_MAP.vertical;
    const gutterSize = gutter ? `${gutter}px` : 0;

    const style = {
      flexBasis: percent,
      flexDirection,
      paddingLeft: gutterSize,
      paddingRight: gutterSize,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      textAlign: align,
    };

    return style;
  }, [column, border, gutter, align, isHorizontal]);

  const imgStyle = useMemo(() => {
    let imgSize = 32;
    if (column >= 5) {
      imgSize = 28;
    } else if (column <= 3) {
      imgSize = 48;
    }
    return {
      width: `${imgSize}px`,
      height: `${imgSize}px`,
    };
  }, [column]);

  const gridItemImage = useMemo(() => {
    if (!image) {
      return null;
    }

    return typeof image === 'string' ? <img src={image} className={`${name}__image`} style={imgStyle} /> : image;
  }, [image, name, imgStyle]);

  const textStyle = useMemo(() => ({ paddingLeft: isHorizontal ? '12px' : 0 }), [isHorizontal]);

  const titleStyle = useMemo(
    () => ({
      paddingTop: isHorizontal ? 0 : '8px',
      marginBottom: '4px',
    }),
    [isHorizontal],
  );

  return (
    <div {...resetProps} className={rootClass} style={rootStyle}>
      {badgeProps ? <Badge {...badgeProps}>{gridItemImage}</Badge> : gridItemImage}
      <div className={`${name}__text`} style={textStyle}>
        <div className={`${name}__title`} style={titleStyle}>
          {text}
        </div>
        <div className={`${name}__description`}>{description}</div>
      </div>
    </div>
  );
};

GridItem.displayName = 'GridItem';
GridItem.defaultProps = gridItemDefaultProps;

export default GridItem;
