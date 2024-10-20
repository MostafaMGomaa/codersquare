import { CursorField, PaginateResult } from 'src/types';
import { PaginationDto } from './pagination.dto';
import { CreatedAtStrategy } from './stragies';

export function paginate(dto: PaginationDto): PaginateResult {
  const strategies = {
    createdAt: new CreatedAtStrategy(),
  };
  const cursorField = (dto.cursorField as CursorField) || CursorField.createdAt;
  const strategy = strategies[cursorField];
  const limit = dto.limit || 10;
  const cursor = dto.cursor || null;

  return { strategy, limit, cursor };
}
