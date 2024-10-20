import { PaginationDto } from './pagination.dto';

export function paginate(
  dto: PaginationDto,
  defaultCursorField = 'createdAt',
): PaginationDto {
  return {
    limit: dto.limit || 10,
    cursor: dto.cursor || defaultCursorField,
  };
}
