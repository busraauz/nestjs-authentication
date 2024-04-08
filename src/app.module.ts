import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, UserModule, PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env']
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
