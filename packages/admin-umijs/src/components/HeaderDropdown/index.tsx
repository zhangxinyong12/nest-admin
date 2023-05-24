import { Dropdown, MenuProps } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  menu: MenuProps;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
} & DropDownProps &
React.RefAttributes<HTMLDivElement>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  menu,
  ...restProps
}) => {
  
  return (
    <Dropdown
      overlayClassName={classNames(styles.container, cls)}
      getPopupContainer={(target) => target.parentElement || document.body}
       menu={menu}
      {...restProps}
    />
  );
};

export default HeaderDropdown;
