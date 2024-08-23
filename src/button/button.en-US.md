:: BASE_DOC ::

## API

### Button Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
block | Boolean | false | make button to be a block-level element | N
children | TNode | - | button's children elements。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
content | TNode | - | button's children elements。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | disable the button, make it can not be clicked | N
ghost | Boolean | false | make background-color to be transparent | N
icon | TElement | - | use it to set left icon in button。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
loading | Boolean | false | set button to be loading state | N
loadingProps | Object | - | Typescript：`LoadingProps`，[Loading API Documents](./loading?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/button/type.ts) | N
shape | String | rectangle | button shape。options: rectangle/square/round/circle | N
size | String | medium | a button has four size。options: extra-small/small/medium/large | N
suffix | TElement | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
theme | String | default | button theme。options: default/primary/danger/light | N
type | String | button | type of button element in html。options: submit/reset/button | N
variant | String | base | variant of button。options: base/outline/dashed/text | N
onClick | Function |  | Typescript：`(e: MouseEvent) => void`<br/>trigger on click | N
