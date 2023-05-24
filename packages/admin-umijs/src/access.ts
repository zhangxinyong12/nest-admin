/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// 权限定义
export default function access(initialState) {
  const { currentUser } = initialState ?? {};
  const admin = currentUser?.isAdmin;
  const user = !currentUser?.isAdmin;
  return {
    admin,
    user,
  };
}
