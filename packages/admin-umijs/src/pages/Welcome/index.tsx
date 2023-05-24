import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect } from 'react';
import styles from './index.less';

const Welcome: React.FC = () => {
  const initData = async () => {};

  useEffect(() => {
    initData();
  }, []);

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
      className={`${styles.welcome} welcome_page`}
    >
      <div>
        <h1 className="f-32 mt165">nestjs-admin-v1.1.0</h1>
        <div className="mt54">
          <h2>介绍</h2>
          <p>
            Nest 是一个用于构建高效，可扩展的 Node.js
            服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持
            TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了
            OOP（面向对象编程），FP（函数式编程）和
            FRP（函数式响应编程）的元素。 在底层，Nest使用强大的 HTTP Server
            框架，如 Express（默认）和 Fastify。Nest
            在这些框架之上提供了一定程度的抽象，同时也将其 API
            直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。
          </p>
          <h2>哲学</h2>
          <p>
            近年来，感谢 Node.js，JavaScript
            已成为前端和后端应用程序的网络“通用语言”。这产生了令人敬畏的项目，如
            Angular，React 和
            Vue，它们提高了开发人员的工作效率，并能够构建快速，可测试和可扩展的前端应用程序。然而，虽然
            Node（和服务器端 JavaScript
            ）存在大量优秀的库，帮助器和工具，但它们都没有有效地解决主要问题 -
            架构。 Nest
            提供了一个开箱即用的应用程序架构，允许开发人员和团队创建高度可测试，可扩展，松散耦合且易于维护的应用程序。
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
