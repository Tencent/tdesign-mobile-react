:: BASE_DOC ::

## API

### Cascader Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
checkStrictly | Boolean | false | \- | N
closeBtn | TNode | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`CascaderKeysType` `type CascaderKeysType = TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/cascader/type.ts) | N
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
onChange | Function |  | Typescript：`(value: string \| number, selectedOptions: CascaderOption[]) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/cascader/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> | N
onPick | Function |  | Typescript：`(value: string \| number, index: number) => void`<br/> | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-cascader-active-color | @brand-color | -
--td-cascader-bg-color | @bg-color-container | -
--td-cascader-border-color | @component-stroke | -
--td-cascader-disabled-color | @text-color-disabled | -
--td-cascader-options-height | 320px | -
--td-cascader-options-title-color | @text-color-placeholder | -
--td-cascader-step-arrow-color | @text-color-placeholder | -
--td-cascader-step-dot-size | 8px | -
--td-cascader-step-height | 44px | -
--td-cascader-title-color | @text-color-primary | -
--td-cascader-title-font | @font-title-large | -
--td-cascader-title-padding | @spacer-2 | -
