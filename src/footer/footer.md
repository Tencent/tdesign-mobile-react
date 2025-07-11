:: BASE_DOC ::

## API

### Footer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
links | Array | [] | 链接列表。name 表示链接名称， url 表示跳转链接，target 表示跳转方式，如：当前页面打开、新页面打开等，同 HTML 属性 target 含义相同。TS 类型：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; target?: string}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/footer/type.ts) | N
logo | Object | - | 图标配置。`logo.icon` 表示图标链接地址，`logo.title` 表示标题文本，`logo.url` 表示链接跳转地址，`logo.target` 表示跳转方式。TS 类型：`FooterLogo` `interface FooterLogo { icon: string; title?: string; url?: string; target?: string; }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/footer/type.ts) | N
text | String | '' | 版权信息 | N
