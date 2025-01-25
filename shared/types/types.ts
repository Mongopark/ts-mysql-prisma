export interface PaginatedResult {
  nextPage: { page: number; limit: number };
  prevPage: { page: number; limit: number };
  total: number;
  totalInDb: number;
  result: any[];
}
