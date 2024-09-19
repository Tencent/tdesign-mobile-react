:: BASE_DOC ::

## API

### Indexes Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
indexList | Array | - | 索引字符列表。不传默认 `A-Z`。TS 类型：`(string \| number)[]` | N
sticky | Boolean | true | 索引是否吸顶，默认为true。TS 类型：`Boolean` | N
stickyOffset | Number | 0 | 锚点吸顶时与顶部的距离	 | N
onChange | Function |  | TS 类型：`(index: string \| number) => void`<br/>索引发生变更时触发事件 | N
onSelect | Function |  | TS 类型：`(index: string \| number) => void`<br/>点击侧边栏时触发事件 | N


### IndexesAnchor Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
index | String / Number | - | 索引字符 | N
