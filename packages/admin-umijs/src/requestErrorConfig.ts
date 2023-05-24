import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message as Message } from 'antd';
const loginPath = '/user/login';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

enum statusType {
  SUCCESSstatus = 200,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  status: 200 | 302;
  data: any; //  数据
  message: string; // 错误信息
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 这样写没用。不知道咋回事。文档上是这样说的。哎。。。。。
  // adaptor: (resData) => {
  //   console.log('adaptoradaptoradaptoradaptor');
  //   return {
  //     ...resData,
  //     success: resData.status === 200,
  //     errorMessage: resData.message,
  //   };
  // },
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      return Promise.reject(res);
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('错误接收及处理', error);
      if (opts?.skipErrorHandler) throw error;
      const { status, message, name } = error;
      if (status === 302) {
        // 登录过期跳转到登录页面
        Message.error('登录过期跳转到登录页面').then(() => {
          history.push(loginPath);
        });
      } else {
        Message.error(message || '请求出错');
      }
      return Promise.reject(error);
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 添加headers Authorization
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: 'Bearer ' + JSON.parse(token),
        };
      }
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      const { status, message } = data;
      if (status !== 200) {
        return Promise.reject(data);
      }
      return data;
    },
  ],
};
