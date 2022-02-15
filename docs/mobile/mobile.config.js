export default {
  docs: [
    {
      title: 'Button 按钮',
      name: 'button',
      path: '/button',
      component: () => import('tdesign-mobile-react/button/_example/base.jsx'),
    },
    {
      title: 'Divider 分割线',
      name: 'divider',
      path: '/divider',
      component: () => import('tdesign-mobile-react/divider/_example/base.jsx'),
    },
    {
      title: 'Grid 宫格',
      name: 'grid',
      path: '/grid',
      component: () => import('tdesign-mobile-react/grid/_example/base.jsx'),
    },
    {
      title: 'Popup 弹出层',
      name: 'popup',
      path: '/popup',
      component: () => import('tdesign-mobile-react/popup/_example/base.jsx'),
    },
    {
      title: 'Radio 单选框',
      name: 'radio',
      path: '/radio',
      component: () => import('tdesign-mobile-react/radio/_example/index.jsx'),
    },
    {
      title: 'Badge 徽标',
      name: 'badge',
      path: '/badge',
      component: () => import('tdesign-mobile-react/badge/_example/base.jsx'),
    },
    {
      title: 'Switch 开关',
      name: 'switch',
      path: '/switch',
      component: () => import('tdesign-mobile-react/switch/_example/index.jsx'),
    },
  ],
};
