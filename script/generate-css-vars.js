const fs = require('fs');
const path = require('path');

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

const COMPONENT_NAME = process.argv[process.argv.indexOf('--NAME') + 1]; // 在 --NAME 后面

// 组件名作为参数传入
function getStyleFilePath(componentName) {
  // 构建目标文件路径
  const styleIndexPath = resolveCwd(`src/${componentName}/style/index.js`);

  try {
    // 读取文件内容
    const fileContent = fs.readFileSync(styleIndexPath, 'utf8');

    // 使用正则表达式匹配 import 语句中的相对路径部分，并移除开头的相对路径符号
    const regex = /^.*?'((?:\.\.(?:\/|\\))*)(.*)\/[^\\/]*?\.less'.*$/m;
    const match = fileContent.match(regex);

    if (match && match[2]) {
      // 返回清理过的路径
      return match[2];
    }
    console.error(`未找到有效的导入路径在 ${styleIndexPath}`);
    return null;
  } catch (err) {
    console.error(`无法打开或读取文件: ${styleIndexPath}`, err.message);
    return null;
  }
}

// 示例调用
const componentStylesDir = getStyleFilePath(COMPONENT_NAME);

const lessPath = [];
lessPath.push(resolveCwd(`src/${componentStylesDir}/_var.less`));

const matchReg = /(?<=var).*?(?=;)/g;

// 追加到文件
const cssVariableHeadContent = `\n\n### CSS Variables\n\n组件提供了下列 CSS 变量，可用于自定义样式。\n名称 | 默认值 | 描述 \n-- | -- | --\n`;
const cssVariableHeadContentEn = `\n\n### CSS Variables\n\nThe component provides the following CSS variables, which can be used to customize styles.\nName | Default Value | Description \n-- | -- | --\n`;

fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.md`), cssVariableHeadContent);
fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.en-US.md`), cssVariableHeadContentEn);

// 读取 less 文件内容
lessPath.forEach((item) => {
  if (fs.existsSync(item)) {
    fs.readFile(item, 'utf8', (err, file) => {
      if (err) {
        console.log('please execute npm run update:css first!', err);
        return;
      }
      const list = file.match(matchReg)?.sort();
      let cssVariableBodyContent = '';
      list?.forEach((item) => {
        cssVariableBodyContent += `${item.slice(1, item.indexOf(','))} | ${item.slice(
          item.indexOf(',') + 2,
          item.length - 1,
        )} | - \n`;
      });

      // src/notice-bar/notice-bar.en-US.md
      fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.md`), cssVariableBodyContent);
      fs.appendFileSync(resolveCwd(`src/${COMPONENT_NAME}/${COMPONENT_NAME}.en-US.md`), cssVariableBodyContent);
    });
  }
});
