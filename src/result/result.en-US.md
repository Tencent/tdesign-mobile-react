:: BASE_DOC ::

## API


### Result Props

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | className of component | N
style | Object | - | CSS(Cascading Style Sheets)，Typescript：`React.CSSProperties` | N
description | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
image | TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N
theme | String | default | options: default/success/warning/error | N
title | TNode | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/common.ts) | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-result-description-color | @text-color-secondary | -
--td-result-description-font-size | @font-size-base | -
--td-result-description-line-height | 22px | -
--td-result-description-margin-top | @spacer | -
--td-result-icon-default-color | @brand-color | -
--td-result-icon-error-color | @error-color | -
--td-result-icon-success-color | @success-color | -
--td-result-icon-warning-color | @warning-color | -
--td-result-title-color | @text-color-primary | -
--td-result-title-font-size | @font-size-xl | -
--td-result-title-line-height | 28px | -
--td-result-title-margin-top | @spacer-1 | -
