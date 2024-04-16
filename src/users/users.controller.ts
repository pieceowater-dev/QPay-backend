import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { PaginatedList } from '../utils/paginated.list';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from '../auth/enums/auth.types';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthGuard } from '../auth.guard';
import { DefaultFilter } from '../utils/default.filter';
import { DefaultFilterPipe } from '../utils/default.filter.pipe';

@ApiTags('Users')
@ApiBearerAuth(AuthTypes.JWT)
@UseGuards(AuthGuard)
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
  async paginatedUserList(
    @Query(DefaultFilterPipe) filter: DefaultFilter,
  ): Promise<PaginatedList<UserEntity>> {
    return await this.usersService.findPaginatedMany(filter);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserEntity | undefined> {
    return await this.usersService.findOneById(id);
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }
}
