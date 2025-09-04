import { BaseAPIErrorResponse } from "../types";

export function isBaseErrorResponse(
  data: unknown,
): data is BaseAPIErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "detail" in data &&
    typeof data.detail === "string"
  );
}
