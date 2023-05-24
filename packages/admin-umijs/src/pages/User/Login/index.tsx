import Footer from '@/components/Footer';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Form, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';

import LoginFormImg from '@/assets/img/login-form.svg';
import { LoginApi } from '@/services';
import type { UserDataType } from '@/types';

type validateStatusType =
  | ''
  | 'success'
  | 'warning'
  | 'error'
  | 'validating'
  | undefined;

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const pattern = /^[a-zA-Z0-9]{8,20}$/;
  const validatorUsername = async (_, val: string) => {
    if (!val) {
      return Promise.reject('请输入用户名');
    }
    if (!pattern.test(val)) {
      return Promise.reject('用户名8-20位，字母数字大小写');
    }
    return Promise.resolve('');
  };
  const validatorPassword = async (_, val: string) => {
    if (!val) {
      return Promise.reject('请输入密码');
    }
    if (!pattern.test(val)) {
      return Promise.reject('密码8-20位，字母数字大小写');
    }
    return Promise.resolve('');
  };

// 设置表单默认初始值
useEffect(()=>{
  form.setFieldsValue({
    phone:'13271150671',
    password:'123456'
  })
},[])

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: {
          ...userInfo,
        },
      }));
    }
  };

  const handleSubmit = async (values) => {
    LoginApi({ ...values }).then(async (data) => {
      const UserData: UserDataType = {
        ...data,
      };
    
      window.localStorage.setItem('UserData', JSON.stringify(UserData));
      console.log(data.token, typeof data.token);
      window.localStorage.setItem('token', JSON.stringify(data.token));
      await setInitialState((s) => ({
        ...s,
        currentUser: UserData,
      }));
      await fetchUserInfo();

      message.success('登录成功');

      history.push('/welcome');
    });
   
  };

  useEffect(() => {
    const titleHTML = document.createElement('title');
    titleHTML.innerHTML = `登录`;
    document.querySelector('head')?.append(titleHTML);
  }, []);

  return (
    <div className={`${styles.container} login_form_box`}>
      <div className={styles.box}>
        <div className={styles.left}>
          <img src={LoginFormImg} />
        </div>

        <div className={styles.right}>
          <LoginForm
            form={form}
            title="nestjs-admin"
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <ProFormText
              name="phone"
              label="账号"
              placeholder={'11位手机号'}
              rules={[
                {
                  required: true,
                  message: '账号不能为空',
                },
                {
                  min: 11,
                  max: 11,
                  pattern: /^1\d{10}$/,
                  message: '11位手机号',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              label="密码"
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
