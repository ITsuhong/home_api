import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { MovieCollection } from '@/api/movies/entities/movie_collection.entities';

@Entity({
  name: 'movie',
})
export class Movie extends BaseEntity {
  @Column({
    comment: '爬取的电影id',
    unique: true,
  })
  mId: string;

  @Column({
    comment: '名称',
  })
  title: string;

  @Column({
    comment: '封面图',
  })
  imgUrl: string;

  @Column({
    comment: '简介',
    length: 1000,
  })
  info: string;
  @OneToMany(() => MovieCollection, (collection) => collection.movie)
  collection: MovieCollection;
}
