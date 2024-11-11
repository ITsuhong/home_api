import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entities';
import { DiaryController } from '@/api/diary/diary.controller';
import { DiaryService } from '@/api/diary/diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
