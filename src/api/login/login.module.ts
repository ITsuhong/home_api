import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserService } from '@/api/user/user.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {}
