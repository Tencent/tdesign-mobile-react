:: BASE_DOC ::

## API

### Search Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
action | TNode | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
autocompleteOptions | Array | - | autocomplete words list。Typescript：`Array<AutocompleteOption>` `type AutocompleteOption = string \| { label: string \| TNode; group?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/search/type.ts) | N
center | Boolean | false | \- | N
clearable | Boolean | true | \- | N
disabled | Boolean | false | \- | N
focus | Boolean | false | \- | N
leftIcon | TNode | 'search' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
placeholder | String | '' | \- | N
prefixIcon | TElement | - | `deprecated`。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
shape | String | 'square' | options: square/round | N
suffixIcon | TElement | - | `deprecated`。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
value | String | - | \- | N
defaultValue | String | - | uncontrolled property | N
onActionClick | Function |  | Typescript：`({}) => void`<br/> | N
onBlur | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onSearch | Function |  | Typescript：`(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent }) => void`<br/> | N
onSubmit | Function |  | Typescript：`(context: { value: string; e: KeyboardEvent }) => void`<br/> | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-search-action-color | @brand-color | -
--td-search-bg-color | @bg-color-secondarycontainer | -
--td-search-clear-icon-color | @text-color-placeholder | -
--td-search-clear-icon-font-size | 24px | -
--td-search-font | @font-body-large | -
--td-search-height | 40px | -
--td-search-icon-color | @text-color-placeholder | -
--td-search-icon-font-size | 24px | -
--td-search-label-color | @text-color-primary | -
--td-search-padding | 8px 12px | -
--td-search-placeholder-color | @text-color-placeholder | -
--td-search-result-high-light-color | @brand-color | -
--td-search-square-radius | @radius-default | -
--td-search-text-color | @text-color-primary | -
