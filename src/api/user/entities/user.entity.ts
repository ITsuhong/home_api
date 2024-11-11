import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Diary } from '@/api/diary/entities/diary.entities';
import { CommentEntities } from '@/api/comment/entities/comment.entities';

@Entity({
  name: 'admin_user',
})
export class User extends BaseEntity {
  @Column({
    comment: '名字',
    nullable: true,
  })
  name: string;
  @Column({
    comment: '头像',
    nullable: true,
  })
  header_url: string;
  @Column({
    comment: '用户唯一标识',
  })
  openid: string;
  @OneToMany(() => Diary, (diary) => diary.user)
  diarys: Diary[];
  @OneToMany(() => CommentEntities, (comment) => comment.user)
  comments: CommentEntities[];
}
