export default {
  navs: {
    components: {
      title: 'TDesign',
      url: 'components',
      docs: [
        {
          title: 'Button 按钮',
          name: 'button',
          component: () => import('@/button/demos/base.tsx'),
        },
      ],
    },
  },
};
