import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntities } from '@/api/comment/entities/comment.entities';
import { CommentController } from '@/api/comment/comment.controller';
import { CommentService } from '@/api/comment/comment.service';
import { Diary } from '@/api/diary/entities/diary.entities';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntities, Diary])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
