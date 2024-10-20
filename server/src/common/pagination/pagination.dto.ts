import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CursorField } from 'src/types';

export class PaginationDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  @IsEnum(CursorField)
  cursorField: string;

  @IsOptional()
  orderType: string;
}
