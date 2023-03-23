:: BASE_DOC ::

## API

### Avatar Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，Typescript：`React.CSSProperties` | N
alt | String | - | show it when url is not valid | N
badgeProps | Object | - | Typescript：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
hideOnLoadFailed | Boolean | false | hide image when loading image failed | N
icon | TElement | - | use icon to fill。Typescript：`TNode`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
image | String | - | images url | N
imageProps | Object | - | \- | N
shape | String | circle | shape。options：circle/round。Typescript：`ShapeEnum ` `type ShapeEnum = 'circle' \| 'round'`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
size | String | - | size | N
onError | Function |  | Typescript：`() => void`<br/>trigger on image load failed | N

### AvatarGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，Typescript：`React.CSSProperties` | N
cascading | String | 'right-up' | multiple images cascading。options：left-up/right-up。Typescript：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
collapseAvatar | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
max | Number | - | \- | N
size | String | medium | size | N
