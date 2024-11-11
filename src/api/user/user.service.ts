import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/api/user/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Result } from '@/common/dto/result.dto';
import { CreateUserDto } from '@/api/user/dto/create-user.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async create(data: CreateUserDto) {
    const newUser = new User();
    newUser.name = '微信用户1';
    newUser.openid = data.openid;

    const entity = plainToInstance(User, newUser);
    return await this.entityManager.save(User, entity);
  }
}
