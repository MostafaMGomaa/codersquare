import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
