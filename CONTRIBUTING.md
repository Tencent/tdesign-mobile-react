# CONTRIBUTING

`tdesign-mobile-react` 包含 `Mobile React` 代码和一个子仓库，子仓库指向 `tdesign-common` 仓库

## 开发

建议使用 node 18 版本进行开发

### 1.初始化子仓库

```bash
npm run init
```

### 2.安装依赖

```bash
npm i
```

### 3.本地开发

```bash
npm run start
```

完成以上 3 个步骤，浏览器访问 <http://127.0.0.1:19000> 即可调该框架的任何内容

## 目录结构

```text
├── script // 构建代码
├── site // 站点代码
├── src // 组件代码
     └─ componentA
          ├── _example // 组件示例文档
          └─  __test__ // 组件测试用例
└─ test // 测试配置文件
```

### 组件页路由配置

每一个组件都有自己的路由，页面配置都是一个 `Markdown` 文件，如`button.md`，具体路径可参考 `/site/web/site.config.js`。如果有新增组件，直接按照模板添加即可

```js
{
  title: '基础组件',
  type: 'component', // 组件文档
  children: [
    {
      title: 'Button 按钮',
      name: 'button',
      component: () => import(`tdesign-mobile-react/button/button.md`),
    },
    {
      title: 'Icon 图标',
      name: 'icon',
      component: () => import(`tdesign-mobile-react/icon/icon.md`),
    },
    ...
  ],
},
```

### Markdown 文件的 demo 引用

文档 `demo` 排列与 `common` 子仓库中的 `UI demo` 展示一致，如 `button` 组件页面的展示顺序，由子仓库的 `docs/mobile/api/button.md` 内的顺序决定。

```markdown
{{ base }}
[demo 描述（可不填）]
```

### Demo 调试

我们可以通过打开组件的路由页进行开发调试，如 `button`，则打开 <http://127.0.0.1:19000/mobile-vue/components/button> 进行开发调试；

如果仅想聚焦于对某个 `demo` 单独调试，如 `button`, 则可以打开 <http://127.0.0.1:19000/mobile.html#/button> 进行开发调试。


## 子仓库 tdesign-common

TDesign 的项目都会以子仓库的形式引入 `tdesign-common` 公共仓库，对应 `src/\_common` 文件夹，
公共仓库中包含

- 部分组件的一些框架无关的公共的工具函数
- `组件库UI`，既 `html` 结构和 `css` 样式（多框架共用）

大部分的功能和改动都只需要调整主仓库的代码即可，但涉及部分公共函数、样式或者部分文档的调整，需要改动子仓库的代码。

### 初始化子仓库

- 如开发部分提到的，初次克隆代码后需要初始化子仓库： `git submodule init && git submodule update`
- `git submodule update` 之后子仓库不指向任何分支，只是一个指向某一个提交的游离状态

### 子仓库开发

子仓库组件分支从 `develop checkout` 示例：`feature/button`，提交代码时先进入子仓库完成提交，然在回到主仓库完成提交

- 先进入 `src/\_common` 文件夹，正常将样式修改添加提交
- 回到主仓库，此时应该会看到 `src/\_common` 文件夹是修改状态，按照正常步骤添加提交即可


### 组件库 UI

`UI` 是多个框架共用的，比如 `PC` 端的 `react/vue/vue-next` 都是复用子仓库的 `UI` 代码。
各个框架组件实现应该要复用 `UI` 开发的 `html` 结构，引用其组件 `CSS` 与 `Demo CSS`（本仓库已在入口处引用了），`UI` 开发一般可由单独的 UI 开发同学认领完成或各框架组件开发同学的其中一名同学完成

- 如果开发前已有某个组件的 `UI` 开发内容，直接在主仓库使用即可
- 如果没有，且你也负责 `UI` 开发：参考 `UI` 开发规范完成 `UI` 开发内容、然后再开发主仓库组件
- 如果没有，且 `UI` 开发工作已有其他同学负责或认领：可以先在主仓库开发组件功能，待 `UI` 开发输出之后对齐即可

如果 `UI` 内容和样式（其他同学负责开发）还未完成，而你开发组件功能时需要写一些样式，可以直接在组件文件夹先写一个临时的 `less` 文件，在 `js` 中引入即可，如：

```bash
├── button.less
├── button.tsx
```

```js
// button.tsx

// 先引入临时的样式文件用于开发功能，待 UI 开发完成之后需要与 UI 样式对齐并删除 less 文件
import './button.less';
```

## 分支规范

### 分支

遵循使用 `git flow` 规范，新组件分支从 `develop checkout`：[https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

如果是贡献组件，则从 `develop checkout` 分支如：`feature/button`，记得如果同时要在子仓库开发 `UI`，子仓库也要 `checkout` 同名分支

> 关于 fork

以下内容处理 `fork` 仓库后，远端仓库的更新如何同步到 `fork` 仓库

```bash
# 建立 upstream remote
git remote add upstream git@github.com:Tencent/tdesign-mobile-react.git

# 更新 upstream
git fetch upstream develop

# 合并 upstream develop 到本地
git checkout develop

git merge upstream/develop
```

### 提交说明

项目使用基于 angular 提交规范：[https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

每次提交会自动触发提交验证

- 使用工具 `commitizen` 协助规范 `git commit` 信息
- `fix` & `feat` 的提交会被用来生成 `changelog`
- 提交会触发 `git pre-commit` 检查，修复提示的 `eslint` 错误，

## 开发规范

### API 规范

`API` 由 `API` 平台统一管理生成，如果涉及组件文档的改动（如`src/button/type.ts`的内容），都需要同时在 `API` 平台提交 `PR`，进行统一维护管理 https://github.com/tdesignoteam/tdesign-api

### 前缀规范

组件和 `CSS` 前缀以 `t-` 开头，无论 `js` 还是 `css` 都使用变量定义前缀，方便后续替换

### CSS 规范


组件样式在 `common` 子仓库开发，遵循 [tdesign-common 仓库 UI 开发规范](https://github.com/Tencent/tdesign-common/blob/main/style/mobile/README.md)
