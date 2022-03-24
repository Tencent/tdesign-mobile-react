export default {
  docs: [
    {
      title: '开始',
      type: 'document', // 普通文档
      children: [
        {
          title: '快速开始',
          name: 'readme',
          path: '/mobile-react/getting-started',
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
          path: '/mobile-react/components/button',
          component: () => import('tdesign-mobile-react/button/button.md'),
        },
        {
          title: 'Radio 单选框',
          name: 'radio',
          path: '/mobile-react/components/radio',
          component: () => import('tdesign-mobile-react/radio/radio.md'),
        },
        {
          title: 'Divider 分割线',
          name: 'divider',
          path: '/mobile-react/components/divider',
          component: () => import('tdesign-mobile-react/divider/divider.md'),
        },
        {
          title: 'Icon 图标',
          name: 'button',
          path: '/mobile-react/components/icon',
          component: () => import('tdesign-mobile-react/icon/icon.md'),
        },
      ],
    },
    {
      title: '导航',
      name: 'tabs',
      type: 'navigation', // 组件文档
      children: [
        {
          title: 'Tabs 选项卡',
          name: 'tabs',
          path: '/mobile-react/components/tabs',
          component: () => import('tdesign-mobile-react/tabs/tabs.md'),
        },
        {
          title: 'Checkbox 多选框',
          name: 'checkbox',
          path: '/mobile-react/components/checkbox',
          component: () => import('tdesign-mobile-react/checkbox/checkbox.md'),
        },
        {
          title: 'Input 输入框',
          name: 'input',
          path: '/mobile-react/components/input',
          component: () => import('tdesign-mobile-react/input/input.md'),
        },
      ],
    },
    {
      title: '信息展示',
      name: 'info',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Cell 单元格',
          name: 'cell',
          path: '/mobile-react/components/cell',
          component: () => import('tdesign-mobile-react/cell/cell.md'),
        },
        {
          title: 'Grid 宫格',
          name: 'grid',
          path: '/mobile-react/components/grid',
          component: () => import('tdesign-mobile-react/grid/grid.md'),
        },
        {
          title: 'CountDown 倒计时',
          name: 'count-down',
          path: '/mobile-react/components/count-down',
          component: () => import('tdesign-mobile-react/count-down/count-down.md'),
        },
        {
          title: 'Sticky 吸顶',
          name: 'sticky',
          path: '/mobile-react/components/sticky',
          component: () => import('tdesign-mobile-react/sticky/sticky.md'),
        },
        {
          title: 'Image 图片',
          name: 'image',
          path: '/mobile-react/components/image',
          component: () => import('tdesign-mobile-react/image/image.md'),
        },
        {
          title: 'Loading 加载中',
          name: 'loading',
          path: '/mobile-react/components/loading',
          component: () => import('tdesign-mobile-react/loading/loading.md'),
        },
        {
          title: 'Swiper 轮播',
          name: 'swiper',
          path: '/mobile-react/components/swiper',
          component: () => import('tdesign-mobile-react/swiper/swiper.md'),
        },
        {
          title: 'Tag 标签',
          name: 'tag',
          path: '/mobile-react/components/tag',
          component: () => import('tdesign-mobile-react/tag/tag.md'),
        },
      ],
    },
    {
      title: '输入类组件',
      name: 'form',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Slider 滑动选择器',
          name: 'slider',
          path: '/mobile-react/components/slider',
          component: () => import('tdesign-mobile-react/slider/slider.md'),
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
          path: '/mobile-react/components/popup',
          component: () => import('tdesign-mobile-react/popup/popup.md'),
        },
        {
          title: 'Dialog 对话框',
          name: 'dialog',
          path: '/mobile-react/components/dialog',
          component: () => import('tdesign-mobile-react/dialog/dialog.md'),
        },
        {
          title: 'Badge 徽标',
          name: 'badge',
          path: '/mobile-react/components/badge',
          component: () => import('tdesign-mobile-react/badge/badge.md'),
        },
        {
          title: 'Message 信息提醒',
          name: 'message',
          path: '/mobile-react/components/message',
          component: () => import('tdesign-mobile-react/message/message.md'),
        },
        {
          title: 'Switch 开关',
          name: 'switch',
          path: '/mobile-react/components/switch',
          component: () => import('tdesign-mobile-react/switch/switch.md'),
        },
      ],
    },
  ],
};
