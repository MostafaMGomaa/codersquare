import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  limit?: number;
}
