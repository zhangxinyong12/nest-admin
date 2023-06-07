import { DeleteUserAccountApi, Tangshi } from '@/services';
import type { SelectOptions } from '@/types';
import { reqTableData } from '@/utils';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

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
        DeleteUserAccountApi(item.id).then(() => {
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
      dataIndex: 'title',
      title: '标题',
    },
    {
      dataIndex: 'auth',
      title: '作者',
    },
    {
      dataIndex: 'type',
      title: '类型',
    },
    {
      dataIndex: 'content',
      title: '内容',
      render: (text: any, record) => (
        <div className="content">
          {text!.map((el) => (
            <p>{el}</p>
          ))}
        </div>
      ),
    },
    {
      dataIndex: 'updatedAt',
      title: '修改时间',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   width: 200,
    //   render: (text, record, _, action) => [
    //     <Button
    //       className="edit_btn"
    //       key="editable"
    //       onClick={() => edit(record)}
    //     >
    //       编辑
    //     </Button>,
    //     <Button
    //       className="delete_btn"
    //       key="deletetable"
    //       onClick={() => {
    //         showDeleteConfirm(record, action);
    //       }}
    //     >
    //       删除
    //     </Button>,
    //   ],
    // },
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
        rowKey="_id"
        columns={columns}
        request={(params) => reqTableData(params, Tangshi)}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
        // toolBarRender={() => [AddRender]}
      />
    </PageContainer>
  );
};

export default Page;
