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

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-indexes-sidebar-active-bg-color | @brand-color | -
--td-indexes-sidebar-active-color | @text-color-anti | -
--td-indexes-sidebar-color | @text-color-primary | -
--td-indexes-sidebar-font-size | 12px | -
--td-indexes-sidebar-item-size | 20px | -
--td-indexes-sidebar-line-height | 20px | -
--td-indexes-sidebar-right | 8px | -
--td-indexes-sidebar-tips-bg-color | @brand-color-light | -
--td-indexes-sidebar-tips-color | @brand-color | -
--td-indexes-sidebar-tips-font-size | 20px | -
--td-indexes-sidebar-tips-right | 38px | -
--td-indexes-sidebar-tips-size | 48px | -
--td-indexes-anchor-active-bg-color | @bg-color-container | -
--td-indexes-anchor-active-color | @brand-color | -
--td-indexes-anchor-active-font-weight | 600 | -
--td-indexes-anchor-bg-color | @bg-color-secondarycontainer | -
--td-indexes-anchor-color | @text-color-primary | -
--td-indexes-anchor-font-size | 14px | -
--td-indexes-anchor-line-height | 22px | -
