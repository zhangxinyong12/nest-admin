import { User } from './entities/user.mysql.entity';
import { IdCard } from './entities/idCard.mysql.entity';
import { Department } from './entities/department.mysql.entity';
import { Employee } from './entities/employee.mysql.entity';
import { Article } from './entities/article..mysql.entity';
import { Tag } from './entities/tag.mysql.entity';

export const UserProviders = [
  {
    provide: 'TYPEORM_TEST_USER_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'TYPEORM_TEST_IDCARD_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(IdCard),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'TYPEORM_TEST_DEPARTMENT_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Department),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'TYPEORM_TEST_EMPLOYEE_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Employee),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'TYPEORM_TEST_ARTICLE_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Article),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'TYPEORM_TEST_TAG_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Tag),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
