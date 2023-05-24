import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  async captche(size = 4, width = 100, height = 40) {
    const captcha = svgCaptcha.create({
      size, // 验证码长度
      // ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: this.createNoise(), // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: this.randomColor(133, 255), // 验证码图片背景颜色
      width: 100, // 验证码图片宽度
      height: 40, // 验证码图片高度
    });
    return captcha;
  }

  // 随机生成颜色
  private randomColor(min, max) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return `rgb(${r},${g},${b})`;
  }
  private randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // 随机生成数字
  private createNoise() {
    const number = Math.random().toString().slice(-1) || 2;
    return +number;
  }
}
