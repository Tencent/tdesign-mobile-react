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
      title: 'Popup 弹出层',
      name: 'popup',
      component: () => import('tdesign-mobile-react/popup/_example/base.jsx'),
    },
    {
      title: 'Radio 单选框',
      name: 'radio',
      component: () => import('tdesign-mobile-react/radio/_example/index.jsx'),
    },
  ],
};
