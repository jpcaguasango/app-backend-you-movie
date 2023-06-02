import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestQueryFilter } from './dto/request-movie.dto';
import { ResponseTheMovie } from './dto/response-movie-dto';

@ApiTags('Movies')
@Controller('api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('page/:page')
  findAll(@Param('page') page: string): ResponseTheMovie | any {
    return this.movieService.findAll(page);
  }

  @Get('query')
  findQuery(@Query() query: RequestQueryFilter): ResponseTheMovie | any {
    return this.movieService.findQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(id);
  }
}
