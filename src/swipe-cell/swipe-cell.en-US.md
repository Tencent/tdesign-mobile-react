:: BASE_DOC ::

## API

### SwipeCell Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
content | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
left | TNode | - | Typescript：`Array<SwipeActionItem> \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
opened | Boolean / Array | false | Typescript：`boolean \| Array<boolean>` | N
right | TNode | - | Typescript：`Array<SwipeActionItem> \| TNode` `interface SwipeActionItem {text: string; className?: string; style?: Styles; sure?: Sure; onClick?: () => void; [key: string]: any }` `type Sure = string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/swipe-cell/type.ts) | N
onChange | Function |  | Typescript：`(value: string) => void`<br/> | N
onClick | Function |  | Typescript：`(action: SwipeActionItem, source: SwipeSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/swipe-cell/type.ts)。<br/>`type SwipeSource = 'left' \| 'right'`<br/> | N
onDragend | Function |  | Typescript：`() => void`<br/> | N
onDragstart | Function |  | Typescript：`() => void`<br/> | N

### SwipeCellInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
showSure | `(sure: string \| TNode, onClick?: SwipeActionItem['onClick'])` | `void` | Typescript：`string \| TNode；如果设置了 `onClick`，则点击二次确认内容时，会执行此onClick方法。<br />[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swipe-cell/type.ts)。<br/>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)
