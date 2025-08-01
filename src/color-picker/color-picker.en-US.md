:: BASE_DOC ::

## API

### ColorPicker Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
clearable | Boolean | false | \- | N
enableAlpha | Boolean | false | \- | N
fixed | Boolean | false | \- | N
format | String | RGB | options: RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS | N
swatchColors | Array | - | swatch colors。Typescript：`Array<string> \| null` | N
type | String | base | options: base/multiple。Typescript：`TypeEnum ` `type TypeEnum = 'base' \| 'multiple'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts) | N
value | String | - | color value | N
defaultValue | String | - | color value。uncontrolled property | N
onChange | Function |  | Typescript：`(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-hue-bar' \| 'palette-alpha-bar' \| 'preset' `<br/> | N
onClose | Function |  | Typescript：`(trigger: ColorPickerTrigger) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerTrigger = 'overlay'`<br/> | N
onPaletteBarChange | Function |  | Typescript：`(context: { color: ColorObject }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/> | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-color-picker-background | #fff | - 
--td-color-picker-border-radius-circle | 50% | - 
--td-color-picker-format-background-color | @gray-color-1 | - 
--td-color-picker-gradient-preview-height | 28px | - 
--td-color-picker-gradient-preview-radius | 3px | - 
--td-color-picker-gradient-preview-width | 28px | - 
--td-color-picker-input-format-margin-left | 24px | - 
--td-color-picker-margin | 12px | - 
--td-color-picker-panel-padding | 16px | - 
--td-color-picker-panel-radius | 12px | - 
--td-color-picker-panel-width | 375px | - 
--td-color-picker-saturation-height | 144px | - 
--td-color-picker-saturation-radius | 6px | - 
--td-color-picker-saturation-thumb-size | 24px | - 
--td-color-picker-slider-height | 8px | - 
--td-color-picker-slider-thumb-padding | 3px | - 
--td-color-picker-slider-thumb-size | 24px | - 
--td-color-picker-slider-thumb-transform-x | -9px | - 
--td-color-picker-slider-wrapper-padding | 0 9px | - 
--td-color-picker-swatch-active | rgba(0, 0, 0, 20%) | - 
--td-color-picker-swatch-border-radius | 3px | - 
--td-color-picker-swatch-height | 24px | - 
--td-color-picker-swatch-padding | 0 | - 
--td-color-picker-swatch-width | 24px | - 
--td-color-picker-swatches-title-font | 16px | - 
