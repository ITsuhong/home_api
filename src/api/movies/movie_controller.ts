import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginGuard } from '@/common/guards/login.guard';

import { MovieService } from '@/api/movies/movie_service';

@UseGuards(LoginGuard)
@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/list')
  async getList() {
    return this.movieService.getMovieList();
  }

  @Post('/detail')
  async getDetail(@Body() data: { id: number }) {
    return this.movieService.getMovieDetail(data);
  }
}
