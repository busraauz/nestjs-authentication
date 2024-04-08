import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  async findUser (email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }
  async createUser (user: SignInDto): Promise<User> {
    const matchedUser = await this.prisma.user.findUnique({
      where: {email: user.email}
    });
    if (matchedUser) {
      throw new HttpException('Email is already exists', HttpStatus.CONFLICT);
    }
    return this.prisma.user.create({
      data: user
    })
  }
}
