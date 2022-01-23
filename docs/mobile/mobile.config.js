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
      title: 'Navbar 导航',
      name: 'navbar',
      path: '/navbar',
      component: () => import('@examples/navbar/demos/index.jsx'),
    },
  ],
};
