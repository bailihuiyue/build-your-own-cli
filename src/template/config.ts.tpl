  block: {
    defaultGitUrl: 'https://github.com/bailihuiyue/ant-design-pro-blocks.git', 
  },
  externals: {
    config: 'config', 
  },
  outputPath: './../build',
  routes: pageRoutes, 
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: { 
    'primary-color': themeColor,// 全局主色
    'link-color': themeColor, // 链接色
    'font-size-base': '14px',
    'badge-font-size': '12px',
    'menu-dark-color': '#333333',
    'menu-dark-arrow-color': themeColor,
    'menu-dark-bg': '#F0F2F5',
    'menu-dark-submenu-bg': '#0fc619',
    'menu-dark-highlight-color': themeColor,
    'menu-dark-item-active-bg': '#F9E7EC',
    'menu-dark-selected-item-icon-color': themeColor,
    'menu-dark-selected-item-text-color': themeColor,
    'layout-sider-background': '#F0F2F5',
    // 'layout-body-background': '#F0F2F5',
  },