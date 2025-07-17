import type { PaginatedDataResponse } from "@/types";

export function usePagination<T>(
  paginatedDataResponse?: PaginatedDataResponse<T>
) {
  const currentPage = paginatedDataResponse?.page || 1;
  const totalPages = paginatedDataResponse?.totalPages || 1;
  const totalItems = paginatedDataResponse?.totalItems || 0;
  const pageSize = totalItems / totalPages;

  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    startRange,
    endRange,
  };
}
