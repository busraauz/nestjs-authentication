import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
