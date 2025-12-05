---
applyTo: '**/__tests__/**'
---

# TDesign 组件测试规范

## 任务说明

### 1. 测试覆盖率提升

> 标准如下

- **行覆盖率达 95%+**
- **分支覆盖率 95%+**
- **语句覆盖率 95%+**
- 有交互的组件，需要覆盖所有场景，**要求函数覆盖率 95+%**

### 2. 组件 API 功能自查

- Mobile React 正处于快速迭代阶段，组件 API 功能存在不稳定性或者功能实现有误，需对每个组件功能点撰写单元测试，进行**功能自查然后修复**

## 单元测试

### Tips

- Vitest 单元测试框架：[文档](https://cn.vitest.dev/guide/)
- 若开发工具为 vscode ，可以安装 Vitest 插件
- 若开发工具为 WebStorm，可以安装 Vitest Runner 插件

### 1. 创建单元测试文件 and 文件命名规则

- 测试文件统一放置在对应组件目录下的 `__tests__` 文件夹中。
- 命名规则：
  - 组件测试文件：`[组件名].test.tsx`，例如 `form.test.tsx`。
  - 多子组件场景：每个子组件单独编写测试文件，例如 `form.test.tsx` 和 `form-item.test.tsx`。
  - 组件内部 hooks 测试文件：`[组件名].hooks.test.tsx`，例如 `form.hooks.test.tsx`。
  - 组件内部 utils 测试文件：同 hooks 规则，例如 `form.utils.test.tsx`。

### 2. 编写单元测试

单元测试应覆盖组件以下内容：

- 组件本身的功能和行为。
- 组件内部的 hooks（自定义 Hook）。
- 组件内部的 utils（工具函数）。

组件测试文件按照 props、events、slots 进行，格式如下：

```
describe('DropdownMenu', () => {
  describe('props', () => {
    it(':style', () => {})
  })
  describe('event', () => {
      it(':click', () => {})
    })
  describe('slots', () => {
      it(':default', () => {})
    })
})
```

> 可参考：https://github.com/Tencent/tdesign-mobile-react/blob/develop/src/badge/__tests__/index.test.tsx

### 3. 检测测试用例

如果写的是 Button 组件的测试用例，可通过命令行，单独执行 Button 组件的测试用例，减少运行时间，如下所示。

```bash
npm run test:unit button
```

### 4. 查看单元测试覆盖率

确认测试用例通过后，可通过命令行，查看测试覆盖率。

> 红色部分表示完全没有覆盖的语句，黄色表示分支未覆盖，绿色表示覆盖，绿色的文字表示执行的次数

```bash
npm run test:unit-gui
npm run test:unit-gui button --coverage  //指定组件
```

### 5. 现有测试用例的优化

- 已有部分测试用例的组件，在补充新用例的同时，辛苦顺便对现有测试用例进行优化一下
- 优化内容包括但不限于：
  - 补充遗漏的分支和函数调用。
  - 按照上述命名和存放规范调整测试文件结构。
  - 提升测试用例的可读性和覆盖率。

### 6. 更新组件测试覆盖率徽标

```bash
npm run generate:coverage-badge
```

## 提交代码

恭喜你，成功完成一份单元测试，往更专业的前端更进一步!!

> 如果更新了组件 demo，需要更新 snapshot

```bash
npm run test:demo
npm run test:snap-update
```
