import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  @HttpCode(HttpStatus.OK)
  @Get('self')
  async getSelf (@Req() request) {
    return request.user
  }
}
