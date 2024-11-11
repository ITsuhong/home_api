import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Diary } from '@/api/diary/entities/diary.entities';
import { User } from '@/api/user/entities/user.entity';

@Entity({
  name: 'comment',
})
export class CommentEntities extends BaseEntity {
  @Column({
    comment: '评论内容',
  })
  content: string;
  @ManyToOne(() => Diary, (diary) => diary.comments)
  diary: Diary;
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
