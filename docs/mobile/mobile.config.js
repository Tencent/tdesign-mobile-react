export default {
  docs: [
    {
      title: 'Button 按钮',
      name: 'button',
      component: () => import('tdesign-mobile-react/button/_example/index.jsx'),
    },
    {
      title: 'Divider 分割线',
      name: 'divider',
      component: () => import('tdesign-mobile-react/divider/_example/base.jsx'),
    },
    {
      title: 'Icon 图标',
      name: 'icon',
      component: () => import('tdesign-mobile-react/icon/_example/index.jsx'),
    },
    {
      title: 'Tabs 选项卡',
      name: 'tabs',
      component: () => import('tdesign-mobile-react/tabs/_example/index.jsx'),
    },
    {
      title: 'Grid 宫格',
      name: 'grid',
      component: () => import('tdesign-mobile-react/grid/_example/base.jsx'),
    },
    {
      title: 'Image 图片',
      name: 'image',
      component: () => import('tdesign-mobile-react/image/_example/index.jsx'),
    },
    {
      title: 'Popup 弹出层',
      name: 'popup',
      component: () => import('tdesign-mobile-react/popup/_example/base.jsx'),
    },
    {
      title: 'Slider 滑动选择器',
      name: 'slider',
      component: () => import('tdesign-mobile-react/slider/_example/base.jsx'),
    },
    {
      title: 'Radio 单选框',
      name: 'radio',
      component: () => import('tdesign-mobile-react/radio/_example/index.jsx'),
    },
    {
      title: 'Badge 徽标',
      name: 'badge',
      component: () => import('tdesign-mobile-react/badge/_example/base.jsx'),
    },
    {
      title: 'Switch 开关',
      name: 'switch',
      path: '/switch',
      component: () => import('tdesign-mobile-react/switch/_example/index.jsx'),
    },
    {
      title: 'Cell 单元格',
      name: 'cell',
      component: () => import('tdesign-mobile-react/cell/_example/base.jsx'),
    },
  ],
};
