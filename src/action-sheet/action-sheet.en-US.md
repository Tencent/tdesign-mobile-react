---
title: ActionSheet
description: A specific type of modal popup triggered by a user action that presents a set of two or more options relevant to the current context.
spline: base
isComponent: true
toc: false
---

### List Type

The list option is a list at the left and right ends;

Options are plain text;

For warning operations (such as irreversible destructive operations), it is recommended to put the change operation at the end and mark it in red.

The list type can have the following different styles according to the content of the selected items

{{ list }}

### Grid Type

The panel runs through from left to right, and uses a grid structure of 3 or 4 columns according to the number of operations to make the menu content as full as possible.

Menu options are presented in the form of icons plus text.

When the number of menu items exceeds 8, it can be turned over.

{{ grid }}

### Grid Multiple

{{ grid-multiple }}

### Component Status

{{ status }}

### Component Style

{{ align }}

## API

### ActionSheet Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | center | options：center/left | N
cancelText | String | - | \- | N
count | Number | 8 | \- | N
description | String | - | \- | N
items | Array | - | required。Typescript：`Array<string \| ActionSheetItem>` `interface ActionSheetItem {label: string; color?: string; disabled?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts) | Y
showCancel | Boolean | true | \- | N
theme | String | list | options：list/grid | N
visible | Boolean | false | required。| Y
defaultVisible | Boolean | false | required。uncontrolled property | Y
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: ActionSheetTriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts)。<br/>`type ActionSheetTriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | Typescript：`(selected: ActionSheetItem \| string, index: number) => void`<br/> | N
