import { Global, Module } from '@nestjs/common';
import { env } from './common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/api/user/user.module';

import { LoginModule } from '@/api/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DiaryModule } from '@/api/diary/diary.module';
import { CommentModule } from '@/api/comment/comment.module';
import { AlbumModule } from '@/api/album/album.module';
import { UploadModule } from '@/api/upload/upload.module';
import { MoviesModule } from '@/api/movies/movies.module';
import { CuisineModule } from '@/api/cuisine/cuisine.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    UserModule,
    LoginModule,
    DiaryModule,
    CommentModule,
    AlbumModule,
    UploadModule,
    MoviesModule,
    CuisineModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'suhong',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
