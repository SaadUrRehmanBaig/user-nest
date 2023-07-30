import { Controller,Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() login: loginDto) {
    return this.authService.signIn(login);
  }

  @Post('login-admin')
  loginAdmin(@Body() login: loginDto) {
    return this.authService.signInAdmin(login);
  }
}
