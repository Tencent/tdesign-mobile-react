:: BASE_DOC ::

## API
### Calendar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
confirmBtn | TNode | '' | 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。。TS 类型：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
firstDayOfWeek | Number | 0 | 第一天从星期几开始，默认 0 = 周日 | N
maxDate | Number / Date | - | 最大可选的日期，不传则默认半年后 | N
minDate | Number / Date | - | 最小可选的日期，不传则默认今天 | N
title | String | - | 标题，不传默认为“请选择日期” | N
type | String | single | 日历的选择类型，single = 单选；multiple = 多选; range = 区间选择。可选项：single/multiple/range | N
value | Number / Array / Date | - | 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组。TS 类型：`CalendarValue \| CalendarValue[]` `type CalendarValue = number \| Date`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
defaultValue | Number / Array / Date | - | 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组。非受控属性。TS 类型：`CalendarValue \| CalendarValue[]` `type CalendarValue = number \| Date`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
visible | Boolean | false | 是否显示日历 | N
