import React, { FC } from "react";
import useConfig from "tdesign-mobile-react/_util/useConfig";
import { SliderMarks } from "./type";

interface TMarkProps {
  range: boolean;
  value?: [number, number];
  marks?: Array<number> | SliderMarks;
}

const defaultProps = {
  range: false,
  value: null,
  marks: null,
};

const Mark: FC<TMarkProps> = (props) => {
  const { range, value, marks } = props;

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-slider`;

  // 渲染单个刻度
  const renderMark = (item, index, renderIndex = false) => (
    <div
      className={`${name}__mark-text`}
      key={index}
      style={{
        left: `${renderIndex ? index : item}%`,
      }}
    >
      {item}
    </div>
  );

  return range ? (
    <div className={`${name}__mark`}>
      {value.map((item, index) => renderMark(item, index))}
    </div>
  ) : (
    marks && (
      <div className={`${name}__mark`}>
        {Array.isArray(marks)
          ? marks.map((item, index) => renderMark(item, index))
          : Object.keys(marks).map((key) => renderMark(marks[key], key, true))}
      </div>
    )
  );
};

Mark.defaultProps = defaultProps;

export default Mark;
