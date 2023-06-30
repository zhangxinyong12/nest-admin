import { User } from './entities/user.mysql.entity';

export const UserProviders = [
  {
    provide: 'TYPEORM_TEST_USER_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
