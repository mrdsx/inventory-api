import { Path } from "../types";
import { BASE_API_URL } from "./constants";

export async function apiClient<T extends Record<string, any>>(
  path: Path,
  init?: RequestInit,
) {
  const res = await fetch(`${BASE_API_URL}${path}`, init);
  const data: T = await res.json();

  return data;
}
