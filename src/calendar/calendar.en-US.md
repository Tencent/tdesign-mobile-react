:: BASE_DOC ::

## API
### Calendar Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，Typescript：`React.CSSProperties` | N
confirmBtn | TNode | '' | Typescript：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
firstDayOfWeek | Number | 0 | \- | N
maxDate | Number / Date | - | \- | N
minDate | Number / Date | - | \- | N
title | String | - | \- | N
type | String | single | options：single/multiple/range | N
value | Number / Array / Date | - | Typescript：`CalendarValue \| CalendarValue[]` `type CalendarValue = number \| Date`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
defaultValue | Number / Array / Date | - | uncontrolled property。Typescript：`CalendarValue \| CalendarValue[]` `type CalendarValue = number \| Date`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/calendar/type.ts) | N
visible | Boolean | false | \- | N
