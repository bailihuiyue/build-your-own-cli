export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        hideInMenu: true,
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
