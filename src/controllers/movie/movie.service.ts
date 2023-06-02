import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RequestQueryFilter } from './dto/request-movie.dto';
import { ResponseTheMovie, ResultTheMovie } from './dto/response-movie-dto';
import { ConfigService } from '@nestjs/config';
import { MovieSerializer } from './serializers/movie.serializer';
import { plainToClass } from 'class-transformer';
import { OneMovieSerializer } from './serializers/one-movie.serializer';

@Injectable()
export class MovieService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  baseURL = this.configService.get<string>('theMovieDB.baserURLApi');

  async findAll(page: string): Promise<AxiosResponse<ResponseTheMovie>> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/3/discover/movie?page=${page}`)
      );
      data.results = plainToClass(MovieSerializer, data.results, {
        excludeExtraneousValues: true
      });

      return data;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        description:
          'We cannot perform the search at this time, it is possible that one of the criteria is wrong or there is a temporary failure.'
      });
    }
  }

  async findQuery(
    params: RequestQueryFilter
  ): Promise<AxiosResponse<ResponseTheMovie>> {
    try {
      const { title, year, score, page } = params;
      const query = `query=${title}&year=${year}&score=${score}&page=${page}`;
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/3/search/movie?${query}`)
      );
      data.results = plainToClass(MovieSerializer, data.results, {
        excludeExtraneousValues: true
      });

      return data;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        description:
          'We cannot perform the search at this time, it is possible that one of the criteria is wrong or there is a temporary failure.'
      });
    }
  }

  async findOne(id: number): Promise<AxiosResponse<ResultTheMovie>> {
    try {
      const result = await firstValueFrom(
        this.httpService.get(`${this.baseURL}/3/movie/${id}`)
      );

      result.data = plainToClass(OneMovieSerializer, result.data, {
        excludeExtraneousValues: true
      });

      return result.data;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description:
          'We cannot perform the search at this time, it is possible that one of the criteria is wrong or there is a temporary failure.'
      });
    }
  }
}
