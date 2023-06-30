import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { ReqPage } from '../type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mysql.entity';
import { IdCard } from './entities/idCard.mysql.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('TYPEORM_TEST_USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('TYPEORM_TEST_IDCARD_REPOSITORY')
    private idCardRepository: Repository<IdCard>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // 分页接口
  async findAll(query?: ReqPage) {
    const { page = 1, pageSize = 10, params } = query;
    const { firstName, lastName, age } = params;
    const where = {};
    // 这里的逻辑是，如果有传入参数，就加入到 where 条件中 模糊查询
    if (firstName) {
      where['firstName'] = Like(`%${firstName}%`);
    }
    if (lastName) {
      where['lastName'] = Like(`%${lastName}%`);
    }
    if (age) {
      where['age'] = age;
    }

    const [items, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      order: {
        id: 'ASC',
      },
    });

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['idCard'], // 这里的 idCard 是 user.entity.ts 中的 idCard 字段 @OneToOne(() => IdCard) idCard: IdCard; 也就是关联的字段
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async text1to1() {
    const user = new User();
    user.firstName = '测试firstName1' + Math.random();
    user.lastName = '测试lastName1';
    user.age = 18;

    const idCard = new IdCard();
    idCard.cardName = '1234567891' + Math.random();
    idCard.user = user;

    await this.userRepository.save(user);
    await this.idCardRepository.save(idCard);
    return {
      user,
      idCard,
    };
  }

  async findIdCard(id: number) {
    const idCard = await this.idCardRepository.findOne({
      where: { id },
      relations: ['user'], // 这里的 user 是 idCard.entity.ts 中的 user 字段 @OneToOne(() => User) user: User; 也就是关联的字段
    });
    return idCard;
  }

  async updateIdCard(
    id: number,
    boday: {
      cardName: string;
    },
  ) {
    await this.idCardRepository.update(id, boday);
    return this.findIdCard(id);
  }
}
