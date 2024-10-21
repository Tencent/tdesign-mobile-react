:: BASE_DOC ::

## API

### Switch Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
colors | Array | - | `deprecated`。Typescript：`string[]` | N
customValue | Array | - | Typescript：`Array<SwitchValue>` | N
disabled | Boolean | undefined | \- | N
label | TNode | [] | Typescript：`Array<string \| TNode> \| TNode<{ value: SwitchValue }>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
loading | Boolean | false | \- | N
size | String | medium | options: small/medium/large | N
value | String / Number / Boolean | - | Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | - | uncontrolled property。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/switch/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: { e: MouseEvent }) => void`<br/> | N
