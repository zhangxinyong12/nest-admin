import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as packageJson from '../package.json';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addTag('nestjs-boilerplate')
    .addBearerAuth() // 增加鉴权
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);
};
