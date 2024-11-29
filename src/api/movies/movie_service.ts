import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '@/api/movies/entities/movie.entities';
import { Repository } from 'typeorm';
import { MovieCollection } from '@/api/movies/entities/movie_collection.entities';
import { Result } from '@/common/dto/result.dto';

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private movieRepository: Repository<Movie>;
  @InjectRepository(MovieCollection)
  private movieCollectRepository: Repository<MovieCollection>;

  async getMovieList() {
    const res = await this.movieRepository.find();
    console.log(res);
    return new Result().ok({ data: res });
  }

  async getMovieDetail(data: { id: number }) {
    const res = await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id=:id', { id: data.id })
      .leftJoinAndSelect('movie.collection', 'collection')
      .where('collection.movieId=:id', { id: data.id })
      .getMany();
    const [list, total] = res;
    return new Result().ok({ data: list });
  }
}
