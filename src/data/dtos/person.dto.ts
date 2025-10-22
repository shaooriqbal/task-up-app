import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class PersonUpdateRequest {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsOptional()
  lastName: string;

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
  userName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phone: string;
}
