import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { User } from '@/api/user/entities/user.entity';
import { CommentEntities } from '@/api/comment/entities/comment.entities';

@Entity({
  name: 'diary',
})
export class Diary extends BaseEntity {
  @Column({
    comment: '心情',
  })
  mood: number;
  @Column({
    comment: '天气',
  })
  weather: number;
  @Column({
    comment: '日记内容',
  })
  content: string;
  @Column({
    comment: '图片',
    nullable: true,
  })
  imageList: string;
  @ManyToOne(() => User, (user) => user.diarys)
  user: User;

  @OneToMany(() => CommentEntities, (comment) => comment.diary)
  comments: CommentEntities[];
}
