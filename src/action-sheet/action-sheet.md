---
title: ActionSheet 动作面板
description: 由用户操作后触发的一种特定的模态弹出框 ，呈现一组与当前情境相关的两个或多个选项。
spline: base
isComponent: true
toc: false
---

### 列表型

列表选项为左右两端的列表；
选项为纯文字；
对于警示操作（如不可逆的破坏性操作），建议将更改操作放在最后并用红色标识。
列表型根据选择项内容的差异，可以有以下不同的样式

{{ list }}

### 宫格型

面板左右贯通，根据操作数量使用 3 列或 4 列的宫格结构，尽量使菜单内容饱满。
菜单选项使用图标加文字的形式呈现。
菜单项的数量超过 8 个时，可作翻页处理。

{{ grid }}

### 宫格型-多页

{{ grid-multiple }}

### 组件状态

{{ status }}

### 组件样式

{{ align }}

## API
### ActionSheet Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | center | 水平对齐方式。可选项：center/left | N
cancelText | String | - | 设置取消按钮的文本 | N
count | Number | 8 | 设置每页展示菜单的数量，仅当 type=grid 时有效 | N
description | String | - | 动作面板描述文字 | N
items | Array | - | 必需。菜单项。TS 类型：`Array<string \| ActionSheetItem>` `interface ActionSheetItem {label: string; color?: string; disabled?: boolean }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts) | Y
showCancel | Boolean | true | 是否显示取消按钮 | N
theme | String | list | 展示类型，列表和表格形式展示。可选项：list/grid | N
visible | Boolean | false | 必需。显示与隐藏。| Y
defaultVisible | Boolean | false | 必需。显示与隐藏。非受控属性 | Y
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onClose | Function |  | TS 类型：`(trigger: ActionSheetTriggerSource) => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts)。<br/>`type ActionSheetTriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | TS 类型：`(selected: ActionSheetItem \| string, index: number) => void`<br/>选择菜单项时触发 | N
