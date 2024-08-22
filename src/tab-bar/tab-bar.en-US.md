:: BASE_DOC ::

## API

### TabBar Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | true | \- | N
fixed | Boolean | true | \- | N
safeAreaInsetBottom | Boolean | true | \- | N
shape | String | 'normal' | options：normal/round | N
split | Boolean | true | \- | N
theme | String | 'normal' | options：normal/tag | N
value | String / Number / Array | undefined | The index of the currently selected tab.Typescript:`string | number | Array<string | number>` | N
defaultValue | String / Number / Array | undefined | The default index of the selected tag. Uncontrolled property.Typescript:`string | number | Array<string | number>` | N
onChange | Function |  | Typescript:`(value: string \| number) => void`<br/>Trigger when the label switch is selected | N
className | String | - | \- | N
style | Object | - | Typescript:`React.CSSProperties` | N

### TabBarItem Props

name | type | default | description | required
-- | -- | -- | -- | --
badgeProps | Object | - | Typescript:`TdBadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/tab-bar/type.ts) | N
icon | TElement | - | Typescript:`TElement`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
subTabBar | Array | - | Typescript:`SubTabBarItem[]` `interface SubTabBarItem { value: string; label: string }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | \- | N
className | String | - | \- | N
style | Object | - | Typescript:`React.CSSProperties` | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description
-- | -- | --
--td-tab-bar-active-bg | @brand-color-light | -
--td-tab-bar-active-color | @brand-color | -
--td-tab-bar-bg-color | @bg-color-container | -
--td-tab-bar-border-color | @border-color | -
--td-tab-bar-color | @font-gray-1 | -
--td-tab-bar-height | 40px | -
--td-tab-bar-hover-bg-color | rgba(0, 0, 0, .05) | -
--td-tab-bar-spread-border-color | @border-color | -
--td-tab-bar-spread-shadow | @shadow-3 | -
--td-tab-bar-border-color | @border-color | -
--td-tab-bar-round-shadow | @shadow-3 | -
