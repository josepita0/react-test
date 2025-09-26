export interface ApiListResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
