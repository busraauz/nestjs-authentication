import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { User } from '@prisma/client';

const SALT_OR_ROUND = +process.env.SALT_OR_ROUND;
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(body: LoginDto) {
    const { email, password } = body;
    const matchedUser: User = await this.userService.findUser(email);
    const passwordMatch = await bcrypt.compare(password, matchedUser.password);
    if (!matchedUser || !passwordMatch) {
      throw new UnauthorizedException()
    }
    const {id, password: pass, ...rest} =  matchedUser 
    return rest;
  }
  async signIn(body: SignInDto) {
    const hashedPassword = await bcrypt.hash(body.password, SALT_OR_ROUND);
    body.password = hashedPassword;
    return this.userService.createUser(body);
  }
}
