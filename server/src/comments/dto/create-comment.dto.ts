import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentBody {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
