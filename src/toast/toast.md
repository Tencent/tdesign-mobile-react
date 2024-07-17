:: BASE_DOC ::

## API

### Tabs Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
direction | String | row | 图标排列方式 'row' \| 'column' | N
duration  | Number | 2000 | 弹窗显示毫秒数 | N
icon | String/TNode | -- | 自定义图标 | N
message | String/TNode | -- | 弹窗显示文字 | N
placement | String | middle | 弹窗展示位置'top' \| 'middle' \| 'bottom' | N
preventScrollThrough | Boolean | false | 防止滚动穿透，即不允许点击和滚动 | N
theme | String | -- | 提示类型, 可选值：loading \| success \| fail。 | -- | N

### Toast Events

名称 | 描述
-- | --
destroy | 主动销毁toast,需要获取toast实例