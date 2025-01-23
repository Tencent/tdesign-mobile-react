---
title: DropdownMenu
description: The menu displays several juxtaposed option categories that are used to filter the content of the entire page, consisting of a menu panel and menu options.
spline: base
isComponent: true
toc: false
---

### Radio DropdownMenu

This parameter is used to select scenarios where an option is required

{{ single }}

### Multi-Select DropdownMenu

This parameter is used when multiple options can be selected
The label does not change the name after selection, and the title displays a maximum of 4 characters beyond "..." handle
The multiple selection dropdownMenu can have the following styles depending on the content of the selection

{{ multiple }}

### Disable Menu/Options

{{ disabled }}

### Slot Style

{{ customized }}


## API

### DropdownMenu Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
closeOnClickOverlay | Boolean | true | \- | N
direction | String | down | options: down/up | N
duration | String / Number | 200 | \- | N
showOverlay | Boolean | true | \- | N
zIndex | Number | 11600 | \- | N


### DropdownItem Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
disabled | Boolean | false | \- | N
footer | TElement | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
label | String | - | \- | N
multiple | Boolean | false | \- | N
options | Array | [] | Typescript：`Array<DropdownOption>` `interface DropdownOption { label: string; disabled: boolean; value: DropdownValue; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/dropdown-menu/type.ts) | N
optionsColumns | String / Number | 1 | \- | N
value | String / Number / Array | undefined | Typescript：`DropdownValue ` `type DropdownValue = string \| number \| Array<DropdownValue>;`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/dropdown-menu/type.ts) | N
defaultValue | String / Number / Array | undefined | uncontrolled property。Typescript：`DropdownValue ` `type DropdownValue = string \| number \| Array<DropdownValue>;`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/dropdown-menu/type.ts) | N
onChange | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
onConfirm | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
onReset | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
