import { Expose } from 'class-transformer';

export class OneMovieSerializer {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  popularity: number;

  @Expose()
  overview: string;

  @Expose()
  poster_path: string;

  @Expose()
  vote_average: number;

  @Expose()
  release_date: Date;

  @Expose()
  genres: object[];

  @Expose()
  production_companies: object[];

  constructor(partial: Partial<OneMovieSerializer>) {
    Object.assign(this, partial);
  }
}
