import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './interfaces/auth.response';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { RegistrationUserDto } from './dto/registration.user.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthResponse> {
    const user = await this.usersService.findOneNotDeletedByEmail(email);
    if (user === undefined || !compareSync(pass, user?.password ?? '')) {
      throw new UnauthorizedException();
    }
    return {
      token: await this.jwt.signAsync({ id: user.id, role: user.role }),
    };
  }

  async registration(registrationDto: RegistrationUserDto): Promise<'OK'> {
    return this.usersService.save(registrationDto).then(() => 'OK');
  }

  async profile(id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }
}
