import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/config/httpService.config';
import configuration from 'src/config/configuration';

@Module({
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
export class MovieModule {}
