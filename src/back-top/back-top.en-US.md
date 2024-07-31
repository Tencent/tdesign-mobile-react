:: BASE_DOC ::

## API


### BackTop Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
container | Function | - | Typescript：`() => HTMLElement` | N
fixed | Boolean | true | \- | N
icon | TNode | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
target | Function | - | Typescript：`() => HTMLElement` | N
text | String | '' | \- | N
theme | String | round | options: round/half-round/round-dark/half-round-dark | N
visibilityHeight | Number | 200 | \- | N
onToTop | Function |  | Typescript：`() => void`<br/> | N
