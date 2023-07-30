import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtServices: JwtService,
    private userService: UserService,
  ) {}
  async signIn(login: loginDto) {
    const response = await this.userService.findOneUser(login.username);
    console.log(response)
    if (
      login.password && response &&
      bcrypt.compareSync(login.password, response.password)
    ) {
      const payload = { id: response.id, username: response.username };
      return {
        data: {
          access_token: await this.jwtServices.signAsync(payload),
        },
        message: "login successfull"
      };
    }
    throw new UnauthorizedException();
  }

  async signInAdmin(login: loginDto) {
    const response = await this.userService.findOneAdmin(login.username);
    if (
      login.password && response &&
      bcrypt.compareSync(login.password, response.password)
    ) {
      const payload = { id: response.id, username: response.username };
      return {
        data: {
          access_token: await this.jwtServices.signAsync(payload),
        },
        message: "admin login successfull"
      };
    }
    throw new UnauthorizedException();
  }
}
