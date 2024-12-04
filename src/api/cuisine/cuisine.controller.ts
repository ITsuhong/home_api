import { Body, Controller, Post } from '@nestjs/common';
import { CuisineService } from '@/api/cuisine/cuisine.service';
import { FindListDto } from '@/api/cuisine/dto/find-list';

@Controller('/cuisine')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @Post('/list')
  async getList(@Body() data: FindListDto) {
    return this.cuisineService.getList(data);
  }

  @Post('/detail')
  async getDetail(@Body() data: { id: string }) {
    return this.cuisineService.getDetail(data);
  }

  @Post('/is_eat')
  async isEat(@Body() data: { id: string; is_eat: number }) {
    return this.cuisineService.setEat(data);
  }

  @Post('/eat/list')
  async getEatList() {
    return this.cuisineService.eatList();
  }
}
