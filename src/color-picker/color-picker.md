:: BASE_DOC ::

## API

### ColorPicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
autoClose | Boolean | true | 自动关闭。在点击遮罩层时自动关闭，不需要手动设置 visible | N
clearable | Boolean | false | 是否可清空 | N
footer | TElement | - | 底部插槽，仅在 `usePopup` 为 `true` 时有效。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
header | TElement | - | 顶部插槽，仅在 `usePopup` 为 `true` 时有效。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
popupProps | Object | {} | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts) | N
usePopup | Boolean | false | 是否使用弹出层包裹颜色选择器 | N
visible | Boolean | false | 是否显示颜色选择器。`usePopup` 为 true 时有效 | N
onClose | Function |  | TS 类型：`(trigger: ColorPickerTrigger) => void`<br/>关闭按钮时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerTrigger = 'overlay'`<br/> | N
