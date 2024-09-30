import { IsNotEmpty, IsUUID } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
