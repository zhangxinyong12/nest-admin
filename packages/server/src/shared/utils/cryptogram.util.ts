import * as crypto from 'crypto';

// 根据参数len获取随机盐
export function makeSalt(len = 3): string {
  return crypto.randomBytes(len).toString('base64');
}

// 根据密码和盐生成加密密码
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}

// 根据文件buffer生成文件hash
export function getFileHash(buffer: Buffer): string {
  return crypto.createHash('md5').update(buffer).digest('hex');
}
