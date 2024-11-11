import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '@/api/comment/dto/create-comment.dto';
import { User } from '@/api/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntities } from '@/api/comment/entities/comment.entities';
import { Repository } from 'typeorm';
import { Diary } from '@/api/diary/entities/diary.entities';
import { Result } from '@/common/dto/result.dto';

@Injectable()
export class CommentService {
  @InjectRepository(CommentEntities)
  private commentRepository: Repository<CommentEntities>;
  @InjectRepository(Diary)
  private diaryRepository: Repository<Diary>;

  async create(data: CreateCommentDto, user: User) {
    const diary = await this.diaryRepository.findOne({
      where: { id: data.diary_id },
    });
    const comment = new CommentEntities();
    Object.assign(comment, { content: data.content, user, diary });
    await this.commentRepository.save(comment);
    return new Result().ok();
  }

  async getList(data: { diary_id: number }) {
    console.log(data.diary_id, 'id');
    const result = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.diaryId=:diaryId', { diaryId: data.diary_id })
      .leftJoinAndSelect('comment.user', 'user')
      .orderBy('comment.createTime', 'DESC')
      .getMany();
    return new Result().ok({ data: result });
  }
}
