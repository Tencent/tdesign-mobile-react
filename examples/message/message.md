---
title: Message 消息提醒
description: 用于页面消息通知提示，具有成功提示、提醒、警示等功能，通常在顶部出现，可以自动消失或点击关闭。
spline: base
isComponent: true
toc: false
---

## 基础用法

::: demo demos/types message
:::

## API

### Message Props

| 名称            | 类型     | 默认值    | 说明                                                         | 必传 |
| --------------- | -------- | --------- | ------------------------------------------------------------ | ---- |
| className       | String   | -         | 类名                                                         | N    |
| style           | Object   | -         | 样式，TS 类型：`React.CSSProperties`                         | N    |
| closeBtn        | TNode    | undefined | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮。TS 类型：`string                        |boolean |TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N    |
| duration        | Number   | 3000      | 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 | N    |
| theme           | String   | info      | 消息组件风格。可选项：info/success/warning/error。TS 类型：`MessageThemeList`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/message/type.ts) | N    |
| visible         | Boolean  | false     | 是否显示，隐藏时默认销毁组件                                 | N    |
| zIndex          | Number   | -         | 元素层级，样式默认为 5000                                    | N    |
| onClose         | Function |           | TS 类型：`() => void`<br/>关闭 Message 时触发                | N    |
| onClosed        | Function |           | TS 类型：`() => void`<br/>关闭 Message 时并且动画结束后触发  | N    |
| onOpen          | Function |           | TS 类型：`() => void`<br/>展示 Message 时触发                | N    |
| onOpened        | Function |           | TS 类型：`() => void`<br/>展示 Message 时并且动画结束后触发  | N    |
| onVisibleChange | Function |           | TS 类型：`(visible: boolean) => void`<br/>可见性变化时触发   | N    |
