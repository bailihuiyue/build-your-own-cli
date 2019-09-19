
/* new style */
:global{
  .ant-btn-block{
    margin-bottom: 5px ;
  }
  .ant-pro-sider-menu-logo,
  .ant-pro-global-header-logo{
    background: @primary-color !important;
  }
  .ant-pro-global-header-logo{
    padding: 0 10px 0 10px !important;
  }
  .ant-layout-sider-collapsed{
    .ant-pro-sider-menu-logo{
      padding-left: 4px;
    }
  }
  .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{
    border-right: 3px solid @primary-color !important;
  }
  .ant-menu-dark{
     .ant-menu-inline.ant-menu-sub{
      box-shadow:0 2px 8px rgba(189, 164, 164, 0.45) inset !important;
     }
  }
}