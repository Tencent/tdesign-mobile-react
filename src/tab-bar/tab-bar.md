:: BASE_DOC ::

## API

### TabBar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
bordered | Boolean | true | 是否显示外边框 | N
fixed | Boolean | true | 是否固定在底部 | N
value | String / Number / Array | undefined | 当前选中标签的索引。TS 类型：`string | number | Array<string | number>` | N
defaultValue | String / Number / Array | undefined | 当前选中标签的索引。非受控属性。TS 类型：`string | number | Array<string | number>` | N
onChange | Function |  | TS 类型：`() => void`<br/>选中标签切换时触发 | N

### TabBarItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
badgeProps | Object | - | 图标右上角提示信息。TS 类型：`TdBadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/tab-bar/type.ts) | N
icon | TNode | - | 图标名称。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
subTabBar | Array | - | 二级菜单。TS 类型：`SubTabBarItem[] ` `interface SubTabBarItem { value: string; label: string }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | 标识符 | N
