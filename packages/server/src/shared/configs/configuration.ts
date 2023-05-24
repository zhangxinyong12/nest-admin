export default (): any => {
  const config = {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT,

    // 数据库配置
    database: {
      // mongodb 配置
      mongodb: {
        url: process.env.DB_MONGODB_URL,
        name: process.env.DB_MONGODB_NAME,
        user: process.env.DB_MONGODB_USER,
        pass: process.env.DB_MONGODB_PASS,
        synchronize: process.env.DB_MONGODB_SYNCHRONIZE === 'true',
        logging: process.env.DB_MONGODB_LOGGING === 'true',
      },
      // mysql 配置
      mysql: {
        url: process.env.DB_MYSQL_URL,
        port: process.env.DB_MYSQL_PORT,
        name: process.env.DB_MYSQL_NAME,
        user: process.env.DB_MYSQL_USER,
        pass: process.env.DB_MYSQL_PASS,
        synchronize: process.env.DB_MYSQL_SYNCHRONIZE === 'true',
        logging: process.env.DB_MYSQL_LOGGING === 'true',
      },
    },

    // jwt 配置
    jwt: {
      secret: process.env.JWT_SECRET, // 秘钥
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN, // 过期时间
      },
    },

    // redis 配置
    redis: {
      url: process.env.REDIS_URL,
    },

    // cms 配置
    cms: {
      validateToken: process.env.NEST_VALIDATE_TOKEN,
      host: process.env.NEXT_HOST,
    },
  };
  return config;
};
