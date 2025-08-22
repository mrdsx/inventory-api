export type BaseAPIErrorResponse = {
  detail: string;
};

export type PaginatedResponse<TResponse> = {
  items: TResponse;
  page: number;
  pages: number;
  size: number;
  total: number;
};
