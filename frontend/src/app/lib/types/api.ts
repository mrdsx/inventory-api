export interface PaginatedResponse<TResponse> {
  items: TResponse;
  total: number;
  page: number;
  size: number;
  pages: number;
}
