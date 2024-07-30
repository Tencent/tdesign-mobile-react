:: BASE_DOC ::

## API

### Loading Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
children | TNode | - | 子元素，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
delay | Number | 0 | 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒 | N
duration | Number | 800 | 加载动画执行完成一次的时间，单位：毫秒 | N
indicator | Boolean | true | 是否显示加载指示符 | N
inheritColor | Boolean | false | 是否继承父元素颜色 | N
layout | String | horizontal | 对齐方式。可选项：horizontal/vertical | N
loading | Boolean | true | 是否处于加载状态 | N
pause | Boolean | false | 是否暂停动画 | N
preventScrollThrough | Boolean | true | 防止滚动穿透，全屏加载模式有效 | N
progress | Number | - | 加载进度 | N
reverse | Boolean | - | 加载动画是否反向 | N
size | String | '40rpx' | 尺寸，示例：40rpx/20px | N
text | TNode | - | 加载提示文案。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
theme | String | circular | 加载组件类型。可选项：circular/spinner/bar/error/dots | N

### loading 或 LoadingPlugin

这是一个插件函数，参数形式为顺序参数（形如：(a, b, c)），而非对象参数（形如：({ a, b, c })）。顺序参数如下，

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
options | Function | - | 必需。TS 类型：`boolean | TdLoadingProps`

插件返回值：`LoadingInstance【interface LoadingInstance { hide: () => void }】`
