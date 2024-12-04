import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Cuisine } from '@/api/cuisine/entities/cuisine.entities';
import { CuisineDetail } from '@/api/cuisine/entities/cuisine_detail.entities';
import { Result } from '@/common/dto/result.dto';
import { FindListDto } from '@/api/cuisine/dto/find-list';
import { getPagination } from '@/common/utils/index.util';

@Injectable()
export class CuisineService {
  @InjectRepository(Cuisine)
  private cuisineRepository: Repository<Cuisine>;
  @InjectRepository(CuisineDetail)
  private cuisineDetailRepository: Repository<CuisineDetail>;

  async getList(data: FindListDto) {
    const { pageNumber = 1, pageSize = 10 } = data;
    const res = await this.cuisineRepository
      .createQueryBuilder('cuisine')
      .where('cuisine.type=:type', { type: data.type })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = res;
    const result = getPagination({ list, total, pageNumber, pageSize });
    return new Result().ok({ data: result });
  }

  async getDetail(data: { id: string }) {
    const res = await this.cuisineDetailRepository.find({
      where: { cId: data.id },
    });
    return new Result().ok({ data: res[0] });
  }

  async setEat(data: { id: string; is_eat: number }) {
    await this.cuisineRepository.update(
      { cId: data.id },
      { is_eat: data.is_eat },
    );
    return new Result().ok();
  }

  async eatList() {
    const res = await this.cuisineRepository.find({ where: { is_eat: 2 } });
    return new Result().ok({ data: res });
  }
}
