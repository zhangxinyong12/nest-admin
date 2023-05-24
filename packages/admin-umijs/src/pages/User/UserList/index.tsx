import {
  DeleteUserAccountApi,
  GetUserAccountApi,
  PostUserAccountApi,
  PutUserAccountApi,
} from '@/services';
import type { SelectOptions } from '@/types';
import { reqTableData } from '@/utils';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

// 新增和编辑弹窗
type PropsTyep = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  data?: {
    id: string;
    name: string;
    phone:string;
    password:string;
  }
  options: SelectOptions;
  onOk: () => void;
};
const FormModale: React.FC<PropsTyep> = ({
  isModalOpen,
  setIsModalOpen,
  title = '新增用户',
  data,
  options = [],
  onOk,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [resData, setResData] = useState<any>({});
  useEffect(() => {
    if (data?.name) {
      // 获取详情
      GetUserAccountApi({
        id: data.id,
      }).then((res) => {
        setResData(res);
        const customers = res.customers.map((el) => el.customer_id);
        form.setFields([
          {
            name: 'customers',
            value: customers,
          },
          {
            name: 'fullname',
            value: res.fullname,
          },
          {
            name: 'username',
            value: res.username,
          },
        ]);
      });
    }
  }, [data, form]);

  const onFinish = async () => {
    form.validateFields().then((val) => {
      setConfirmLoading(true);
      const customers: any[] = [];
      val.customers.forEach((el) => {
        const item = options.find((ele) => ele.value === el);
        customers.push({
          customer_id: item?.value,
          customer_name: item?.label,
        });
      });
      const params = {
        ...val,
        customers,
        user_id: resData?.user_id,
        username: resData?.user_id ? undefined : val.username,
      };
      if (!data!.name) {
        PostUserAccountApi(params)
          .then((res) => {
            message.success('新增成功');
            setIsModalOpen(false);
            onOk();
          })
          .catch((err) => {
            form.setFields([
              {
                name: 'name',
                errors: [err.message.name],
              },
            ]);
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      } else {
        PutUserAccountApi(params)
          .then((res) => {
            message.success('修改成功');
            setIsModalOpen(false);
            onOk();
          })
          .catch((err) => {
            form.setFields([
              {
                name: 'name',
                errors: [err.message.name],
              },
            ]);
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      }
    });
  };

  const pattern = /^[a-zA-Z0-9]{8,8}$/;
  const validatorPassword = async (_, val: string) => {
    if (!val) {
      return Promise.resolve('');
    }
    if (!pattern.test(val)) {
      return Promise.reject('密码需8位长度的字符、数字或其组合');
    }
    return Promise.resolve('');
  };
  return (
    <>
      <Modal
        maskClosable={false}
        wrapClassName="form_modal"
        title={title}
        open={isModalOpen}
        onOk={onFinish}
        onCancel={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            name="customers"
            label="用户名称"
            rules={[
              {
                required: true,
                message: '用户名称不能为空',
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              placeholder="请选择用户名称（可多选）"
              options={options}
              allowClear
              mode="multiple"
            />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="姓名"
            rules={[
              {
                required: true,
                message: '姓名不能为空',
              },
              {
                min: 2,
                message: '至少2位',
              },
            ]}
          >
            <Input placeholder="请输入姓名" allowClear autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="username"
            label="账号"
            rules={[
              {
                required: true,
                message: '账号不能为空',
              },
              {
                min: 11,
                max: 11,
                // pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                // message: '仅限11位手机号作为账号',
                pattern: /^1\d{10}$/,
                message: '11位手机号',
              },
            ]}
          >
            <Input
              disabled={!!data?.phone}
              placeholder="仅限11位手机号作为账号"
              allowClear
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: !data?.password,
                message: '密码不能为空',
              },
              {
                min: 8,
                max: 8,
                // pattern: /^(?=.*[a-z-A-Z-0-9])[^]{8}$/,
                // message: '密码需8位长度的字符、数字或其组合',
                message: '密码需8位长度',
              },
            ]}
          >
            <Input.Password
              placeholder="密码需8位长度的字符、数字或其组合"
              allowClear
              autoComplete="new-password"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Page: React.FC = () => {
  const { confirm } = Modal;

  // 弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('新增账户');
  const [formData, setFormData] = useState<any>({});
  const add = () => {
    setFormData({});
    setTitle('新增账户');
    setIsModalOpen(true);
  };

  const AddRender = (
    <Button key="button" icon={<PlusOutlined />} onClick={add} type="primary">
      新增账户
    </Button>
  );

  // 编辑
  const edit = (data) => {
    setFormData(data);
    setTitle('编辑账户');
    setIsModalOpen(true);
  };

  const ref = useRef<ActionType>();
  const [selectList, setSelectList] = useState<SelectOptions>([]);

  const init = () => {};

  const refresh = () => {
    ref?.current?.reload();
    init();
  };

  const showDeleteConfirm = (item, action) => {
    confirm({
      title: '你确定要删除此条数据吗?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div className="ant-modal-confirm-content-delete">
          用户姓名：{item.name}
        </div>
      ),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        DeleteUserAccountApi( item.id ).then(() => {
          message.success('删除成功');
          ref?.current?.reload();
          init();
        });
      },
      onCancel() {},
    });
  };
  // 获取全部用户名称数据
  useEffect(() => {
    init();
  }, []);

  const columns: ProColumns[] = [
    {
      dataIndex: 'name',
      title: '用户名称',
    },
    {
      dataIndex: 'phone',
      title: '手机号',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <Button
          className="edit_btn"
          key="editable"
          onClick={() => edit(record)}
        >
          编辑
        </Button>,
        <Button
          className="delete_btn"
          key="deletetable"
          onClick={() => {
            showDeleteConfirm(record, action);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        pagination={{
          size: 'default',
          position: ['bottomRight'],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        rowKey="id"
        columns={columns}
        request={(params) => reqTableData(params, GetUserAccountApi)}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
        toolBarRender={() => [AddRender]}
      />

      {isModalOpen ? (
        <FormModale
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onOk={refresh}
          title={title}
          data={formData}
          options={selectList}
        />
      ) : (
        ''
      )}
    </PageContainer>
  );
};

export default Page;
