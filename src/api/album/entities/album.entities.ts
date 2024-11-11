import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Photo } from '@/api/album/entities/photo.entities';

@Entity({
  name: 'album',
})
export class Album extends BaseEntity {
  @Column({
    comment: '名称',
  })
  name: string;
  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
