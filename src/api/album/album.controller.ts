import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginGuard } from '@/common/guards/login.guard';
import { AlbumService } from '@/api/album/album.service';
import { CreatePhotoDto } from '@/api/album/dto/create-photo.dto';

@UseGuards(LoginGuard)
@Controller('/album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post('/create')
  create(@Body() data: { name: string }) {
    return this.albumService.create(data);
  }

  @Post('/findAll')
  fondAll() {
    return this.albumService.findAll();
  }

  @Post('/createPhotos')
  createPhotos(@Body() data: CreatePhotoDto) {
    return this.albumService.uploadPhoto(data);
  }

  @Post('/findPhotos')
  findPhotos(@Body() data: { album_id: number }) {
    return this.albumService.findPhotos(data);
  }
}
