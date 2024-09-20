:: BASE_DOC ::

## API

### Indexes Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
indexList | Array | - | Typescript：`(string \| number)[]` | N
sticky | Boolean | true | Typescript：`Boolean` | N
stickyOffset | Number | 0 | \- | N
onChange | Function |  | Typescript：`(index: string \| number) => void`<br/> | N
onSelect | Function |  | Typescript：`(index: string \| number) => void`<br/> | N


### IndexesAnchor Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
index | String / Number | - | \- | N
