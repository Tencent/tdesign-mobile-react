---
title: Radio 单选框
description: 用于在预设的一组选项中执行单项选择，并呈现选择结果。
spline: base
isComponent: true
toc: false
---

## 单选框

::: demo _example/base radio
:::

## 单选框组

::: demo _example/group radio
:::

## API
### Radio Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
align | String | left | 复选框和内容相对位置。可选项：left/right | N
allowUncheck | Boolean | false | 是否允许取消选中 | N
checked | Boolean | - | 是否选中 | N
defaultChecked | Boolean | - | 是否选中。非受控属性 | N
children | TNode | - | 单选内容，同 label。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
content | TNode | - | 单选内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
contentDisabled | Boolean | - | 是否禁用组件内容（content）触发选中 | N
disabled | Boolean | undefined | 是否为禁用态 | N
icon | String / Array | 'fill-circle' | 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。值为 fill-circle 表示图标为填充型图标，值为 stroke-line 表示图标为描边型图标。TS 类型：`'fill-circle' | 'stroke-line' | Array<TNode>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
label | TNode | - | 主文案。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
maxContentRow | Number | 5 | 内容最大行数限制 | N
maxLabelRow | Number | 3 | 主文案最大行数限制 | N
name | String | - | HTML 元素原生属性 | N
value | String / Number / Boolean | undefined | 单选按钮的值。TS 类型：`RadioValue` `type RadioValue = string | number | boolean`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/radio/type.ts) | N
onChange | Function |  | TS 类型：`(checked: boolean, context: { e: ChangeEvent }) => void`<br/>选中状态变化时触发 | N

### RadioGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
disabled | Boolean | undefined | 是否禁用全部子单选框 | N
name | String | - | HTML 元素原生属性 | N
options | Array | - | 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同。TS 类型：`Array<RadioOption>` `type RadioOption = string | number | RadioOptionObj` `interface RadioOptionObj { label?: string | TNode; value?: string | number; disabled?: boolean }`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/radio/type.ts) | N
value | String / Number / Boolean | undefined | 选中的值。TS 类型：`RadioValue` | N
defaultValue | String / Number / Boolean | undefined | 选中的值。非受控属性。TS 类型：`RadioValue` | N
onChange | Function |  | TS 类型：`(value: RadioValue, context: { e: ChangeEvent }) => void`<br/>选中值发生变化时触发 | N
