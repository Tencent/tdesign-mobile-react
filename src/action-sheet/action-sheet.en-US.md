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
items | Array | - | Typescript：`Array<string \| ActionSheetItem>` `interface ActionSheetItem { label: string; color?: string; disabled?: boolean; icon?: TNode; badge?: BadgeProps }`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts) | N
popupProps | Object | {} | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts) | N
showCancel | Boolean | true | \- | N
showOverlay | Boolean | true | \- | N
theme | String | list | options: list/grid | N
visible | Boolean | false | \- | N
defaultVisible | Boolean | false | uncontrolled property | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: ActionSheetTriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/action-sheet/type.ts)。<br/>`type ActionSheetTriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | Typescript：`(selected: ActionSheetItem \| string, index: number) => void`<br/> | N
