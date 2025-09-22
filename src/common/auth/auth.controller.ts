import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AccessTokenResponse,
  SignInRequest,
  SignUpRequest,
} from '../../data/dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { PersonResponse } from '../../data/dtos/person.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOkResponse({
    type: AccessTokenResponse,
    description: 'SignIn successful',
  })
  @ApiUnauthorizedResponse({ description: 'email or Password is incorrect' })
  @ApiBadRequestResponse({ description: 'Issue in request data' })
  @ApiOperation({ description: 'Admin SignIn' })
  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  signIn(
    @Request() request: any,
    @Body() data: SignInRequest,
  ): Promise<AccessTokenResponse> {
    return this.service.signIn(request.user);
  }

  @ApiOkResponse({ description: 'SignUp successful' })
  @ApiBadRequestResponse({ description: 'Issue in request data' })
  @ApiUnauthorizedResponse({ description: 'Email already exists' })
  @ApiOperation({ description: 'Create New Admin' })
  @Post('sign-up')
  signUp(@Body() data: SignUpRequest): Promise<any> {
    return this.service.signUp(data);
  }

  @ApiOkResponse({
    type: PersonResponse,
    description: 'Get person from access token',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiOperation({ description: 'Get Current or LoggedIn Admin Profile' })
  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  profile(@Request() request): Promise<any> {
    return this.service.profile(request.user);
  }

  @ApiOkResponse({ description: 'SignOut successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiOperation({ description: 'SignOut Admin' })
  @Post('sign-out')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  signOut(@Request() request: any): Promise<any> {
    return request.logout();
  }
}
