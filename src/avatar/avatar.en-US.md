:: BASE_DOC ::

## API

### Avatar Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
alt | String | - | show it when url is not valid | N
badgeProps | Object | - | Typescript：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
children | TNode | - | children, same as `content`。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
hideOnLoadFailed | Boolean | false | hide image when loading image failed | N
icon | TElement | - | use icon to fill。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
image | String | - | images url | N
imageProps | Object | - | Typescript：`ImageProps`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
shape | String | - | shape。options: circle/round。Typescript：`ShapeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
size | String | - | size | N
onError | Function |  | Typescript：`(context: { e: Event }) => void`<br/>trigger on image load failed | N


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
