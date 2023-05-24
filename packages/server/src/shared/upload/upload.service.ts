import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ensureDir, outputFile } from 'fs-extra';

import { join } from 'path';
import { getFileHash } from '../utils/cryptogram.util';

@Injectable()
export class UploadService {
  /**
   * 上传
   */
  async upload(file) {
    // 判断是否存在此文件夹
    const uploadDir =
      !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ''
        ? process.env.UPLOAD_DIR
        : join(__dirname, '../../..', 'static/upload');

    await ensureDir(uploadDir);
    const currentSign = getFileHash(file.buffer);
    const arr = file.originalname.split('.');
    const fileType = arr[arr.length - 1];
    const fileName = currentSign + '.' + fileType;

    const uploadPath = uploadDir + '/' + fileName + '';
    await outputFile(uploadPath, file.buffer);

    return {
      url: '/static/upload/' + fileName,
      path: uploadPath,
    };
  }
}
