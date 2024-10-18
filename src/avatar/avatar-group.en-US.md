:: BASE_DOC ::

## API


### AvatarGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
cascading | String | 'right-up' | multiple images cascading。options: left-up/right-up。Typescript：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
collapseAvatar | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
max | Number | - | \- | N
shape | String | - | shape。options: circle/round。Typescript：`ShapeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
size | String | - | size | N
onCollapsedItemClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
