:: BASE_DOC ::

## API

### ColorPicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
autoClose | Boolean | true | 自动关闭。在点击遮罩层时自动关闭，不需要手动设置 visible | N
clearable | Boolean | false | 是否可清空 | N
enableAlpha | Boolean | false | 是否开启透明通道 | N
fixed | Boolean | false | 如果 color-picker 是在一个 `position:fixed` 的区域，需要显式指定属性 fixed 为 true | N
footer | TElement | - | 底部插槽，仅在 `usePopup` 为 `true` 时有效。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
format | String | RGB | 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效。可选项：RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS | N
header | TElement | - | 顶部插槽，仅在 `usePopup` 为 `true` 时有效。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
swatchColors | Array | - | 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色。TS 类型：`Array<string> \| null` | N
type | String | base | 颜色选择器类型。（base 表示仅展示系统预设内容; multiple 表示展示色板和系统预设内容。可选项：base/multiple。TS 类型：`TypeEnum ` `type TypeEnum = 'base' \| 'multiple'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts) | N
value | String | - | 色值 | N
defaultValue | String | - | 色值。非受控属性 | N
visible | Boolean | false | 是否显示颜色选择器。`usePopup` 为 true 时有效 | N
onChange | Function |  | TS 类型：`(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void`<br/>选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-saturation-brightness' \| 'palette-saturation' \| 'palette-brightness' \| 'palette-hue-bar' \| 'palette-alpha-bar' \| 'input' \| 'preset' \| 'recent' `<br/> | N
onClose | Function |  | TS 类型：`(trigger: ColorPickerTrigger) => void`<br/>关闭按钮时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerTrigger = 'overlay'`<br/> | N
onPaletteBarChange | Function |  | TS 类型：`(context: { color: ColorObject }) => void`<br/>调色板控制器的值变化时触发，`context.color` 指调色板控制器的值。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/> | N
