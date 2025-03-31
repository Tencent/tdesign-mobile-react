:: BASE_DOC ::

## API


### Fab Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
buttonProps | Object | - | Typescript：`ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/fab/type.ts) | N
draggable | String / Boolean | false | Typescript：`boolean \| FabDirectionEnum ` `type FabDirectionEnum = 'all' \| 'vertical' \| 'horizontal'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/fab/type.ts) | N
icon | TElement | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
text | String | - | \- | N
yBounds | Array | - | Typescript：`Array<string \| number>` | N
onClick | Function |  | Typescript：`(context: {e: MouseEvent}) => void`<br/> | N
onDragEnd | Function |  | Typescript：`(context: { e: TouchEvent }) => void`<br/> | N
onDragStart | Function |  | Typescript：`(context: { e: TouchEvent }) => void`<br/> | N
