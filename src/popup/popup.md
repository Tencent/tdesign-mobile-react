:: BASE_DOC ::

## API
### Popup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
children | TNode | - | 触发元素，同 triggerElement。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts) | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/center | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
visible | Boolean | false | 是否显示浮层。TS 类型：`boolean` | N
defaultVisible | Boolean | false | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean, trigger: PopupSource)  => void`<br/>当浮层隐藏或显示时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' | 'overlay'`<br/> | N
