import { UserchangePasswordApi } from '@/services';
import { history, useModel } from '@umijs/max';
import { Form, Input, message, Modal } from 'antd';

type PropsTyep = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResetPassword: React.FC<PropsTyep> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();
  const pattern = /^[a-zA-Z0-9]{8,20}$/;
  const { initialState, setInitialState } = useModel('@@initialState');
  const validatorPassword = async (_, val: string) => {
    if (!val) {
      return Promise.reject('请输入密码');
    }
    if (!pattern.test(val)) {
      return Promise.reject('密码8-20位，字母数字大小写');
    }
    return Promise.resolve('');
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const onFinish = async () => {
    form.validateFields().then((val) => {
      const formData = {
        username: initialState?.currentUser?.name,
        old_password: val.old_password,
        new_password: val.password,
      };
      UserchangePasswordApi(formData).then(() => {
        message.success('修改密码成功，请重新登录');
        window.localStorage.clear();
        history.push('/user/login');
      });
    });
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title="修改密码"
        open={isModalOpen}
        onOk={onFinish}
        onCancel={handleOk}
      >
        <Form
          form={form}
          name="resetPassword"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            name="old_password"
            label="旧密码"
            rules={[
              {
                required: true,
                message: '旧密码不能为空',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password"
            label="新密码"
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
              {
                validator: validatorPassword,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入的密码不一致');
                },
              }),
              {
                validator: validatorPassword,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ResetPassword;
