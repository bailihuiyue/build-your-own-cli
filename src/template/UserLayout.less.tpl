@import '~antd/es/style/themes/default.less';

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: @layout-body-background;
}

.lang {
  width: 100%;
  height: 40px;
  line-height: 44px;
  text-align: right;
  :global(.ant-dropdown-trigger) {
    margin-right: 24px;
  }
}

.content {
  flex: 1;
  padding: 32px 0;
}

@media (min-width: @screen-md-min) {
  .container {
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .content {
    padding: 120px 0 24px;
  }
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
  a {
    text-decoration: none;
  }
}

.logo {
  height: 60px;
  margin-right: 16px;
  vertical-align: top;
}

.title {
  position: relative;
  top: 2px;
  color: @heading-color;
  font-weight: 600;
  font-size: 33px;
  font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.desc {
  margin-top: 12px;
  margin-bottom: 40px;
  color: @text-color-secondary;
  font-size: @font-size-base;
}
