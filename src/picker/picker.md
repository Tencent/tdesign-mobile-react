:: BASE_DOC ::

## API


### Picker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
cancelBtn | String / Boolean / Object | true | 取消按钮文字。TS 类型：`boolean \| string \| ButtonProps` | N
columns | Array / Function | [] | 必需。配置每一列的选项。TS 类型：`Array<PickerColumn> \| ((item: Array<PickerValue>)  => Array<PickerColumn>)` `type PickerColumn = PickerColumnItem[]` `interface PickerColumnItem { label: string,value: string}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/picker/type.ts) | Y
confirmBtn | String / Boolean / Object | true | 确定按钮文字。TS 类型：`boolean \| string \| ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/picker/type.ts) | N
header | TNode | true | 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
renderLabel | Function | - | 自定义label。TS 类型：`(item: PickerColumnItem) => string` | N
title | String | '' | 标题 | N
value | Array | - | 选中值。TS 类型：`Array<PickerValue>` `type PickerValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`Array<PickerValue>` `type PickerValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/picker/type.ts) | N
visible | Boolean | false | 是否显示 | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onChange | Function |  | TS 类型：`(value: Array<PickerValue>, context: { columns: Array<PickerContext>, e: MouseEvent })  => void`<br/>选中变化时候触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/picker/type.ts)。<br/>`interface PickerContext{ column: number,index: number }`<br/> | N
onConfirm | Function |  | TS 类型：`(value: Array<PickerValue>, context: { index: number[], e: MouseEvent, label: string[] }) => void`<br/>点击确认按钮时触发 | N
onPick | Function |  | TS 类型：`(value: Array<PickerValue>,context: PickerContext) => void`<br/>任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标 | N
