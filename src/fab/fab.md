:: BASE_DOC ::

## API

### Fab Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
buttonProps | Object | - | 透传至 Button 组件。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/fab/type.ts) | N
draggable | String / Boolean | false | 是否可拖拽。`true` / `'all'`可拖动<br>`'vertical'`可垂直拖动<br>`'horizontal'`可水平拖动<br>`false`禁止拖动。TS 类型：`boolean \| FabDirectionEnum ` `type FabDirectionEnum = 'all' \| 'vertical' \| 'horizontal'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/fab/type.ts) | N
icon | TElement | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
text | String | - | 文本内容 | N
yBounds | Array | - | 设置垂直方向边界限制，示例：[48, 48] 或 ['96px', 80]。TS 类型：`Array<string \| number>` | N
onClick | Function |  | TS 类型：`(context: {e: MouseEvent}) => void`<br/>悬浮按钮点击事件 | N
onDragEnd | Function |  | TS 类型：`(context: { e: TouchEvent }) => void`<br/>结束拖拽时触发 | N
onDragStart | Function |  | TS 类型：`(context: { e: TouchEvent }) => void`<br/>开始拖拽时触发 | N
