import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Album } from '@/api/album/entities/album.entities';

@Entity({
  name: 'photo',
})
export class Photo extends BaseEntity {
  @Column({
    comment: '地址',
  })
  url: string;
  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
