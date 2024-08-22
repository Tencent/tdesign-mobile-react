:: BASE_DOC ::

## API

### Message Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
align | String | left | options: left/center。Typescript：`MessageAlignType` `type MessageAlignType = 'left' \| 'center'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/message/type.ts) | N
closeBtn | TNode | - | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
content | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
duration | Number | 3000 | \- | N
icon | TNode | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
link | TNode | - | Typescript：`string \| object \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
marquee | Boolean / Object | false | Typescript：`boolean \| MessageMarquee` `interface MessageMarquee { speed?: number; loop?: number; delay?: number }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/message/type.ts) | N
offset | Array | - | Typescript：`Array<string \| number>` | N
theme | String | info | options: info/success/warning/error。Typescript：`MessageThemeList` `type MessageThemeList = 'info' \| 'success' \| 'warning' \| 'error'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/message/type.ts) | N
visible | Boolean | false | \- | N
defaultVisible | Boolean | false | uncontrolled property | N
zIndex | Number | - | \- | N
onChange | Function |  | Typescript：`(visible: boolean) => void`<br/>`deprecated` | N
onClose | Function |  | Typescript：`(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent }) => void`<br/>`deprecated`。close message event。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | Typescript：`() => void`<br/>`deprecated` | N
onDurationEnd | Function |  | Typescript：`() => void`<br/> | N
onLinkClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onOpen | Function |  | Typescript：`() => void`<br/>`deprecated` | N
onOpened | Function |  | Typescript：`() => void`<br/>`deprecated` | N
