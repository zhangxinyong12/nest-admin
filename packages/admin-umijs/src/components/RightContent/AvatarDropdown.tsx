import { LogoutApi } from '@/services';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import ResetPassword from './ResetPassword';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录 清空数据
 */
const loginOut = async () => {
  await LogoutApi();
  window.localStorage.clear();
  history.push('/user/login');
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  // 修改密码弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'password') {
        showModal();
        return;
      }

      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems: ItemType[] = [
    {
      key: 'password',
      icon: <SettingOutlined />,
      label: '修改密码',
      disabled:currentUser.phone==='13271150671' // 临时账号不允许修改密码
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
      items={menuItems}
    />
  );

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={currentUser.avatar}
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
      {isModalOpen ? (
        <ResetPassword
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default AvatarDropdown;
