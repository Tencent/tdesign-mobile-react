:: BASE_DOC ::

## API


### Calendar Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
autoClose | Boolean | true | \- | N
confirmBtn | TNode | '' | Typescript：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
firstDayOfWeek | Number | 0 | \- | N
format | Function | - | Typescript：`CalendarFormatType ` `type CalendarFormatType = (day: TDate) => TDate` `type TDateType = 'selected' \| 'disabled' \| 'start' \| 'centre' \| 'end' \| ''` `interface TDate { date: Date; day: number; type: TDateType; className?: string; prefix?: string; suffix?: string;}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
maxDate | Number / Date | - | Typescript：` number \| Date` | N
minDate | Number / Date | - | Typescript：` number \| Date` | N
title | TNode | '请选择日期' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
type | String | 'single' | options: single/multiple/range | N
usePopup | Boolean | true | \- | N
value | Number / Array / Date | - | Typescript：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
defaultValue | Number / Array / Date | - | uncontrolled property。Typescript：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: Date) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: CalendarTrigger) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/calendar/type.ts)。<br/>`type CalendarTrigger = 'close-btn' \| 'confirm-btn' \| 'overlay'`<br/> | N
onConfirm | Function |  | Typescript：`(value: Date) => void`<br/> | N
onSelect | Function |  | Typescript：`(value: Date) => void`<br/> | N
