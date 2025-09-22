import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class PersonUpdateRequest {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsOptional()
  first_name: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class PersonResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  phone: string;
}
