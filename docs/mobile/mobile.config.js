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
    {
      title: 'Popup 弹出层',
      name: 'popup',
      component: () => import('@examples/popup/demos/base.jsx'),
    },
    {
      title: 'Slider 滑动选择器',
      name: 'slider',
      component: () => import('@examples/slider/demos/base.jsx'),
    },
  ],
};
