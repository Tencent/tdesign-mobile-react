:: BASE_DOC ::

## API
### Drawer Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
closeOnOverlayClick | Boolean | undefined | 点击蒙层时是否触发抽屉关闭事件 | N
destroyOnClose | Boolean | false | 抽屉关闭时是否销毁节点 | N
items | Array | - | 抽屉里的列表项。TS 类型：`DrawerItem[] ` `interface DrawerItem { title: string; icon: TNode; }`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/drawer/type.ts) | N
placement | String | right | 抽屉方向。可选项：left/right/top/bottom | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
visible | Boolean | false | 组件是否可见 | N
zIndex | Number | - | 抽屉层级，样式默认为 1500 | N
onClose | Function |  | TS 类型：`(context: DrawerCloseContext) => void`<br/>关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent | KeyboardEvent }`<br/> | N
onItemClick | Function |  | TS 类型：`( index: number, item: DrawerItem, context: { e: MouseEvent }) => void`<br/>点击抽屉里的列表项 | N
onOverlayClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果蒙层存在，点击蒙层时触发 | N
