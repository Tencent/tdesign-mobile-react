---
title: Grid 宫格
description: 横向分割的点击单元，用作一组次级功能的入口。
spline: base
isComponent: true
toc: false
---

## 基础用法

::: demo _example/normal grid
:::


### 边框

::: demo _example/border grid
:::

### 内容布局
::: demo _example/layout grid
:::


## API
### Grid Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
align | String | center | 内容对齐方式。可选项：left/center | N
border | Boolean / Object | false | 边框，默认不显示。值为 true 则显示默认边框，值类型为 object 则表示自定义边框样式。TS 类型：`boolean | { color?: string; width?: string; style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'inset' | 'outset' }` | N
column | Number | 4 | 每一行的列数量 | N
gutter | Number | - | 间隔大小 | N

### GridItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
badgeProps | Object | - | 头像右上角提示信息，继承 Badge 组件的全部特性。如：小红点，或者数字。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/grid/type.ts) | N
description | TNode | - | 文本以外的更多描述，辅助信息。可以通过 Props 传入文本，也可以自定义标题节点。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
image | TNode | - | 图片，可以是图片地址，也可以自定义图片节点。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
layout | String | vertical | 内容布局方式。可选项：vertical/horizontal | N
text | TNode | - | 文本，可以通过 Props 传入文本，也可以自定义标题节点。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
