import { request } from '@umijs/max';
import apiList from './api.enum';

/**
 * 登录
 */
export async function LoginApi(data: { username: string; password: string }) {
  return request(apiList.Login, {
    method: 'POST',
    data,
  });
}

/**
 *  退出登录
 */
export async function LogoutApi() {
  return request(apiList.Logout, {
    method: 'POST',
  });
}

/**
 *  修改密码
 */
export async function UserchangePasswordApi(data) {
  return request(apiList.UserchangePassword, {
    method: 'POST',
    data,
  });
}

// 用户
export async function GetUserAccountApi(params) {
  return request(apiList.UserAccount, {
    method: 'GET',
    params,
  });
}
export async function PostUserAccountApi(data) {
  return request(apiList.UserAccount, {
    method: 'POST',
    data,
  });
}
export async function PutUserAccountApi(data) {
  return request(apiList.UserAccount, {
    method: 'PUT',
    data,
  });
}
export async function DeleteUserAccountApi(id) {
  return request(apiList.UserAccount + `/${id}`, {
    method: 'DELETE',
  });
}

// 获取用户信息
export async function AuthInfo() {
  return request(apiList.AuthInfo, {
    method: 'GET',
  });
}
