import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';

@Entity({
  name: 'cuisine',
})
export class Cuisine extends BaseEntity {
  @Column({
    comment: 'c_id',
    unique: true,
  })
  cId: string;
  @Column({
    comment: '类别',
  })
  type: string;
  @Column({
    comment: '名字',
  })
  title: string;
  @Column({
    comment: '封面',
  })
  cover: string;
  @Column({
    comment: '原料',
  })
  subtitle: string;
  @Column({
    comment: '想吃',
    default: 1,
  })
  is_eat: number;
}
