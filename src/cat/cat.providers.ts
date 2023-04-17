import { Cat } from './entities/cat.mysql.entity';

export const CatProviders = [
  {
    provide: 'CAT_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Cat),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
