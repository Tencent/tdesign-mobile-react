:: BASE_DOC ::

## API

### Footer Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，Typescript：`React.CSSProperties` | N
links | Array | [] | Typescript：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; target?: string}`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/footer/type.ts) | N
logo | Object | - | Typescript：`FooterLogo` `interface FooterLogo { icon: string; title?: string; titleUrl?: string; titleTarget: string }`。[see more ts definition](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/footer/type.ts) | N
text | String | '' | \- | N
