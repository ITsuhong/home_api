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
import { CommentEntities } from '@/api/comment/entities/comment.entities';
import fetch from 'node-fetch';
import { env } from '@/common/config';

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
    // const res = await fetch(
    //   `https://api.weixin.qq.com/cgi-bin/token?appid=${env.WX_CONFIG.AppID}&secret=${env.WX_CONFIG.AppSecret}&grant_type=client_credential`,
    // );
    // const { access_token } = await res.json();
    // const result = await fetch(
    //   'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=ACCESS_TOKEN',
    //   {
    //     method: 'post',
    //     body: {
    //       access_token: access_token,
    //       template_id: 'qK3EqV3mLANtXs-vFpVlfBS31XL86CK8dKf8PEOHoIw',
    //       touser: 'ofqfO5ZNFMjZPP1FEiyDnbmuq3bc',
    //       miniprogram_state: 'trial',
    //       page: '/pages/diaryList/index?id=1',
    //       // data:
    //     },
    //   },
    // );
    return new Result().ok();
  }

  async getList(data: FindDiaryDto, user: User) {
    const { pageNumber = 1, pageSize = 10 } = data;
    const res = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.comments', 'comment')
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
