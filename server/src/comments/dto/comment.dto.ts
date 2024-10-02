import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
