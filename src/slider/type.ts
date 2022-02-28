/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdSliderProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 滑块范围最大值
   * @default 100
   */
  max?: number;
  /**
   * 滑块范围最小值
   * @default 0
   */
  min?: number;
  /**
   * 双游标滑块
   * @default false
   */
  range?: boolean;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 滑块值
   */
  value?: SliderValue;
  /**
   * 滑块值，非受控属性
   */
  defaultValue?: SliderValue;
  /**
   * 滑块值变化时触发
   */
  onChange?: (value: SliderValue) => void;
}

export type SliderValue = number | Array<number>;
