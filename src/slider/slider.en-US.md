:: BASE_DOC ::

## API

### Slider Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
disabled | Boolean | undefined | \- | N
label | TNode | false | Typescript：`string \| boolean \| TNode<{ value: SliderValue; position?: 'start' \| 'end' }>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
marks | Object / Array | - | Typescript：`Array<number> \| SliderMarks` `interface SliderMarks { [mark: number]: string \| TNode<{ value: number }> }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/slider/type.ts) | N
max | Number | 100 | \- | N
min | Number | 0 | \- | N
range | Boolean | false | \- | N
showExtremeValue | Boolean | false | \- | N
step | Number | 1 | \- | N
theme | String | default | options: default/capsule | N
value | Number / Array | 0 | Typescript：`SliderValue` `type SliderValue = number \| Array<number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/slider/type.ts) | N
defaultValue | Number / Array | 0 | uncontrolled property。Typescript：`SliderValue` `type SliderValue = number \| Array<number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/slider/type.ts) | N
onChange | Function |  | Typescript：`(value: SliderValue) => void`<br/> | N
onDragend | Function |  | Typescript：`(value: SliderValue, e: TouchEvent) => void`<br/> | N
onDragstart | Function |  | Typescript：`(e: TouchEvent) => void`<br/> | N
