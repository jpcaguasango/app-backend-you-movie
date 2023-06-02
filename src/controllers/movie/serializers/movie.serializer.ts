import { Expose } from 'class-transformer';

export class MovieSerializer {
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

  constructor(partial: Partial<MovieSerializer>) {
    Object.assign(this, partial);
  }
}
