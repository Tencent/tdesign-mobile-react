export default {
  docs: [
    {
      title: 'Button 按钮',
      name: 'button',
      component: () => import('tdesign-mobile-react/button/_example/base.jsx'),
    },
    {
      title: 'Grid 宫格',
      name: 'grid',
      component: () => import('tdesign-mobile-react/grid/_example/base.jsx'),
    },
    {
      title: 'Image 图片',
      name: 'image',
      component: () => import('tdesign-mobile-react/image/_example/base.jsx'),
    },
    {
      title: 'Popup 弹出层',
      name: 'popup',
      component: () => import('tdesign-mobile-react/popup/_example/base.jsx'),
    },
  ],
};
