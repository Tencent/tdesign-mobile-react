:: BASE_DOC ::

## API

### Segmented Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript: `React.CSSProperties` | N
block | Boolean | false | \- | N
disabled | Boolean | - | \- | N
options | Object | [] | Typescript: `string[] \| number[] \| SegmentedItem[] ` `interface SegmentedItem { value: string \| number; label?: string \| TNode; icon?: TNode; disabled?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/segmented/type.ts) | N
value | String / Number | - | \- | N
defaultValue | String / Number | - | uncontrolled property | N
onChange | Function |  | Typescript: `(value: string \| number, selectedOption: SegmentedItem) => void`<br/> | N
