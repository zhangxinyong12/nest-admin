import { BookUser } from './entities/user.entity';

export const BookUserProviders = [
  {
    provide: 'BOOT_USER_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(BookUser),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
