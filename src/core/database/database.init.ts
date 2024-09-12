import { DataSource } from 'typeorm';
import {
  UserEntity,
  UserRoles,
} from '../../modules/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

export const databaseInit = async (
  source: DataSource,
  configService: ConfigService,
) => {
  const users = await source.getRepository(UserEntity).count();
  if (users === 0) {
    const user = plainToInstance(UserEntity, {
      name: configService.get<string>('root.name'),
      email: configService.get<string>('root.email'),
      password: configService.get<string>('root.password'),
      role: UserRoles.ADMINISTRATOR,
    });
    await source.getRepository(UserEntity).save(user);
  }
  return source;
};
