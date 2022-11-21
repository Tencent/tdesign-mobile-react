export default {
  docs: [
    {
      title: '开始',
      type: 'document', // 普通文档
      children: [
        {
          title: '快速开始',
          name: 'getting-started',
          path: '/mobile-react/getting-started',
          component: () => import('@/getting-started.md'),
        },
        {
          title: '更新日志',
          name: 'changelog',
          path: '/mobile-react/changelog',
          component: () => import('@/CHANGELOG.md'),
        },
        {
          title: '组件概览',
          name: 'overview',
          path: '/mobile-react/overview',
          component: () => import('@common/docs/mobile/overview.md'),
        },
      ],
    },
    {
      title: '基础组件',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Button 按钮',
          name: 'button',
          path: '/mobile-react/components/button',
          component: () => import('tdesign-mobile-react/button/button.md'),
        },
        {
          title: 'Fab 悬浮按钮',
          name: 'fab',
          path: '/mobile-react/components/fab',
          component: () => import('tdesign-mobile-react/fab/fab.md'),
        },

        {
          title: 'Icon 图标',
          name: 'icon',
          path: '/mobile-react/components/icon',
          component: () => import('tdesign-mobile-react/icon/icon.md'),
        },
      ],
    },
    {
      title: '布局',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Cell 单元格',
          name: 'cell',
          path: '/mobile-react/components/cell',
          component: () => import('tdesign-mobile-react/cell/cell.md'),
        },
        {
          title: 'Divider 分割符',
          name: 'divider',
          path: '/mobile-react/components/divider',
          component: () => import('tdesign-mobile-react/divider/divider.md'),
        },
        {
          title: 'Grid 宫格',
          name: 'grid',
          path: '/mobile-react/components/grid',
          component: () => import('tdesign-mobile-react/grid/grid.md'),
        },
      ],
    },
    {
      title: '导航',
      type: 'component',
      children: [
        // {
        //   title: 'DropdownMenu 下拉菜单',
        //   name: 'dropdown-menu',
        //   path: '/mobile-react/components/dropdown-menu',
        //   component: () => import('tdesign-mobile-react/dropdown-menu/dropdown-menu.md'),
        // },
        // {
        //   title: 'Navbar 导航条',
        //   name: 'navbar',
        //   path: '/mobile-react/components/navbar',
        //   component: () => import('tdesign-mobile-react/navbar/navbar.md'),
        // },
        {
          title: 'Steps 步骤条',
          name: 'steps',
          path: '/mobile-react/components/steps',
          component: () => import('tdesign-mobile-react/steps/steps.md'),
        },
        {
          title: 'Sticky 吸顶容器',
          name: 'sticky',
          path: '/mobile-react/components/sticky',
          component: () => import('tdesign-mobile-react/sticky/sticky.md'),
        },
        {
          title: 'TabBar 标签栏',
          name: 'tab-bar',
          path: '/mobile-react/components/tabbar',
          component: () => import('tdesign-mobile-react/tab-bar/tab-bar.md'),
        },
        {
          title: 'Navbar 导航栏',
          name: 'navbar',
          path: '/mobile-react/components/navbar',
          component: () => import('tdesign-mobile-react/navbar/navbar.md'),
        },
        {
          title: 'Tabs 选项卡',
          name: 'tabs',
          path: '/mobile-react/components/tabs',
          component: () => import('tdesign-mobile-react/tabs/tabs.md'),
        },
        {
          title: 'Indexes 索引',
          name: 'indexes',
          path: '/mobile-react/components/indexes',
          component: () => import('tdesign-mobile-react/indexes/indexes.md'),
        },
      ],
    },
    {
      title: '输入',
      type: 'component',
      children: [
        {
          title: 'CheckBox 多选框',
          name: 'checkbox',
          path: '/mobile-react/components/checkbox',
          component: () => import('tdesign-mobile-react/checkbox/checkbox.md'),
        },
        // {
        //   title: 'DateTimePicker 时间选择器',
        //   name: 'date-time-picker',
        //   path: '/mobile-react/components/date-time-picker',
        //   component: () => import('tdesign-mobile-react/date-time-picker/date-time-picker.md'),
        // },
        {
          title: 'Input 输入框',
          name: 'input',
          path: '/mobile-react/components/input',
          component: () => import('tdesign-mobile-react/input/input.md'),
        },
        {
          title: 'Picker 选择器',
          name: 'picker',
          path: '/mobile-react/components/picker',
          component: () => import('tdesign-mobile-react/picker/picker.md'),
        },
        {
          title: 'Radio 单选框',
          name: 'radio',
          path: '/mobile-react/components/radio',
          component: () => import('tdesign-mobile-react/radio/radio.md'),
        },
        {
          title: 'Rate 评分',
          name: 'rate',
          path: '/mobile-react/components/rate',
          component: () => import('tdesign-mobile-react/rate/rate.md'),
        },
        {
          title: 'Search 搜索框',
          name: 'search',
          path: '/mobile-react/components/search',
          component: () => import('tdesign-mobile-react/search/search.md'),
        },
        {
          title: 'Slider 滑动选择器',
          name: 'slider',
          path: '/mobile-react/components/slider',
          component: () => import('tdesign-mobile-react/slider/slider.md'),
        },
        {
          title: 'Stepper 步进器',
          name: 'stepper',
          path: '/mobile-react/components/stepper',
          component: () => import('tdesign-mobile-react/stepper/stepper.md'),
        },
        {
          title: 'Switch 开关',
          name: 'switch',
          path: '/mobile-react/components/switch',
          component: () => import('tdesign-mobile-react/switch/switch.md'),
        },
        {
          title: 'Textarea 多行输入框',
          name: 'textarea',
          path: '/mobile-react/components/textarea',
          component: () => import('tdesign-mobile-react/textarea/textarea.md'),
        },
        {
          title: 'Upload 上传',
          name: 'upload',
          path: '/mobile-react/components/upload',
          component: () => import('tdesign-mobile-react/upload/upload.md'),
        },
      ],
    },
    {
      title: '数据展示',
      type: 'component',
      children: [
        {
          title: 'Avatar 头像',
          name: 'avatar',
          path: '/mobile-react/components/avatar',
          component: () => import('tdesign-mobile-react/avatar/avatar.md'),
        },
        {
          title: 'Badge 徽标',
          name: 'badge',
          path: '/mobile-react/components/badge',
          component: () => import('tdesign-mobile-react/badge/badge.md'),
        },
        // {
        //   title: 'Collapse 折叠面板',
        //   name: 'collapse',
        //   path: '/mobile-react/components/collapse',
        //   component: () => import('tdesign-mobile-react/collapse/collapse.md'),
        // },
        {
          title: 'CountDown 倒计时',
          name: 'count-down',
          path: '/mobile-react/components/count-down',
          component: () => import('tdesign-mobile-react/count-down/count-down.md'),
        },
        {
          title: 'Image 图片',
          name: 'image',
          path: '/mobile-react/components/image',
          component: () => import('tdesign-mobile-react/image/image.md'),
        },
        // {
        //   title: 'List 列表',
        //   name: 'list',
        //   path: '/mobile-react/components/list',
        //   component: () => import('tdesign-mobile-react/list/list.md'),
        // },
        // {
        //   title: 'ImageViewer 图片预览',
        //   name: 'image-viewer',
        //   path: '/mobile-react/components/image-viewer',
        //   component: () => import('tdesign-mobile-react/image-viewer/image-viewer.md'),
        // },
        {
          title: 'Skeleton 骨架屏',
          name: 'skeleton',
          path: '/mobile-react/components/skeleton',
          component: () => import('tdesign-mobile-react/skeleton/skeleton.md'),
        },
        {
          title: 'Swiper 轮播',
          name: 'swiper',
          path: '/mobile-react/components/swiper',
          component: () => import('tdesign-mobile-react/swiper/swiper.md'),
        },
        {
          title: 'SwipeCell 滑动单元格',
          name: 'swipe-cell',
          path: '/mobile-react/components/swipe-cell',
          component: () => import('tdesign-mobile-react/swipe-cell/swipe-cell.md'),
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
      title: '消息提醒',
      type: 'component', // 组件文档
      children: [
        {
          title: 'ActionSheet 动作面板',
          name: 'action-sheet',
          path: '/mobile-react/components/actionsheet',
          component: () => import('tdesign-mobile-react/action-sheet/action-sheet.md'),
        },
        {
          title: 'BackTop 返回顶部',
          name: 'back-top',
          meta: { docType: 'base' },
          path: '/mobile-react/components/back-top',
          component: () => import('tdesign-mobile-react/back-top/back-top.md'),
        },
        {
          title: 'Dialog 弹出框',
          name: 'dialog',
          path: '/mobile-react/components/dialog',
          component: () => import('tdesign-mobile-react/dialog/dialog.md'),
        },
        {
          title: 'Drawer 抽屉',
          name: 'drawer',
          path: '/mobile-react/components/drawer',
          component: () => import('tdesign-mobile-react/drawer/drawer.md'),
        },
        {
          title: 'Loading 加载',
          name: 'loading',
          path: '/mobile-react/components/loading',
          component: () => import('tdesign-mobile-react/loading/loading.md'),
        },
        {
          title: 'Message 消息通知',
          name: 'message',
          path: '/mobile-react/components/message',
          component: () => import('tdesign-mobile-react/message/message.md'),
        },
        {
          title: 'Popup 弹出层',
          name: 'popup',
          path: '/mobile-react/components/popup',
          component: () => import('tdesign-mobile-react/popup/popup.md'),
        },
        {
          title: 'Progress 进度条',
          name: 'progress',
          path: '/mobile-react/components/progress',
          component: () => import('tdesign-mobile-react/progress/progress.md'),
        },
        {
          title: 'PullDownRefresh 下拉刷新',
          name: 'pull-down-refresh',
          path: '/mobile-react/components/pull-down-refresh',
          component: () => import('tdesign-mobile-react/pull-down-refresh/pull-down-refresh.md'),
        },
        {
          title: 'Toast 轻提示',
          name: 'toast',
          path: '/mobile-react/components/toast',
          component: () => import('tdesign-mobile-react/toast/toast.md'),
        },
        {
          title: 'NoticeBar 公告栏',
          name: 'notice-bar',
          path: '/mobile-react/components/notice-bar',
          component: () => import('tdesign-mobile-react/notice-bar/notice-bar.md'),
        },
      ],
    },
  ],
};
