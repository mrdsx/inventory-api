export interface BaseAPIErrorResponse {
  detail: string;
}

export interface BaseAPIResponse {
  message: string;
}

export interface PaginatedResponse<TResponse> {
  items: TResponse;
  total: number;
  page: number;
  size: number;
  pages: number;
}
