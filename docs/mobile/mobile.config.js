export default {
  docs: [
    {
      title: 'Button 按钮',
      name: 'button',
      component: () => import('@examples/button/demos/base.jsx'),
    },
    {
      title: 'Input 输入框',
      name: 'input',
      component: () => import('@examples/input/demos/base.jsx'),
    },
    {
      title: 'Grid 宫格',
      name: 'grid',
      component: () => import('@examples/grid/demos/base.jsx'),
    },
    {
      title: 'Popup 弹出层',
      name: 'popup',
      component: () => import('@examples/popup/demos/base.jsx'),
    },
  ],
};
