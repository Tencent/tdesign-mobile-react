import React from 'react';
import classNames from 'classnames';
import { SkeletonRowCol, SkeletonRowColObj, TdSkeletonProps } from './type';
import { StyledProps, Styles } from '../common';
import useConfig from '../_util/useConfig';

export type SkeletonProps = TdSkeletonProps & StyledProps;

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { animation, loading = true, rowCol, theme = 'text' } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-skeleton`;

  const completeContent = props.content || props.default || props.children;
  const rootClasses = classNames(`${name}`, `${name}--${theme}`);
  const defaultRowcols: SkeletonRowCol = [1, 1, 1, { width: '70%' }];
  const rowCols: SkeletonRowCol = [];
  if (theme === 'avatar-text') {
    rowCols.push(...defaultRowcols);
  } else if (rowCol) {
    rowCols.push(...rowCol);
  } else {
    rowCols.push(...defaultRowcols);
  }

  const rowClass = `${name}__row`;
  const colClass = classNames(`${name}__col`, `${name}--type-text`, {
    [`${name}--animation-${animation}`]: animation,
  });

  const isNumber = (x: unknown): boolean => Object.prototype.toString.call(x) === '[object Number]';
  const getColItemStyle = (obj: SkeletonRowColObj): Styles => {
    const styleName = [
      'width',
      'height',
      'marginRight',
      'marginLeft',
      'margin',
      'size',
      'background',
      'backgroundColor',
    ];
    const style: Styles = {};
    styleName.forEach((name) => {
      if (name in obj) {
        const px = isNumber(obj[name]) ? `${obj[name]}px` : obj[name];
        if (name === 'size') {
          [style.width, style.height] = [px, px];
        } else {
          style[name] = px;
        }
      }
    });
    return style;
  };

  const parsedRowcols = rowCols.map((item) => {
    if (isNumber(item)) {
      return [
        {
          type: 'text',
          style: {},
        },
      ];
    }
    if (Array.isArray(item)) {
      return item.map((col) => ({
        ...col,
        style: getColItemStyle(col),
      }));
    }

    const nItem = item as SkeletonRowColObj;
    return [
      {
        ...nItem,
        style: getColItemStyle(nItem),
      },
    ];
  });

  return (
    <>
      <div className={rootClasses}>
        {!loading && <>{completeContent}</>}

        {loading && theme === 'avatar-text' && (
          <>
            {/* avater-text */}
            <div className={`${name}__col ${name}--type-circle`}></div>
            <div className={`${name}__paragraph`}>
              {parsedRowcols.map((item, index) => (
                <div className={rowClass} key={index}>
                  {item.map((subItem, subIndex) => (
                    <div key={subIndex} className={colClass} style={subItem.style}></div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {loading && theme === 'text' && (
          <>
            {/* text */}
            {parsedRowcols.map((item, index) => (
              <div className={rowClass} key={index}>
                {item.map((subItem, subIndex) => (
                  <div key={subIndex} className={colClass} style={subItem.style}></div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Skeleton;
