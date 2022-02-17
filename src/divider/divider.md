---
title: Divider 分割线
description: 用于分割、组织、细化有一定逻辑的组织元素内容和页面结构。
spline: base
isComponent: true
toc: false
---

## 用法

### 直线分割线

::: demo _example/normal
:::

### 虚线分割线

::: demo _example/normal-dashed
:::

### 垂直分割线

::: demo _example/vertical
:::

### 带文字分割线

::: demo _example/content
:::

### 纯文字分割线

::: demo _example/pure-content
:::

## API
### Divider Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
align | String | center | 文本位置（仅在水平分割线有效）。可选项：left/right/center | N
children | TNode | - | 子元素，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
content | TNode | - | 子元素。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
dashed | Boolean | false | 是否虚线（仅在水平分割线有效） | N
layout | String | horizontal | 分隔线类型有两种：水平和垂直。可选项：horizontal/vertical | N
lineColor | String | - | 分隔线颜色 | N
