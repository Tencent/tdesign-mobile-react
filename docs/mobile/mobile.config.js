export default {
  docs: [
    {
      title: 'Button 按钮',
      name: 'button',
      path: '/button',
      component: () => import('@examples/button/demos/base.jsx'),
    },
    {
      title: 'Grid 宫格',
      name: 'grid',
      component: () => import('@examples/grid/demos/base.jsx'),
    },
    {
      title: 'Radio 单选框',
      name: 'radio',
      path: '/radio',
      component: () => import('@examples/radio/demos/index.jsx'),
    },
  ],
};
