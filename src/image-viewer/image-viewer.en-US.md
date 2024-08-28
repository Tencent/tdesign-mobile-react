:: BASE_DOC ::

## API


### ImageViewer Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
closeBtn | TNode | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
deleteBtn | TNode | false | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
images | Array | [] | Typescript：`Array<string \| {url: string; align: 'start' \| 'center' \| 'end'; }>` | N
index | Number | 0 | \- | N
defaultIndex | Number | 0 | uncontrolled property | N
maxZoom | Number | 3 | Typescript：`Number` | N
showIndex | Boolean | false | \- | N
visible | Boolean | false | hide or show image viewer | N
defaultVisible | Boolean | false | hide or show image viewer。uncontrolled property | N
onClose | Function |  | Typescript：`(context: { trigger: 'overlay' \| 'close-btn', visible: Boolean, index: Number }) => void`<br/> | N
onDelete | Function |  | Typescript：`(index: Number) => void`<br/> | N
onIndexChange | Function |  | Typescript：`(index: number, context: { trigger: 'prev' \| 'next' \| 'current' }) => void`<br/> | N
