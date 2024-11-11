import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from '@/api/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}