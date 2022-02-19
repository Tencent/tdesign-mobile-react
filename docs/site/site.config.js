export default {
  docs: [
    {
      title: '开始',
      type: 'document', // 普通文档
      children: [
        {
          title: '快速开始',
          name: 'readme',
          path: '/react-mobile/components/getting-started',
          component: () => import('@doc/getting-started.md'),
        },
      ],
    },

    {
      title: '基础',
      name: 'base',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Button 按钮',
          name: 'button',
          path: '/react-mobile/components/button',
          component: () => import('tdesign-mobile-react/button/button.md'),
        },
        {
          title: 'Radio 单选框',
          name: 'radio',
          path: '/react-mobile/components/radio',
          component: () => import('tdesign-mobile-react/radio/radio.md'),
        },
        {
          title: 'Divider 分割线',
          name: 'divider',
          path: '/react-mobile/components/divider',
          component: () => import('tdesign-mobile-react/divider/divider.md'),
        },
      ],
    },
    {
      title: '信息展示',
      name: 'info',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Grid 宫格',
          name: 'grid',
          path: '/react-mobile/components/grid',
          component: () => import('tdesign-mobile-react/grid/grid.md'),
        },
      ],
    },
    {
      title: '消息提醒',
      name: 'message',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Popup 弹出层',
          name: 'popup',
          path: '/react-mobile/components/popup',
          component: () => import('tdesign-mobile-react/popup/popup.md'),
        },
        {
          title: 'Badge 徽标',
          name: 'badge',
          path: '/react-mobile/components/badge',
          component: () => import('tdesign-mobile-react/badge/badge.md'),
        },
        {
          title: 'Message 信息提醒',
          name: 'message',
          path: '/react-mobile/components/message',
          component: () => import('tdesign-mobile-react/message/message.md'),
        },
      ],
    },
  ],
};
