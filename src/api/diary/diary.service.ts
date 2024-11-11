import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateDiaryDto } from '@/api/diary/dto/create-diary.dto';
import { Result } from '@/common/dto/result.dto';

import { User } from '@/api/user/entities/user.entity';
import { Diary } from '@/api/diary/entities/diary.entities';
import { PaginationDTO } from '@/common/dto/pagination.dto';
import { getPagination } from '@/common/utils/index.util';
import { FindDiaryDto } from '@/api/diary/dto/find-diary.dto';

@Injectable()
export class DiaryService {
  @InjectRepository(Diary)
  private diaryRepository: Repository<Diary>;
  @InjectEntityManager()
  private entityManager: EntityManager;

  async create(data: CreateDiaryDto, user: User) {
    const diary = new Diary();
    Object.assign(diary, { ...data, user });
    await this.diaryRepository.save(diary);
    return new Result().ok();
  }

  async getList(data: FindDiaryDto, user: User) {
    const { pageNumber = 1, pageSize = 10 } = data;
    const res = await this.diaryRepository
      .createQueryBuilder('diary')
      .where('diary.userId=:id', { id: data.user_id })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy('diary.updateTime', 'DESC')
      .getManyAndCount();
    const [list, total] = res;
    const result = getPagination({ list, total, pageNumber, pageSize });
    return new Result().ok({ data: result });
  }

  async getDetail(data: { id: number }) {
    const res = await this.diaryRepository.find({ where: { id: data.id } });
    return new Result().ok({ data: res[0] });
  }
}
