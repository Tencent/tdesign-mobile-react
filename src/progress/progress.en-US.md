:: BASE_DOC ::

## API

### Progress Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
color | String / Object / Array | '' | Typescript：`string \| Array<string> \| Record<string, string>` | N
label | TNode | true | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
percentage | Number | 0 | \- | N
status | String | - | options: success/error/warning/active。Typescript：`ProgressStatus` `type ProgressStatus = 'success' \| 'error' \| 'warning' \| 'active'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/progress/type.ts) | N
strokeWidth | String / Number | - | \- | N
theme | String | line | options: line/plump/circle。Typescript：`ProgressTheme` `type ProgressTheme = 'line' \| 'plump' \| 'circle'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/progress/type.ts) | N
trackColor | String | '' | \- | N
