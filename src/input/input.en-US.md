:: BASE_DOC ::

## API

### Input Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
align | String | left | text align type。options: left/center/right | N
allowInputOverMax | Boolean | false | allow to continue input on value length is over `maxlength` or `maxcharacter` | N
autocomplete | String | undefined | attribute of input element, [see here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | N
autofocus | Boolean | false | autofocus on first rendered | N
borderless | Boolean | false | input without border | N
clearTrigger | String | always | show clear icon, clicked to clear input value。options: always / focus | N
clearable | Boolean | false | show clear icon, clicked to clear input value | N
disabled | Boolean | undefined | make input to be disabled | N
errorMessage | String | - | `deprecated` | N
format | Function | - | input value formatter, `type=number` does not work. if you need to format number, `InputNumber` Component might be better。Typescript：`InputFormatType` `type InputFormatType = (value: InputValue) => string`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/input/type.ts) | N
label | TNode | - | text on the left of input。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
layout | String | horizontal | options: vertical/horizontal | N
maxcharacter | Number | - | \- | N
maxlength | String / Number | - | \- | N
name | String | - | \- | N
placeholder | String | undefined | \- | N
prefixIcon | TElement | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
readonly | Boolean | undefined | \- | N
size | String | medium | `deprecated`。options: small/medium。Typescript：`'medium' \| 'small'` | N
status | String | undefined | options: default/success/warning/error | N
suffix | TNode | - | suffix content before suffixIcon。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
suffixIcon | TElement | - | suffix icon of input。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
tips | TNode | - | tips on the bottom of input, different `status` can make tips to be different color。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
type | String | text | type attribute of input element. if you are using `type=number`, `InputNumber` Component might be better。options: text/number/url/tel/password/search/submit/hidden | N
value | String / Number | - | input value。Typescript：`InputValue` `type InputValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/input/type.ts) | N
defaultValue | String / Number | - | input value。uncontrolled property。Typescript：`InputValue` `type InputValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/input/type.ts) | N
onBlur | Function |  | Typescript：`(value: InputValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' }) => void`<br/>trigger on input value changed | N
onClear | Function |  | Typescript：`(context: { e: TouchEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: InputValue, context: { e: FocusEvent }) => void`<br/> | N
onValidate | Function |  | Typescript：`(context: { error?: 'exceed-maximum' \| 'below-minimum' }) => void`<br/>trigger on text length being over max length or max character | N
