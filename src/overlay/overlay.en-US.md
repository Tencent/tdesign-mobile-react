:: BASE_DOC ::

## API

### Overlay Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
backgroundColor | String | - | \- | N
children | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
duration | Number | 300 | \- | N
preventScrollThrough | Boolean | true | \- | N
visible | Boolean | false | \- | N
zIndex | Number | 1000 | \- | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
