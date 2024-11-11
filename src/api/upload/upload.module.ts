import { Module } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // destination: join(__dirname, '..', 'public'),
        destination: 'public',
        filename: (data, file, callback) => {
          console.log(data.body.key, file, '文件2');
          // const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          const fileName = data.body.key;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
