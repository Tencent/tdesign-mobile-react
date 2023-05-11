:: BASE_DOC ::

## API

### Tabs Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
list | Array | - | 选项卡列表 | N
animation | Object | - | 动画效果设置{transition-timing-function, transition-duration}。 | N
placement | String | top | 选项卡位置，可选值'left'\|'right'\|'top'\|'bottom' | N
showBottomLine | Boolean | true | 是否展示底部激活条 | N
value | String/Number | - | 激活的选项卡值 | N
defaultValue | String/number | - | 默认选中的值 | N
disabled | Boolean | -  | 是否禁用选项卡 | N
content | \<element>\</elemrnt>\ | - | 传到容器中的内容 ｜ N


### Tabs Events

名称 | 描述
-- | --
change | 激活的选项卡时触发，参数：(value: TabValue)