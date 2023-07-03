import { Inject, Injectable } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { ReqPage } from '../type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mysql.entity';
import { IdCard } from './entities/idCard.mysql.entity';
import { Department } from './entities/department.mysql.entity';
import { Employee } from './entities/employee.mysql.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('TYPEORM_TEST_USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('TYPEORM_TEST_IDCARD_REPOSITORY')
    private idCardRepository: Repository<IdCard>,
    @Inject('TYPEORM_TEST_DEPARTMENT_REPOSITORY')
    private departmentRepository: Repository<Department>,
    @Inject('TYPEORM_TEST_EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
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

  async deleteIdCard(id: number) {
    return this.idCardRepository.delete(id);
  }

  // 测试 1 对 多的关系 新增
  async text1toMany() {
    // const d1 = new Department();
    // d1.name = '测试部门1_' + Math.random();
    // const e1 = new Employee();
    // e1.name = '测试员工1_' + Math.random();
    // e1.department = d1;
    // const e2 = new Employee();
    // e2.name = '测试员工2_' + Math.random();
    // e2.department = d1;
    // const e3 = new Employee();
    // e3.name = '测试员工3_' + Math.random();
    // e3.department = d1;
    // await this.departmentRepository.save(d1); // 如果是设置了 cascade，那就只需要保存 empolyee 就好了
    // await this.employeeRepository.save([e1, e2, e3]);

    const e1 = new Employee();
    e1.name = '测试员工_' + Math.random();
    const e2 = new Employee();
    e2.name = '测试员工_' + Math.random();
    const e3 = new Employee();
    e3.name = '测试员工_' + Math.random();
    const d1 = new Department();
    d1.name = '测试部门_' + Math.random();
    d1.employees = [e1, e2, e3];
    await this.departmentRepository.save(d1);
    return {
      d1,
    };
  }

  // 测试 1 对 多的关系 查询
  async findDepartment(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['employees'], // 这里的 employees 是 department.entity.ts 中的 employees 字段 @OneToMany(() => Employee, (employee) => employee.department)
    });
    return department;
  }

  // 测试 1 对 多的关系 查询 一个部门下的所有员工
  async findEmployee(id: number) {
    const employees = await this.employeeRepository.find({
      where: { id },
      relations: ['department'], // 这里的 department 是 employee.entity.ts 中的 department 字段 @ManyToOne(() => Department, (department) => department.employees)
    });
    return employees;
  }

  // 测试 1 对 多的关系 删除部门
  async deleteDepartment(id: number) {
    return this.departmentRepository.delete(id);
  }
}
