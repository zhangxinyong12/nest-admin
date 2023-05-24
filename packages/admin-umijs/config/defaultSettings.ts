import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  primaryColor?: string;
  token?: any;
  siderWidth?: number;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1F69FF',
  colorPrimary: '#0A64FF', // 主题颜色
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'xxxx管理后台',
  pwa: false,
  splitMenus: false, // 自动分割一级菜单放到header头部、
  // footerRender: true,

  logo: '/logo.svg',
  iconfontUrl: '/favicon.ico?t=1.1.0',
  siderWidth: 200,
  token: {
    // //  Sider Token 是 侧边菜单的色值，与顶部菜单不同。
    // sider: {
    //   colorTextMenuTitle: 'red', // sider 的标题字体颜色
    //   colorTextMenu: '#000',
    //   colorTextMenuSelected: '#0A64FF', // menuItem 的选中字体颜色
    //   colorBgMenuItemHover: '#f0f7ff', // menuItem 的 hover 背景颜色
    //   colorBgMenuItemSelected: '#f0f7ff', // menuItem 的选中背景颜色
    // },
    // header: {
    //   colorHeaderTitle: '#000',
    //   colorTextMenuSelected: 'red',
    // },
  },
};

export default Settings;
