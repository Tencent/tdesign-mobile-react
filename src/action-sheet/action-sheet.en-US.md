:: BASE_DOC ::

## API

### ActionSheet Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
align | String | center | options: center/left | N
cancelText | String | - | \- | N
count | Number | 8 | \- | N
description | String | - | \- | N
items | Array | - | required。Typescript：`Array<string \| ActionSheetItem>` `interface ActionSheetItem {label: string; color?: string; disabled?: boolean;icon?: string;suffixIcon?: string; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts) | Y
showCancel | Boolean | true | \- | N
theme | String | list | options: list/grid | N
visible | Boolean | false | required | Y
defaultVisible | Boolean | false | required。uncontrolled property | Y
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | Typescript：`(selected: ActionSheetItem \| string, index: number) => void`<br/> | N
