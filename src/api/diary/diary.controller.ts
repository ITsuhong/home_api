import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DiaryService } from '@/api/diary/diary.service';
import { CreateDiaryDto } from '@/api/diary/dto/create-diary.dto';
import { LoginGuard } from '@/common/guards/login.guard';
import { UserInfo } from '@/common/decorator/user.decorator';
import { User } from '@/api/user/entities/user.entity';
import { PaginationDTO } from '@/common/dto/pagination.dto';
import { FindDiaryDto } from '@/api/diary/dto/find-diary.dto';

@UseGuards(LoginGuard)
@Controller('/diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post('/create')
  create(@Body() data: CreateDiaryDto, @UserInfo() user: User) {
    return this.diaryService.create(data, user);
  }

  @Post('/list')
  getList(@Body() data: FindDiaryDto, @UserInfo() user: User) {
    return this.diaryService.getList(data, user);
  }

  @Post('/detail')
  getDetail(@Body() data: { id: number }) {
    return this.diaryService.getDetail(data);
  }
}
