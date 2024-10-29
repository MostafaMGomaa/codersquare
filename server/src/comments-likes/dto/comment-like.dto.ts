import { IsNotEmpty, IsUUID } from 'class-validator';

export class CommentLikeDto {
  @IsNotEmpty()
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
