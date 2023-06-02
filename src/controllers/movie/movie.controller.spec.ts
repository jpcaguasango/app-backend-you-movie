import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from '../../config/httpService.config';
import { BadRequestException } from '@nestjs/common';
import configuration from '../../config/configuration';

describe('MovieController', () => {
  let controller: MovieController;

  const mocks = {
    success: {
      withResult: {
        name: 'Test with results and status OK',
        query: {
          title: 'John Wick',
          year: null,
          score: null,
          page: 1
        },
        results: 11,
        statusCode: 200
      },
      withoutResult: {
        name: 'Test without results and status OK',
        query: {
          title: 'Search tests without results',
          year: null,
          score: null,
          page: 1
        },
        results: 0,
        statusCode: 200
      }
    },
    failed: {
      withScoreError: {
        name: 'Test with score error',
        query: {
          title: 'Search tests with score error',
          year: null,
          score: -100,
          page: 1
        },
        results: 0,
        statusCode: 400
      },
      withPageError: {
        name: 'Test with page error',
        query: {
          title: 'Search tests with page error',
          year: null,
          score: null,
          page: -1
        },
        results: 0,
        statusCode: 400
      }
    }
  };

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
      controllers: [MovieController],
      providers: [MovieService]
    })
      .overrideProvider('Movie')
      .useValue(jest.fn())
      .compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findQuery', () => {
    it(mocks.success.withResult.name, async () => {
      const { query, results } = mocks.success.withResult;
      const data = await controller.findQuery(query);
      expect(data.results).toHaveLength(results);
    });

    it(mocks.success.withoutResult.name, async () => {
      const { query, results } = mocks.success.withoutResult;
      const data = await controller.findQuery(query);
      expect(data.results).toHaveLength(results);
    });
    it(mocks.failed.withScoreError.name, async () => {
      try {
        const { query } = mocks.failed.withScoreError;
        await controller.findQuery(query);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it(mocks.failed.withPageError.name, async () => {
      try {
        const { query } = mocks.failed.withPageError;
        await controller.findQuery(query);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
