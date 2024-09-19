:: BASE_DOC ::

## API


### Drawer Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
attach | String / Function | - | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
closeOnOverlayClick | Boolean | true | \- | N
destroyOnClose | Boolean | false | \- | N
footer | TElement | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
items | Array | - | Typescript：`DrawerItem[] ` `interface DrawerItem { title: string; icon: TNode; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/drawer/type.ts) | N
placement | String | right | options: left/right | N
showOverlay | Boolean | true | \- | N
title | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
visible | Boolean | false | \- | N
zIndex | Number | - | \- | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/> | N
onItemClick | Function |  | Typescript：`( index: number, item: DrawerItem, context: { e: MouseEvent }) => void`<br/> | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### DrawerOptions

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | \- | N
style | Object | - | Typescript：`Styles`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
`Omit<DrawerProps, 'attach'>` | \- | - | extends `Omit<DrawerProps, 'attach'>` | N

### DrawerInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | \-
hide | \- | \- | \-
show | \- | \- | \-
update | `(props: DrawerOptions)` | \- | \-

### drawer 或 DrawerPlugin

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DrawerOptions`
