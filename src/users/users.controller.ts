import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { PaginatedList } from '../utils/paginated.list';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from '../auth/enums/auth.types';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('Users')
@ApiBearerAuth(AuthTypes.JWT)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async createUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.save(user);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.save({ ...user, id });
  }

  @Get('')
  async paginatedUserList(): Promise<PaginatedList<UserEntity>> {
    return await this.usersService.findPaginatedMany();
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }
}
