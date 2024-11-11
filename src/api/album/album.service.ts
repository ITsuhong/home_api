import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '@/api/album/entities/album.entities';
import { Repository } from 'typeorm';
import { Photo } from '@/api/album/entities/photo.entities';
import { Result } from '@/common/dto/result.dto';
import { CreatePhotoDto } from '@/api/album/dto/create-photo.dto';

@Injectable()
export class AlbumService {
  @InjectRepository(Album)
  private albumRepository: Repository<Album>;
  @InjectRepository(Photo)
  private photoRepository: Repository<Photo>;

  async create(data: { name: string }) {
    const album = new Album();
    album.name = data.name;
    await this.albumRepository.save(album);
    return new Result().ok();
  }

  async findAll() {
    const res = await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.photos', 'photo')
      .getManyAndCount();
    const [list] = res;
    return new Result().ok({ data: list });
  }

  async uploadPhoto(data: CreatePhotoDto) {
    const album = await this.albumRepository.findOne({
      where: { id: data.album_id },
    });
    const photosArr = data.paths.split(',');
    photosArr.forEach((item) => {
      const photo = new Photo();
      photo.url = item;
      photo.album = album;
      this.photoRepository.save(photo);
    });
    return new Result().ok();
  }

  async findPhotos(data: { album_id: number }) {
    const res = await this.photoRepository
      .createQueryBuilder('photo')
      .where('photo.albumId=:id', { id: data.album_id })
      .getManyAndCount();
    const [list] = res;
    // const res = await this.photoRepository.find({ where: { album: album } });
    return new Result().ok({ data: list });
  }
}
