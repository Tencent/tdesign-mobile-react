export default {
  docs: [
    {
      title: 'Button 按钮',
      name: 'button',
      component: () => import('@examples/button/demos/base.jsx'),
    },
    {
      title: 'Grid 宫格',
      name: 'grid',
      component: () => import('@examples/grid/demos/base.jsx'),
    },
  ],
};
