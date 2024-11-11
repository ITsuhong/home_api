import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  album_id: number;
  @IsNotEmpty()
  paths: string;
}
