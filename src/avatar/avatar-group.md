:: BASE_DOC ::

## API


### AvatarGroup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
cascading | String | 'right-up' | 图片之间的层叠关系，可选值：左侧图片在上和右侧图片在上。可选项：left-up/right-up。TS 类型：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/avatar/type.ts) | N
collapseAvatar | TNode | - | 头像数量超出时，会出现一个头像折叠元素。该元素内容可自定义。默认为 `+N`。示例：`+5`，`...`, `更多`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
max | Number | - | 能够同时显示的最多头像数量 | N
shape | String | - | 形状。优先级低于 Avatar.shape。可选项：circle/round。TS 类型：`ShapeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
size | String | - | 尺寸，示例值：small/medium/large/24px/38px 等。优先级低于 Avatar.size | N
onCollapsedItemClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击头像折叠元素触发 | N
