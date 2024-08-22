import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString({
    message: `Order status invalid, should be PENDING, CANCELLED or DELIVERED`,
  })
  status?: string;
}
