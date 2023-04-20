import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './configs/module-options';
import { DatabaseProviders } from './database.providers';
import { AppLoggerModule } from './logger/logger.module';
import { UploadService } from './upload/upload.service';

@Module({
  // 注入Config
  imports: [AppLoggerModule, ConfigModule.forRoot(configModuleOptions)],

  // 暴露Config
  exports: [ConfigModule, AppLoggerModule, ...DatabaseProviders, UploadService],
  providers: [...DatabaseProviders, UploadService],
})
export class ShareModule {}
// export class ShareModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     console.log(11111111111);
//     // 添加全局响应拦截器
//     consumer.apply((req, res, next) => {
//       const originalJson = res.json.bind(res);
//       console.log('全局响应拦截器', originalJson);

//       res.json = (data: any) => {
//         if (data && data.error) {
//           // 处理错误响应
//           res.status(200).send({
//             status: res.status,
//             success: false,
//             message: data.message || 'Internal Server Error',
//             error: data.error,
//           });
//         } else {
//           // 处理正常响应
//           res.send({
//             status: 200,
//             success: true,
//             data,
//           });
//         }
//       };
//       next();
//     });
//   }
// }
