---
title: Sticky 吸顶
description: 用于常驻页面顶部的信息，操作展示
spline: base
isComponent: true
toc: false
---

## 基础用法

::: demo _example/base sticky
:::

## API
### Sticky Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
container | String / Function | body | 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`ScrollContainer` | N
disabled | Boolean | false | 是否禁用组件 | N
offsetTop | String / Number | 0 | 吸顶时与顶部的距离，单位`px` | N
zIndex | Number | 99 | 吸顶时的 z-index | N
onScroll | Function |  | TS 类型：`(context: { scrollTop: number, isFixed: boolean }) => void`<br/>滚动时触发，scrollTop: 距离顶部位置，isFixed: 是否吸顶。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
