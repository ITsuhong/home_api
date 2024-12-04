import { BaseEntity } from '@/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'cuisine_detail',
})
export class CuisineDetail extends BaseEntity {
  @Column({
    comment: '详情id',
    unique: true,
  })
  cId: string;
  @Column({
    comment: '标题',
  })
  title: string;
  @Column({
    comment: '图片',
  })
  cover_img: string;
  @Column({
    comment: '做法',
    type: 'text',
  })
  steps: string;
}
