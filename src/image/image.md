:: BASE_DOC ::

## API

### Image Props

| 名称      | 类型     | 默认值 | 说明                                                                                                                                              | 必传 |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| className | String   | -      | 类名                                                                                                                                              | N    |
| style     | Object   | -      | 样式，TS 类型：`React.CSSProperties`                                                                                                              | N    |
| alt       | String   | -      | 图片描述                                                                                                                                          | N    |
| error     | TElement | -      | 自定义加载失败状态下的图片内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N    |
| fit       | String   | fill   | 图片填充模式。可选项：contain/cover/fill/none/scale-down                                                                                          | N    |
| lazy      | Boolean  | false  | 是否开启图片懒加载                                                                                                                                | N    |
| loading   | TElement | -      | 自定义加载中状态下的图片内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts)   | N    |
| position  | String   | center | 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何 px 或者百分比                                         | N    |
| shape     | String   | circle | 图片圆角类型。可选项：circle/round/square                                                                                                         | N    |
| src       | String   | -      | 图片链接                                                                                                                                          | N    |
| onError   | Function |        | TS 类型：`() => void`<br/>图片加载失败时触发                                                                                                      | N    |
| onLoad    | Function |        | TS 类型：`() => void`<br/>图片加载完成时触发                                                                                                      | N    |
