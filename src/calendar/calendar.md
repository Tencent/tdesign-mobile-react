:: BASE_DOC ::

## API


### Calendar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
autoClose | Boolean | true | 自动关闭；在点击关闭按钮、确认按钮、遮罩层时自动关闭，不需要手动设置 visible | N
confirmBtn | TNode | '' | 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。TS 类型：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
firstDayOfWeek | Number | 0 | 第一天从星期几开始，默认 0 = 周日 | N
format | Function | - | 用于格式化日期的函数。TS 类型：`CalendarFormatType ` `type CalendarFormatType = (day: TDate) => TDate` `type TDateType = 'selected' \| 'disabled' \| 'start' \| 'centre' \| 'end' \| ''` `interface TDate { date: Date; day: number; type: TDateType; className?: string; prefix?: string; suffix?: string;}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
maxDate | Number / Date | - | 最大可选的日期，不传则默认半年后。TS 类型：` number \| Date` | N
minDate | Number / Date | - | 最小可选的日期，不传则默认今天。TS 类型：` number \| Date` | N
title | TNode | '请选择日期' | 标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
type | String | 'single' | 日历的选择类型，single = 单选；multiple = 多选; range = 区间选择。可选项：single/multiple/range | N
usePopup | Boolean | true | 是否使用弹出层包裹日历 | N
value | Number / Array / Date | - | 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组。TS 类型：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
defaultValue | Number / Array / Date | - | 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组。非受控属性。TS 类型：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
visible | Boolean | false | 是否显示日历；`usePopup` 为 true 时有效 | N
onChange | Function |  | TS 类型：`(value: Date) => void`<br/>不显示 confirm-btn 时，完成选择时触发（暂不支持 type = multiple） | N
onClose | Function |  | TS 类型：`(trigger: CalendarTrigger) => void`<br/>关闭按钮时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts)。<br/>`type CalendarTrigger = 'close-btn' \| 'confirm-btn' \| 'overlay'`<br/> | N
onConfirm | Function |  | TS 类型：`(value: Date) => void`<br/>点击确认按钮时触发 | N
onSelect | Function |  | TS 类型：`(value: Date) => void`<br/>点击日期时触发 | N
