export type BaseAPIErrorResponse = {
  detail: string;
};

export type PaginatedResponse<TItems> = {
  items: TItems;
  page: number;
  pages: number;
  size: number;
  total: number;
};
