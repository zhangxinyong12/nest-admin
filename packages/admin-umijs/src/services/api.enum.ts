enum apiList {
  Login = '/auth/login',
  Logout = '/auth/logout',
  UserchangePassword = '/user/change_password', // 修改密码
  UserchangeCustomer = '/user/change_customer', // 切换客户

  UserAccount = '/user', // 用户管理 CRUD

  AuthInfo = 'auth/info', // 获取用户信息
  Tangshi = 'tangshi',
}

export default apiList;
