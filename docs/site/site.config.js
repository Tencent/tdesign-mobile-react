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
        {
          title: 'Input 输入框',
          name: 'input',
          path: '/react-mobile/components/input',
          component: () => import('@examples/input/input.md'),
        },
      ],
    },
  ],
};
