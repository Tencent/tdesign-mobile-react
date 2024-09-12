/**
 * 处理单个number的超限和异常
 * @param {any} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const trimSingleValue = (value: any, min: number, max: number): number => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

/**
 * 处理超限和异常value
 * @param value
 * @param props
 * @returns
 */
export const trimValue = (value: number | number[], props: any): number | number[] => {
  const { min, max, range } = props;

  if (range) {
    if (Array.isArray(value)) {
      const newValue = value.reduce((prev, cur) => trimSingleValue(cur, min, max));
      return newValue[0] <= newValue[1] ? value : [value[1], value[0]];
    }
    return [min, max];
  }

  return trimSingleValue(value, min, max);
};
