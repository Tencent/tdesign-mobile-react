---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

## 🌈 0.5.0 `2024-08-23` 
### ❗ Breaking Changes
- `Input`: 组件重构，新增 `allowInputOverMax`、`autocomplete`、`borderless`、`readonly`、`status` 与`tips` 属性，新增 `onValidate` 事件 @slatejack ([#467](https://github.com/Tencent/tdesign-mobile-react/pull/467))
- `Popup`: 组件重构，新增 `attach`、`closeBtn`、`closeOnOverlayClick`、`destroyOnClose`、`preventScrollThrough` 等属性，新增 `onClose`、`onClosed`、`onOpen`、`onOpened` 等事件 @hkaikai ([#449](https://github.com/Tencent/tdesign-mobile-react/pull/449))
- `Search`: 组件重构，新增 `clearable` 和 `readonly` 属性，新增 `onActionClick` 事件 @slatejack ([#476](https://github.com/Tencent/tdesign-mobile-react/pull/476))
- `Badge`: 组件重构，`size` 默认值变更为 `medium`，`size` 与 `shape` 属性 可选项存在变更 @anlyyao ([#487](https://github.com/Tencent/tdesign-mobile-react/pull/487))
- `CountDown`: 新增 `children`，作用同 `content` 属性，`size` 默认值变更为 `medium` @anlyyao ([#481](https://github.com/Tencent/tdesign-mobile-react/pull/481))
- `Navbar`: 组件重构，移除 `homeIcon`、`leftIcon`、`rightIcon` 等属性、移除 `onHomeClick` 事件，新增 `capsule`、`left`、`leftArrow`、`right` 等属性、新增 `onRightClick` @04756 ([#450](https://github.com/Tencent/tdesign-mobile-react/pull/450))
- `GridItem`:  `badgeProps` 属性更名为 `badge` @Lyan-u ([#448](https://github.com/Tencent/tdesign-mobile-react/pull/448))

### 🚀 Features
- `Link`: 新增 `Link` 组件 @Magicalboys ([#443](https://github.com/Tencent/tdesign-mobile-react/pull/443))
- `Image`: 新增 `referrerpolicy` 和 `fallback` 属性 @anlyyao ([#470](https://github.com/Tencent/tdesign-mobile-react/pull/470))
- `Button`: 新增 `loadingProps` 和 `suffix` 属性，并修复虚框按钮样式错误  @tobytovi ([#469](https://github.com/Tencent/tdesign-mobile-react/pull/469))
- `Grid`: 新增 theme 属性 @Lyan-u ([#448](https://github.com/Tencent/tdesign-mobile-react/pull/448))


## 🌈 0.4.0 `2024-08-16` 
### ❗ Breaking Changes
- `BackTop`: 组件重构，新增  `container` ，`visibilityHeight` 属性，新增 `onToTop` 事件 @ssmyaojiayouya ([#430](https://github.com/Tencent/tdesign-mobile-react/pull/430))
- `Progress`: 组件重构，新增 `theme`, `className`, `style` 属性 @anlyyao ([#387](https://github.com/Tencent/tdesign-mobile-react/pull/387))
- `Divider`: 组件重构，废弃`lineColor` 属性 @liweijie0812 ([#403](https://github.com/Tencent/tdesign-mobile-react/pull/403))
- `Cell`: 组件重构，`Dom` 有调整 @dexterBo ([#432](https://github.com/Tencent/tdesign-mobile-react/pull/432))
- `Loading`: 组件重构，移除 `progress` 属性 ，新增 `attach`、`content `和 `fullscreen` 属性，支持 `loading` 或 `LoadingPlugin` 插件函数 @anlyyao ([#458](https://github.com/Tencent/tdesign-mobile-react/pull/458))
- `Skeleton`: 组件重构，支持 `delay` 属性 @anlyyao ([#455](https://github.com/Tencent/tdesign-mobile-react/pull/455))
### 🚀 Features
- `Result`: 新增 `Result` 组件 @slatejack ([#431](https://github.com/Tencent/tdesign-mobile-react/pull/431))
- `Overlay`: 新增 `Overlay` 组件 @anlyyao ([#451](https://github.com/Tencent/tdesign-mobile-react/pull/451))
- `Tabs`: 支持 `className` 和 `style` 组件参数 @Charles-1999 ([#357](https://github.com/Tencent/tdesign-mobile-react/pull/357))
- `CellGroup`: 新增 `theme` 属性 @dexterBo ([#432](https://github.com/Tencent/tdesign-mobile-react/pull/432))
- `Tag`: 新增 `children` 属性 @taninsist ([#445](https://github.com/Tencent/tdesign-mobile-react/pull/445))
- `CheckTag`: 新增 `variant` 属性 @taninsist ([#445](https://github.com/Tencent/tdesign-mobile-react/pull/445))
- `Icon`: 更新 `Icon` 版本至 `0.3.4` 并补齐示例 @anlyyao ([#456](https://github.com/Tencent/tdesign-mobile-react/pull/456))
### 🐞 Bug Fixes
- `Toast`: 修复 `preventScrollThrough` 属性类型声明与文档描述不一致 @betavs ([#372](https://github.com/Tencent/tdesign-mobile-react/pull/372))
### 🚧 Others
- `Sticky`: 更新组件示例与 `API` 文档 @byq1213 ([#435](https://github.com/Tencent/tdesign-mobile-react/pull/435))

## 🌈 0.3.1 `2022-11-28` 
### 🚀 Features
- `Skeleton`: `rowCols` 支持传入 `borderRadius` @yuanmeda ([#318](https://github.com/Tencent/tdesign-mobile-react/pull/318))
### 🐞 Bug Fixes
- `Checkbox`: 修复点击 content 无反应的问题 @LeeJim ([#328](https://github.com/Tencent/tdesign-mobile-react/pull/328))
### 🚧 Others
- `Badge`: 更新示例代码 @teal-front ([#299](https://github.com/Tencent/tdesign-mobile-react/pull/299))
- `Textarea`: 更新示例代码 @palmcivet ([#301](https://github.com/Tencent/tdesign-mobile-react/pull/301))
- `Search`: 更新示例代码 @palmcivet ([#309](https://github.com/Tencent/tdesign-mobile-react/pull/309))
- `Slider`: 更新示例代码 @yuanmeda ([#313](https://github.com/Tencent/tdesign-mobile-react/pull/313))
- `Steps`: 更新示例代码 @yuanmeda ([#314](https://github.com/Tencent/tdesign-mobile-react/pull/314))
- `Upload`: 更新示例代码 @yuanmeda ([#315](https://github.com/Tencent/tdesign-mobile-react/pull/315))
- `Progress`: 更新示例代码 @xxxlj ([#319](https://github.com/Tencent/tdesign-mobile-react/pull/319))
- `BackTop`: 更新示例代码 @yuanmeda ([#317](https://github.com/Tencent/tdesign-mobile-react/pull/317))
- `PullDownRefresh`: 更新示例代码 @yuanmeda ([#318](https://github.com/Tencent/tdesign-mobile-react/pull/318))
- `Button`: 更新示例代码 @TingShine ([#321](https://github.com/Tencent/tdesign-mobile-react/pull/321))
- `Image`: 更新示例代码 @TingShine ([#322](https://github.com/Tencent/tdesign-mobile-react/pull/322))
- `Stepper`: 更新示例代码 @TingShine ([#308](https://github.com/Tencent/tdesign-mobile-react/pull/308))
- `Progress`: 更新示例代码 @xxxlj ([#319](https://github.com/Tencent/tdesign-mobile-react/pull/319))
- `Loading`: 更新示例代码 #476 @lockiechen ([#323](https://github.com/Tencent/tdesign-mobile-react/pull/323))
- `TabBar`: 更新示例代码 @yuanmeda ([#302](https://github.com/Tencent/tdesign-mobile-react/pull/302))
- `CheckBox`: 更新示例代码 @yuanmeda ([#303](https://github.com/Tencent/tdesign-mobile-react/pull/303))
- `Textarea`: 更新示例代码 @palmcivet ([#301](https://github.com/Tencent/tdesign-mobile-react/pull/301))
- `Fab`: 更新示例代码 @yuanmeda ([#304](https://github.com/Tencent/tdesign-mobile-react/pull/304))
- `Input`: 更新示例代码 @palmcivet ([#300](https://github.com/Tencent/tdesign-mobile-react/pull/300))
- `Divider`: 更新示例代码 @yuanmeda ([#305](https://github.com/Tencent/tdesign-mobile-react/pull/305))
- `Sticky`: 更新示例代码 @yuanmeda ([#306](https://github.com/Tencent/tdesign-mobile-react/pull/306))
- `Rate`: 更新示例代码 @yuanmeda ([#307](https://github.com/Tencent/tdesign-mobile-react/pull/307))

## 🌈 0.3.0 `2022-10-25` 
### 🚀 Features
- `NoticeBar`: 新增公告栏组件 @ZWkang ([#292](https://github.com/Tencent/tdesign-mobile-react/pull/292))
- `Grid`: 透传所有非定义的 props 至根元素 @ZWkang ([#293](https://github.com/Tencent/tdesign-mobile-react/pull/293))
### 🚧 Others
- `Avatar`: 更新示例代码 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-react/pull/296))

## 🌈 0.2.0 `2022-07-25` 
### 🚀 Features
- `Drawer`: 新增抽屉组件 @APlanckFish ([#271](https://github.com/Tencent/tdesign-mobile-react/pull/271))
### 🚧 Others
- 官网更新组件分类 @LeeJim ([#279](https://github.com/Tencent/tdesign-mobile-react/pull/279))

## 🌈 0.1.2 `2022-07-18` 
### 🐞 Bug Fixes
- `Sticky`: 修复 fixed 状态下丢失宽度的问题 @LeeJim ([#277](https://github.com/Tencent/tdesign-mobile-react/pull/277))
### 🚧 Others
- chore: 优化更新日志文档样式 @HQ-Lin ([#276](https://github.com/Tencent/tdesign-mobile-react/pull/276))

## 🌈 0.1.1 `2022-07-12` 
### 🚀 Features
- `Tag`: 视觉升级以及新增支持左图标 @anlyyao ([#270](https://github.com/Tencent/tdesign-mobile-react/pull/270))
- `Progress`: 新增 Progress 组件 @yilaierwang ([#273](https://github.com/Tencent/tdesign-mobile-react/pull/273))
- `Fab` 新增 Fab 组件 @anlyyao ([#266](https://github.com/Tencent/tdesign-mobile-react/pull/266))
### 🐞 Bug Fixes
- `Search`: 修复无法使用的问题 @Perisiguiendo ([#269](https://github.com/Tencent/tdesign-mobile-react/pull/269))
- `Button`: 补充支持 style 属性 @anlyyao ([#266](https://github.com/Tencent/tdesign-mobile-react/pull/266))

## 🌈 0.1.0 `2022-06-29` 

首发版本
