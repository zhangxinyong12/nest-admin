import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { AuthInfo } from './services';
import { UserDataType } from './types';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// 会在整个应用最开始执行，返回值会作为全局共享的数据 用来获取用户信息和判断用户是否登录
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserDataType;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any>;
}> {
  const fetchUserInfo = async () => {
    return AuthInfo().then(res=>{
      // 从localStorage中读取数据
      let UserData = JSON.parse(
        window.localStorage.getItem('UserData') as string,
      );
      UserData = Object.assign(res,UserData)

      if (!UserData || !Object.keys(UserData).length) {
        history.push(loginPath);
      } else {
        return UserData;
      }
    }).catch(err=>{
      history.push(loginPath);
    })

  };
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}
// 爱
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    // menu: {
    //   // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
    //   params: {
    //     userId: initialState?.currentUser?.userid,
    //   },
    //   request: async (params, defaultMenuData) => {
    //     console.log('请求菜单');
    //     // initialState.currentUser 中包含了所有用户信息
    //     // const menuData = await fetchMenuData();
    //     return [];
    //   },
    // },
    rightContentRender: () => <RightContent />,
    // 配置水印
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>账户切换中，请稍等....</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
  dataField: 'data',
  timeout: 1000 * 60 * 10000000,
  baseURL: '/api',
  onDownloadProgress: function (progressEvent) {
    // 浏览器的行为
    // console.log('progressEvent', progressEvent);
  },
};

// 阻止Promise抛出reject但是没有写catch
window.onunhandledrejection = (event) => {
  // 不兼容ie
  console.warn(event.reason);
  event.preventDefault();
};
