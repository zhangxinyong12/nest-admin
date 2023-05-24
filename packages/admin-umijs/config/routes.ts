/**
import default from './../src/services/swagger/index';
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 * routes 数组第一项要是重定向配置
 *  权限 role_id
 *  0：  admin
 *  1： user
 */
const defaultRouter = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '首页',
    component: './Welcome',
  },
  {
    path: '/user-list',
    name: '用户列表',
    component: './User/UserList',
  },
  // {
  //   path: '*',
  //   layout: false,
  //   component: '/welcome',
  // },
];

export default [
  ...defaultRouter,
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    redirect: '/welcome',
  },
];
