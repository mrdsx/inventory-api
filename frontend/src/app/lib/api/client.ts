import { notFound } from "next/navigation";
import { Path } from "../types";
import { BASE_API_URL, HTTP_CODES } from "./constants";
import { isBaseErrorResponse } from "./utils";

type ApiClientOptions = {
  requestInit?: RequestInit;
  errorMessage?: string;
};

export async function apiClient<TResponse extends Record<string, any>>(
  path: Path,
  options?: ApiClientOptions,
): Promise<TResponse> {
  const res = await fetch(`${BASE_API_URL}${path}`, options?.requestInit);
  const data = await res.json();

  if (res.ok) return data;
  if (res.status === HTTP_CODES.NOT_FOUND) notFound();
  if (isBaseErrorResponse(data)) throw new Error(data.detail);

  throw new Error(
    options?.errorMessage || "An error occurred while fetching data",
  );
}
