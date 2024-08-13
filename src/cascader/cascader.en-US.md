:: BASE_DOC ::

## API


### Cascader Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
closeBtn | TNode | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
lazy | Boolean | false | \- | N
loadCompleted | Boolean | false | \- | N
options | Array | [] | Typescript：`Array<CascaderOption>` | N
placeholder | String | 选择选项 | \- | N
subTitles | Array | [] | Typescript：`Array<string>` | N
theme | String | step | options: step/tab | N
title | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
value | String / Number | - | \- | N
defaultValue | String / Number | - | uncontrolled property | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: string \| number, selectedOptions: string[]) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/cascader/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> | N
onPick | Function |  | Typescript：`(value: string \| number, index: number) => void`<br/> | N
