:: BASE_DOC ::

## API

| 属性            | 类型            | 默认值            | 必传 | 说明           |
| --------------- | --------------- | ----------------- | ---- | -------------- |
| images          | `Array<String>` | []                | Y    | 图片数组       |
| visible         | Boolean         | false             | N    | 隐藏/显示预览  |
| showIndex       | Boolean         | true              | N    | 是否显示页码   |
| initialIndex    | Number          | 0                 | N    | 默认展示第几项 |
| backgroundColor | String          | rgba(0, 0, 0, .6) | N    | 遮罩的背景颜色 |
| closeBtn | Boolean          | false | N    | 是否显示关闭按钮 |
| deleteBtn | Boolean          | false | N    | 是否显示删除按钮 |

## Events

| 事件名称 | 参数 | 说明       |
| -------- | ---- | ---------- |
| onVisibleChange   | -    | 显示/隐藏回调 |
| onChange   | -    | 翻页时回调 |
| onClose   | -    | 关闭时回调 |
| onDelete   | -    | 删除时回调 |