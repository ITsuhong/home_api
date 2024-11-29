import { BaseEntity } from '@/common/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Movie } from '@/api/movies/entities/movie.entities';

@Entity({
  name: 'movie_collection',
})
export class MovieCollection extends BaseEntity {
  @Column({
    comment: '爬取的集数id',
    unique: true,
  })
  cId: string;
  @Column({
    comment: '标签',
  })
  label: string;
  @Column({
    comment: 'file_url',
  })
  fileUrl: string;
  @Column({
    comment: '排序',
  })
  sort: number;
  @Column({
    comment: '名称',
  })
  text: string;
  @ManyToOne(() => Movie, (movie) => movie.collection)
  movie: Movie;
}
