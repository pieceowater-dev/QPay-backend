import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto extends UserEntity {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  @ApiProperty()
  password: string;
}
