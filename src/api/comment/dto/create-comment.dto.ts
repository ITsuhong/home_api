import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  diary_id: number;
}
