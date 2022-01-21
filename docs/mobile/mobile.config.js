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
  ],
};
