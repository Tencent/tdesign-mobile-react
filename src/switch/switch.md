:: BASE_DOC ::

## API

### Switch Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
colors | Array | - | 已废弃。自定义颜色，[打开时的颜色，关闭时的颜色]。组件默认颜色为 ['#0052d9', 'rgba(0, 0, 0, .26']。示例：[blue, gray]。TS 类型：`string[]` | N
customValue | Array | - | 用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、['open', 'close']。TS 类型：`Array<SwitchValue>` | N
disabled | Boolean | undefined | 是否禁用组件。优先级：Switch.disabled > Form.disabled | N
label | TNode | [] | 开关内容，[开启时内容，关闭时内容]。示例：['开', '关'] 或 (value) => value ? '开' : '关'。TS 类型：`Array<string \| TNode> \| TNode<{ value: SwitchValue }>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
loading | Boolean | false | 是否处于加载中状态 | N
size | String | medium | 开关尺寸。可选项：small/medium/large | N
value | String / Number / Boolean | - | 开关值。TS 类型：`T` `type SwitchValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | - | 开关值。非受控属性。TS 类型：`T` `type SwitchValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/switch/type.ts) | N
onChange | Function |  | TS 类型：`(value: T, context: { e: MouseEvent }) => void`<br/>数据发生变化时触发 | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-switch-checked-color | @brand-color | - 
--td-switch-checked-disabled-color | @brand-color-disabled | - 
--td-switch-dot-border-color | @bg-color-secondarycontainer | - 
--td-switch-dot-horizontal-margin | 3px | - 
--td-switch-dot-large-size | 26px | - 
--td-switch-dot-plain-horizontal-margin | 5px | - 
--td-switch-dot-plain-large-size | 22px | - 
--td-switch-dot-plain-size | 18px | - 
--td-switch-dot-plain-small-size | 14px | - 
--td-switch-dot-shadow | @shadow-1 | - 
--td-switch-dot-size | 22px | - 
--td-switch-dot-small-size | 18px | - 
--td-switch-height | 28px | - 
--td-switch-icon-large-size | 24px | - 
--td-switch-icon-size | 20px | - 
--td-switch-icon-small-size | 16px | - 
--td-switch-label-checked-color | @switch-checked-color | - 
--td-switch-label-color | @text-color-disabled | - 
--td-switch-label-font-size | 12px | - 
--td-switch-label-font-size | 14px | - 
--td-switch-label-font-size | 16px | - 
--td-switch-large-height | 32px | - 
--td-switch-large-radius | calc(@switch-large-height / 2) | - 
--td-switch-large-width | 52px | - 
--td-switch-radius | calc(@switch-height / 2) | - 
--td-switch-small-height | 24px | - 
--td-switch-small-radius | calc(@switch-small-height / 2) | - 
--td-switch-small-width | 39px | - 
--td-switch-unchecked-color | @text-color-disabled | - 
--td-switch-unchecked-disabled-color | @bg-color-component-disabled | - 
--td-switch-width | 45px | - 
