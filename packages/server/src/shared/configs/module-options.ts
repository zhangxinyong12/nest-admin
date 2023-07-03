import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import configuration from './configuration';
const NODE_ENV = process.env.NODE_ENV || 'prod';
export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: `.env.${NODE_ENV}`,
  load: [configuration],
};
