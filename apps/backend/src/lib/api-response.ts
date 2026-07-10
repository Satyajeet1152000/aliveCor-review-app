import type { ApiResponse, PaginationMeta } from "@review-dash/shared/types";

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, ...(message ? { message } : {}) };
}

export function messageResponse(message: string): ApiResponse<null> {
  return { success: true, message, data: null };
}

export function paginatedResponse<T>(
  data: T[] | [],
  meta: PaginationMeta,
  message?: string,
): ApiResponse<T[]> {
  return { success: true, data, meta, ...(message && { message }) };
}
