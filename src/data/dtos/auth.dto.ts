import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
export class AccessTokenResponse  {
  @ApiProperty()
  @IsString()
  accessToken: string;
}

export class SignInRequest {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsEmail()
  userName: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class SignUpRequest {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsEmail()
  userName: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;
}
