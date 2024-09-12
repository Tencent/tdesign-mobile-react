:: BASE_DOC ::

## API

### ImageViewer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
closeBtn | TNode | true | 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
deleteBtn | TNode | false | 是否显示删除操作，前提需要开启页码。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
images | Array | [] | 图片数组。TS 类型：`Array<string \| ImageInfo> ` `interface ImageInfo {url: string; align: 'start' \| 'center' \| 'end'; }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/image-viewer/type.ts) | N
index | Number | 0 | 当前预览图片所在的下标 | N
defaultIndex | Number | 0 | 当前预览图片所在的下标。非受控属性 | N
maxZoom | Number | 3 | 【开发中】最大放大比例。TS 类型：`Number` | N
showIndex | Boolean | false | 是否显示页码 | N
visible | Boolean | false | 隐藏/显示预览 | N
defaultVisible | Boolean | false | 隐藏/显示预览。非受控属性 | N
onClose | Function |  | TS 类型：`(context: OnCloseContext)  => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/image-viewer/type.ts)。<br/>`interface OnCloseContext { trigger: 'overlay' \| 'close-btn', visible: boolean, index: number }`<br/> | N
onDelete | Function |  | TS 类型：`(index: Number) => void`<br/>点击删除操作按钮时触发 | N
onIndexChange | Function |  | TS 类型：`(index: number, context: { trigger: 'prev' \| 'next' \| 'current' }) => void`<br/>预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 | N