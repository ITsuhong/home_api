import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '@/api/movies/entities/movie.entities';
import { MovieCollection } from '@/api/movies/entities/movie_collection.entities';
import { MovieController } from '@/api/movies/movie_controller';
import { MovieService } from '@/api/movies/movie_service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieCollection])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
