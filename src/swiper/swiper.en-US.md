:: BASE_DOC ::

## API
### Swiper Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
animation | String | slide | options: slide | N
autoplay | Boolean | true | \- | N
current | Number | 0 | \- | N
direction | String | horizontal | options: horizontal/vertical | N
duration | Number | 300 | \- | N
height | String / Number | - | \- | N
interval | Number | 5000 | \- | N
loop | Boolean | true | \- | N
navigation | TNode | - | Typescript：`SwiperNavigation \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
nextMargin | String / Number | 0 | \- | N
previousMargin | String / Number | 0 | \- | N
type | String | default | options: default/card | N
onChange | Function |  | Typescript：`(current: number, context: { source: SwiperChangeSource }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' \| 'touch' \| 'nav'`<br/> | N
onClick | Function |  | Typescript：`(index: number) => void`<br/> | N

### SwiperNavigation

name | type | default | description | required
-- | -- | -- | -- | --
minShowNum | Number | - | \- | N
paginationPosition | String | bottom | options: top-left/top/top-right/bottom-left/bottom/bottom-right | N
placement | String | inside | options: inside/outside | N
showControls | Boolean | false | \- | N
type | String | - | Typescript：`SwiperNavigationType` `type SwiperNavigationType = 'dots' \| 'dots-bar' \| 'fraction'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/swiper/type.ts) | N
