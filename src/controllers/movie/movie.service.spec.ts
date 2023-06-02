import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from '../../config/httpService.config';
import configuration from '../../config/configuration';
import { MovieController } from './movie.controller';
import { ResponseTheMovie, ResultTheMovie } from './dto/response-movie-dto';
import { MovieSerializer } from './serializers/movie.serializer';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration]
        }),
        HttpModule.registerAsync({
          useClass: HttpConfigService
        })
      ],
      providers: [MovieService]
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
