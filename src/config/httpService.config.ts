import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      headers: {
        Authorization: `Bearer ${process.env.THE_MOVIE_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
  }
}
