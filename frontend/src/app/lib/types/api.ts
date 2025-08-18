export type BaseAPIErrorResponse = {
  detail: string;
};

export type PaginatedResponse<TResponse> = {
  items: TResponse;
  total: number;
  page: number;
  size: number;
  pages: number;
};
