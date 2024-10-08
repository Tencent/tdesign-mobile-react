:: BASE_DOC ::

## API

### Guide Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
backButtonProps | Object | - | 透传 返回 的全部属性，示例：`{ content: '返回', theme: 'default' }`。TS 类型：`ButtonProps` | N
counter | TElement | - | 用于自定义渲染计数部分。TS 类型：`TNode<{ current: number; total: number }>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
current | Number | - | 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景 | N
defaultCurrent | Number | - | 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景。非受控属性 | N
finishButtonProps | Object | - | 透传 完成 的全部属性，示例：`{ content: '完成', theme: 'primary' }`。TS 类型：`ButtonProps` | N
hideCounter | Boolean | false | 是否隐藏计数 | N
hideSkip | Boolean | false | 是否隐藏跳过按钮 | N
highlightPadding | Number | 8 | 高亮框的内边距 | N
mode | String | popover | 引导框的类型。可选项：popover/dialog | N
nextButtonProps | Object | - | 透传 下一步按钮 的全部属性，示例：`{ content: '下一步', theme: 'primary' }`。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/guide/type.ts) | N
showOverlay | Boolean | true | 是否出现遮罩层 | N
skipButtonProps | Object | - | 透传 跳过按钮 的全部属性，{ content: '跳过', theme: 'default' }。TS 类型：`ButtonProps` | N
steps | Array | - | 用于定义每个步骤的内容，包括高亮的节点、相对位置和具体的文案内容等。。TS 类型：`Array<GuideStep>` | N
zIndex | Number | 999999 | 提示框的层级 | N
onBack | Function |  | TS 类型：`(context: { e: MouseEvent, current: number, total: number  }) => void`<br/>点击返回按钮时触发 | N
onChange | Function |  | TS 类型：`(current: number, context?: { e: MouseEvent,  total: number }) => void`<br/>当前步骤发生变化时触发 | N
onFinish | Function |  | TS 类型：`(context: { e: MouseEvent, current: number, total: number  }) => void`<br/>点击完成按钮时触发 | N
onNextStepClick | Function |  | TS 类型：`(context: { e: MouseEvent, next: number, current: number, total: number  }) => void`<br/>点击下一步时触发 | N
onSkip | Function |  | TS 类型：`(context: { e: MouseEvent, current: number, total: number  }) => void`<br/>点击跳过按钮时触发 | N
