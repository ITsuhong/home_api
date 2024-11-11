import { IsNotEmpty } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  mood: number;
  @IsNotEmpty()
  weather: number;
  imageList: string;
}
