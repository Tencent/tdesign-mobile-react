:: BASE_DOC ::

## API

### Toast Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
direction | String | row | options: row/column | N
duration | Number | 2000 | \- | N
icon | TElement | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
message | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
overlayProps | Object | {} | Typescript：`OverlayProps `，[Overlay API Documents](./overlay?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/toast/type.ts) | N
placement | String | middle | options:  top/middle/bottom | N
preventScrollThrough | Boolean | false | \- | N
showOverlay | Boolean | false | \- | N
theme | String | - | options: loading/success/error | N
onClose | Function |  | Typescript：`() => void`<br/> | N
onDestroy | Function |  | Typescript：`() => void`<br/> | N
