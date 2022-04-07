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

  return range ? (
    <div className={`${name}__mark`}>
      {value.map((item, index) => (
        <div
          className={`${name}__mark-text`}
          key={index}
          style={{
            left: `${item}%`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  ) : (
    marks && (
      <div className={`${name}__mark`}>
        {Object.keys(marks).map((key) => (
          <div
            className={`${name}__mark-text`}
            key={key}
            style={{
              left: `${key}%`,
            }}
          >
            {marks[key]}
          </div>
        ))}
      </div>
    )
  );
};

Mark.defaultProps = defaultProps;

export default Mark;
