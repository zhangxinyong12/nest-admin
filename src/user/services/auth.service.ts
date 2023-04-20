import { MongoRepository } from 'typeorm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.mongo.entity';
import { LoginDTO } from '../dtos/login.dto';
import { encryptPassword } from 'src/shared/utils/cryptogram.util';
import { UserInfoDto } from '../dtos/auth.dto';
import { Role } from '../entities/role.mongo.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
  ) {}

  // 生成token
  async createToken(user: User) {
    const payload = { id: user.id };
    console.log(1111111, payload);
    const token = this.jwtService.sign(payload);
    return token;
  }

  /**
   * 登陆校验用户信息
   * @param loginDTO
   * @returns
   */
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { phone, password } = loginDTO;
    const user = await this.userRepository.findOneBy({ phone });
    console.log(user);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    console.log({ currentHashPassword, dbPassword });
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return user;
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.createToken(user);
    return {
      token,
    };
  }

  async info(id: string) {
    // 查询用户并获取权限
    const user = await this.userRepository.findOneBy(id);
    const data: UserInfoDto = Object.assign({}, user);
    if (user.role) {
      const role = await this.roleRepository.findOneBy(user.role);
      if (role) data.permissions = role.permissions;
    }

    return data;
  }
}
