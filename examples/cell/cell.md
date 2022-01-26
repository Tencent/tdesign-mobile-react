---
title: Cell 宫格
description: 用于各个类别行的信息展示。
spline: base
isComponent: true
toc: false
---

## 单行单元格

::: demo demos/single cell
:::

## 多行单元格

::: demo demos/multiple cell
:::

## API

### Cell Props

| 名称        | 类型     | 默认值 | 说明                                                                                                                                                | 必传                                                                                                    |
| ----------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --- |
| className   | String   | -      | 类名                                                                                                                                                | N                                                                                                       |
| style       | Object   | -      | 样式，TS 类型：`React.CSSProperties`                                                                                                                | N                                                                                                       |
| align       | String   | middle | 内容的对齐方式，默认居中对齐。可选项：top/middle/bottom                                                                                             | N                                                                                                       |
| arrow       | Boolean  | false  | 是否显示右侧箭头                                                                                                                                    | N                                                                                                       |
| bordered    | Boolean  | true   | 是否显示下边框                                                                                                                                      | N                                                                                                       |
| description | TNode    | -      | 下方内容描述。TS 类型：`string                                                                                                                      | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N   |
| hover       | Boolean  | -      | 是否开启点击反馈                                                                                                                                    | N                                                                                                       |
| image       | TNode    | -      | 主图。TS 类型：`string                                                                                                                              | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N   |
| leftIcon    | TElement | -      | 左侧图标，出现在单元格标题的左侧。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N                                                                                                       |
| note        | TNode    | -      | 和标题同行的说明文字。TS 类型：`string                                                                                                              | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N   |
| required    | Boolean  | false  | 是否显示表单必填星号                                                                                                                                | N                                                                                                       |
| rightIcon   | TElement | -      | 最右侧图标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts)                       | N                                                                                                       |
| title       | TNode    | -      | 标题。TS 类型：`string                                                                                                                              | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N   |
| url         | String   | -      | 点击后跳转链接地址。如果值为空，则表示不需要跳转                                                                                                    | N                                                                                                       |
| onClick     | Function |        | TS 类型：`(context: { e: MouseEvent }) => void`<br/>右侧内容。TS 类型：`string                                                                      | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N   |
