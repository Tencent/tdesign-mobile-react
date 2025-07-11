:: BASE_DOC ::

## API

### Footer Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
links | Array | [] | Typescript：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; target?: string}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/footer/type.ts) | N
logo | Object | - | Typescript：`FooterLogo` `interface FooterLogo { icon: string; title?: string; url?: string; target?: string; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/footer/type.ts) | N
text | String | '' | \- | N
