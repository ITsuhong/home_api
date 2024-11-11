import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from '@/api/comment/comment.service';
import { CreateCommentDto } from '@/api/comment/dto/create-comment.dto';
import { UserInfo } from '@/common/decorator/user.decorator';
import { User } from '@/api/user/entities/user.entity';
import { LoginGuard } from '@/common/guards/login.guard';

@UseGuards(LoginGuard)
@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  create(@Body() data: CreateCommentDto, @UserInfo() user: User) {
    return this.commentService.create(data, user);
  }

  @Post('/list')
  getList(@Body() data: { diary_id: number }) {
    return this.commentService.getList(data);
  }
}
