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
          component: () => import('@examples/button/button.md'),
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
          component: () => import('@examples/grid/grid.md'),
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
          component: () => import('@examples/popup/popup.md'),
        },
      ],
    },
  ],
};
