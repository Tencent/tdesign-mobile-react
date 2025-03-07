:: BASE_DOC ::

## API


### PullDownRefresh Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
loadingBarHeight | String / Number | 50 | \- | N
loadingProps | Object | - | Typescript：`LoadingProps`，[Loading API Documents](./loading?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/pull-down-refresh/type.ts) | N
loadingTexts | Array | [] | Typescript：`string[]` | N
maxBarHeight | String / Number | 80 | \- | N
refreshTimeout | Number | 3000 | \- | N
value | Boolean | false | \- | N
defaultValue | Boolean | false | uncontrolled property | N
onChange | Function |  | Typescript：`(value: boolean) => void`<br/> | N
onRefresh | Function |  | Typescript：`() => void`<br/> | N
onScrolltolower | Function |  | Typescript：`() => void`<br/> | N
onTimeout | Function |  | Typescript：`() => void`<br/> | N
