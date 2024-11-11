import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '@/api/album/entities/album.entities';
import { Photo } from '@/api/album/entities/photo.entities';
import { AlbumController } from '@/api/album/album.controller';
import { AlbumService } from '@/api/album/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Photo])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
