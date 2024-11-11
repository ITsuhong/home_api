import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '@/api/user/entities/user.entity';
import { Result } from '@/common/dto/result.dto';
import { BcryptUtil } from '../../common/utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import { env } from '@/common/config';
import { UserService } from '@/api/user/user.service';
import fetch from 'node-fetch';
@Injectable()
export class LoginService {
  @InjectEntityManager()
  private entityManager: EntityManager;
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(UserService)
  private userService: UserService;
  async login(data: LoginDto) {
    const res = await fetch(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${env.WX_CONFIG.AppID}&secret=${env.WX_CONFIG.AppSecret}&js_code=${data.js_code}&grant_type=authorization_code`,
    );
    const { openid } = await res.json();
    console.log(openid);
    try {
      const result = await this.entityManager
        .createQueryBuilder(User, 'user')
        .where('user.openid = :openid', { openid: openid })
        .getOne();
      if (result === null) {
        const user = this.userService.create({ openid });
        const token = this.jwtService.sign({ user: user });
        return new Result().ok({ data: { ...result, token } });
      } else {
        const token = this.jwtService.sign({ user: result });
        return new Result().ok({ data: { ...result, token } });
      }
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }
}
