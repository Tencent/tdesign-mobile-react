import isArray from 'lodash/isArray';
import React, { FC } from 'react';
import cls from 'classnames';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import { SliderMarks } from './type';

interface MarkProps {
  range: boolean;
  value?: [number, number];
  marks?: Array<number> | SliderMarks;
}

const defaultProps = {
  range: false,
};

const Marks: FC<MarkProps> = (props) => {
  const { range, value, marks } = props;

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-slider`;

  // 渲染单个刻度
  const renderMark = (item, index, renderIndex = false) => {
    const textClass = cls({
      [`${name}__mark-text`]: true,
      [`${classPrefix}-is-active`]: value[1] > index,
    });

    return (
      <div
        className={textClass}
        key={index}
        style={{
          left: `${renderIndex ? index : item}%`,
        }}
      >
        {item}
      </div>
    );
  };

  if (range || (marks && isArray(marks))) {
    return <div className={`${name}__mark`}>{value.map((item, index) => renderMark(item, index))}</div>;
  }
  if (marks && !isArray(marks)) {
    return <div className={`${name}__mark`}>{Object.keys(marks).map((key) => renderMark(marks[key], key, true))}</div>;
  }

  return null;
};

Marks.defaultProps = defaultProps;
Marks.displayName = 'Marks';

export default Marks;
