import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authorization/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.module';
import { HealthController } from './health.controller';
import { config } from './core/config';
import { DatabaseModule } from './core/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PostsWsModule } from './modules/posts-ws/posts-ws.module';
import { KaspiapiModule } from './modules/kaspiapi/kaspiapi.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PostsUsersAccessModule } from './modules/posts-users-access/posts-users-access.module';
import { PostTokenModule } from './modules/post-token/post-token.module';
import typeorm from './core/config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, typeorm],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    PostsModule,
    PostsWsModule,
    KaspiapiModule,
    PaymentsModule,
    PostsUsersAccessModule,
    PostTokenModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
