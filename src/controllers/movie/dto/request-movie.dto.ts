import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class RequestQueryFilter {
  @ApiProperty()
  title: string;

  @ApiProperty({
    required: false
  })
  @IsDate()
  year: Date;

  @ApiProperty({
    required: false
  })
  score: number;

  @ApiProperty({
    required: true
  })
  @IsInt()
  page: number;
}
