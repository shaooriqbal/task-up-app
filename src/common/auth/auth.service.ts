import { Injectable } from '@nestjs/common';
import { SignUpRequest } from '../../data/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from '../../modules/person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private personService: PersonService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.personService.fetchByUsernameAndPassword(
      username,
      pass,
    );

    if (user) {
      return user;
    }

    return null;
  }

  async signIn(user: any) {
    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        sub: user._id,
      }),
    };
  }

  async signUp(data: SignUpRequest) {
    const person = (await this.personService.create(data)) as any;

    return person;
  }

  async profile(user: any) {
    return await this.personService.fetch(user.userId);
  }
}
