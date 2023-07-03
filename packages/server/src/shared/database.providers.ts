import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

// 设置数据库类型
const databaseMongodbType: DataSourceOptions['type'] = 'mongodb';
const databaseMysqlType: DataSourceOptions['type'] = 'mysql';
// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = {
        type: databaseMongodbType,
        url: configService.get<string>('database.mongodb.url'),
        username: configService.get<string>('database.mongodb.user'),
        password: configService.get<string>('database.mongodb.pass'),
        database: configService.get<string>('database.mongodb.name'),
        entities: [path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)],
        logging: configService.get<boolean>('database.mongodb.logging'), // 这个配置项在mongodb中无效 https://github.com/typeorm/typeorm/issues/1934
        synchronize: configService.get<boolean>('database.mongodb.synchronize'), // 自动同步表结构，生产环境慎用
      };

      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
  {
    provide: 'MYSQL_DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config = {
        type: databaseMysqlType,
        host: configService.get<string>('database.mysql.url'),
        port: configService.get<number>('database.mysql.port'),
        username: configService.get<string>('database.mysql.user'),
        password: configService.get<string>('database.mysql.pass'),
        database: configService.get<string>('database.mysql.name'),
        entities: [path.join(__dirname, `../../**/*.mysql.entity{.ts,.js}`)],
        logging: configService.get<boolean>('database.mysql.logging'),
        synchronize: configService.get<boolean>('database.mysql.synchronize'),
        // 数据库迁移使用
        // migrationsTableName: 'custom_migration_table', // - 仅当需要迁移表名称与migrations不同时才指定此选项。
        migrations: ['migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      };

      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
];
