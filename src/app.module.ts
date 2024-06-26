import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { HealthController } from './health.controller';
import { config } from './config';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PostsWsModule } from './posts-ws/posts-ws.module';
import { KaspiapiModule } from './kaspiapi/kaspiapi.module';
import { PaymentsModule } from './payments/payments.module';
import { PostsUsersAccessModule } from './posts-users-access/posts-users-access.module';
import { PostTokenModule } from './post-token/post-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
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
