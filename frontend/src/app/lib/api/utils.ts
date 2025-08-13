import { BaseAPIErrorResponse } from "../types";

export function isBaseErrorResponse(data: any): data is BaseAPIErrorResponse {
  return data && typeof data.detail === "string";
}
