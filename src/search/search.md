:: BASE_DOC ::

## API
### Search Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
action | TNode | '' | 自定义右侧操作按钮文字。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
center | Boolean | false | 是否居中 | N
disabled | Boolean | false | 是否禁用 | N
focus | Boolean | false | 是否聚焦 | N
label | String | '' | 左侧文本 | N
leftIcon | TElement | - | 左侧图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
placeholder | String | '' | 占位符 | N
rightIcon | TElement | - | 右侧图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
shape | String | 'square' | 搜索框形状。可选项：square/round | N
value | String | '' | 值 | N
defaultValue | String | '' | 值。非受控属性 | N
onActionClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击右侧操作按钮文字时触发时触发 | N
onBlur | Function |  | TS 类型：`(value: string, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: string, context?: { e?: InputEvent | MouseEvent }) => void`<br/>值发生变化时触发 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除时触发 | N
onFocus | Function |  | TS 类型：`(value: string, context: { e: FocusEvent }) => void`<br/>获得焦点时触发 | N
onSubmit | Function |  | TS 类型：`(value: string, context: { e: KeyboardEvent }) => void`<br/>提交时触发 | N
