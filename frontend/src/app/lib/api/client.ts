import { Path } from "../types";
import { BASE_API_URL } from "./constants";
import { isBaseErrorResponse } from "./utils";

export async function apiClient<TResponse extends Record<string, any>>(
  path: Path,
  options?: RequestInit,
  errorMsg?: string,
): Promise<TResponse> {
  const res = await fetch(`${BASE_API_URL}${path}`, options);
  const data = await res.json();

  if (res.ok) return data;
  if (isBaseErrorResponse(data)) throw new Error(data.detail);

  throw new Error(errorMsg || "An error occurred while fetching data");
}
