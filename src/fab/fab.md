:: BASE_DOC ::

## API
### Fab Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
buttonProps | Object | - | 透传至 Button 组件 | N
icon | TElement | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
text | String | - | 文本内容 | N
onClick | Function |  | TS 类型：`(context: {e: MouseEvent}) => void`<br/>悬浮按钮点击事件 | N
