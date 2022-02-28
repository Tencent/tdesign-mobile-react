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
container | Object | - | 指定容器对应的NodesRef节点为组件的外部容器，滚动时组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置。。TS 类型：`Element` | N
disabled | Boolean | false | 是否禁用组件 | N
offsetTop | String / Number | 0 | 吸顶时与顶部的距离，单位`px` | N
zIndex | Number | 99 | 吸顶时的 z-index | N
onScroll | Function |  | TS 类型：`(context: { scrollTop: number, isFixed: boolean }) => void`<br/>滚动时触发，scrollTop: 距离顶部位置，isFixed: 是否吸顶。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
