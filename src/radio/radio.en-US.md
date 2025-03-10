:: BASE_DOC ::

## API

### Radio Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
align | String | left | options: left/right | N
allowUncheck | Boolean | false | \- | N
block | Boolean | true | \- | N
borderless | Boolean | undefined | \- | N
checked | Boolean | false | \- | N
defaultChecked | Boolean | false | uncontrolled property | N
children | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
content | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
contentDisabled | Boolean | false | \- | N
disabled | Boolean | undefined | \- | N
icon | String / Array | 'circle' | Typescript：`'circle' \| 'line' \| 'dot' \| 'none' \|Array<TNode>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
label | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
maxContentRow | Number | 5 | \- | N
maxLabelRow | Number | 3 | \- | N
name | String | - | \- | N
placement | String | - | options: left/right | N
readonly | Boolean | undefined | \- | N
value | String / Number / Boolean | undefined | Typescript：`T` | N
onChange | Function |  | Typescript：`(checked: boolean, context: { e: ChangeEvent }) => void`<br/> | N


### RadioGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
allowUncheck | Boolean | false | \- | N
borderless | Boolean | false | \- | N
disabled | Boolean | undefined | \- | N
icon | String / Array | 'circle' | Typescript：`'circle' \| 'line' \| 'dot' \| Array<TNode>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
name | String | - | \- | N
options | Array | - | Typescript：`Array<RadioOption>` `type RadioOption = string \| number \| RadioOptionObj` `interface RadioOptionObj { label?: string \| TNode; value?: string \| number \| boolean; disabled?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/radio/type.ts) | N
placement | String | left | options: left/right | N
readonly | Boolean | undefined | \- | N
value | String / Number / Boolean | - | Typescript：`T` `type RadioValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/radio/type.ts) | N
defaultValue | String / Number / Boolean | - | uncontrolled property。Typescript：`T` `type RadioValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/radio/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: { e: ChangeEvent; name?: string }) => void`<br/> | N
