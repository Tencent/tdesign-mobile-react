---
title: Indexes 索引
description: 用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。
spline: navigation
isComponent: true
---

## 引入

### 基础用法



## 代码演示

### 基础索引


## API

### Indexes Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
height | Number | - | 列表高度，未设置默认占满设备高度 | N
list | Array | [] | 必需。索引列表的列表数据。每个元素包含三个字元素，index(string)：索引值，例如1，2，3，...或A，B，C等；title(string): 索引标题，可不填将默认设为索引值；children(Array<{title: string}>): 子元素列表，title为子元素的展示文案。。TS 类型：`ListItem[] ` `interface ListItem { title: string;  index: string;  children: { title: string; [key: string]: any} [] }`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/indexes/type.ts) | Y
onSelect | Function |  | TS 类型：`(indexes: { groupIndex: string; childrenIndex: number }) => void`<br/>点击行元素时触发事件 | N
