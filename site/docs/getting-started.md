---
title: React for Mobile
description: TDesign 适配移动端的组件库，适合在 React 技术栈项目中使用。
spline: explain
---


## 安装
目前组件库处于 Alpha 阶段，快速迭代中，请留意版本变化。

```bash
npm i tdesign-mobile-react
```

## 基础使用

推荐使用 Webpack 或 Rollup 等支持 tree-shaking 特性的构建工具，无需额外配置即可实现组件按需引入：

```js
import { Button } from 'tdesign-mobile-react';
import 'tdesign-mobile-react/es/style/index.css'; // 少量公共样式
```

## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| -- | -- | -- | -- |
| >= 84 | >= 83 | >= 84 | >= 14.1 |
