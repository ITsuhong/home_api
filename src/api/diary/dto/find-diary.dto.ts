import { PaginationDTO } from '@/common/dto/pagination.dto';

export class FindDiaryDto extends PaginationDTO {
  user_id: number;
}
