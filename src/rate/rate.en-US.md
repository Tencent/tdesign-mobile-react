:: BASE_DOC ::

## API

### Rate Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
allowHalf | Boolean | false | \- | N
color | String / Array | '#ED7B2F' | Typescript：`string \| Array<string>` | N
count | Number | 5 | \- | N
disabled | Boolean | undefined | \- | N
gap | String / Number | 8 | \- | N
icon | TNode | - | Typescript：`Array<TNode \| Function>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
placement | String | top | options: top / bottom / '' | N
showText | Boolean | false | \- | N
size | String | 24px | \- | N
texts | Array | [] | Typescript：`Array<string>` | N
value | Number | 0 | \- | N
defaultValue | Number | 0 | uncontrolled property | N
onChange | Function |  | Typescript：`(value: number) => void`<br/> | N
