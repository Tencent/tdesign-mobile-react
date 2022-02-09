:: BASE_DOC ::

## API

### Slider Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
disabled | Boolean | false | 是否禁用组件 | N
max | Number | 100 | 滑块范围最大值 | N
min | Number | 0 | 滑块范围最小值 | N
range | Boolean | false | 双游标滑块 | N
step | Number | 1 | 步长 | N
value | Number / Array | - | 滑块值。TS 类型：`SliderValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/slider/type.ts) | N
defaultValue | Number / Array | - | 滑块值。非受控属性。TS 类型：`SliderValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/slider/type.ts) | N
onChange | Function |  | TS 类型：`(value: SliderValue) => void`<br/>滑块值变化时触发 | N
