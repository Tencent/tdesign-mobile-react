export default {
  docs: [
    {
      title: '开始',
      type: 'document', // 普通文档
      children: [
        {
          title: '快速开始',
          name: 'readme',
          meta: { docType: 'explain' },
          path: '/react-mobile/components/readme',
          component: () => import('@/README.md'),
        },
      ],
    },

    // {
    //   title: '信息展示',
    //   type: 'component',
    //   children: [
    //     {
    //       title: 'Badge 徽标',
    //       name: 'badge',
    //       meta: { docType: 'data' },
    //       path: '/react-mobile/components/badge',
    //       component: () => import('@/badge/badge.md'),
    //     },
    //   ],
    // },
  ],
};
