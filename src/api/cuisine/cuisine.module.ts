import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuisine } from '@/api/cuisine/entities/cuisine.entities';
import { CuisineDetail } from '@/api/cuisine/entities/cuisine_detail.entities';
import { CuisineController } from '@/api/cuisine/cuisine.controller';
import { CuisineService } from '@/api/cuisine/cuisine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cuisine, CuisineDetail])],
  controllers: [CuisineController],
  providers: [CuisineService],
})
export class CuisineModule {}
