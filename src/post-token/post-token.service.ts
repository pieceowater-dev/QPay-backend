import { Injectable } from '@nestjs/common';
import { CreatePostTokenDto } from './dto/create-post-token.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '../auth/interfaces/auth.response';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PostTokenService {
  constructor(
    private jwt: JwtService,
    private postService: PostsService,
  ) {}

  async regenerate(
    createPostTokenDto: CreatePostTokenDto,
  ): Promise<AuthResponse> {
    await this.postService.findOneOrFail(createPostTokenDto.postId);
    return {
      token: await this.jwt.signAsync({ postId: createPostTokenDto.postId }),
    };
  }
}
