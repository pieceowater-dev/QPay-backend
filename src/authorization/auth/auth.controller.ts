import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth.request';
import { AuthResponse } from './interfaces/auth.response';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { AuthGuard } from '../../auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from './enums/auth.types';
import { RegistrationUserDto } from './dto/registration.user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthRequest): Promise<AuthResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  registration(@Body() registrationDto: RegistrationUserDto): Promise<'OK'> {
    return this.authService.registration(registrationDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth(AuthTypes.JWT)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async profile(@Req() req: any): Promise<UserEntity> {
    return await this.authService.profile(req?.user?.id);
  }
}
