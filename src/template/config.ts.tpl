block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks', 
  },
  externals: {
    config: 'config', 
  },
  outputPath: './../build',
  routes: pageRoutes, 
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: { 
    'primary-color': primaryColor,// 全局主色
    'link-color': primaryColor, // 链接色
    'font-size-base': '14px',
    'badge-font-size': '12px',
    'menu-dark-color': '#333333',
    'menu-dark-arrow-color': primaryColor,
    'menu-dark-bg': '#F0F2F5',
    'menu-dark-submenu-bg': '#0fc619',
    'menu-dark-highlight-color': primaryColor,
    'menu-dark-item-active-bg': '#F9E7EC',
    'menu-dark-selected-item-icon-color': primaryColor,
    'menu-dark-selected-item-text-color': primaryColor,
    'layout-sider-background': '#F0F2F5',
    // 'layout-body-background': '#F0F2F5',
  },