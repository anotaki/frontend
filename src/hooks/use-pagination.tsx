import type { PaginatedDataResponse } from "@/types";

export function usePagination<T>(
  paginatedDataResponse?: PaginatedDataResponse<T>
) {
  const {
    page = 1,
    totalPages = 1,
    totalItems = 0,
    pageSize = 5,
  } = paginatedDataResponse ?? {};

  const currentPage = page;
  const startRange = (currentPage - 1) * pageSize + 1;
  const isLastPage = currentPage === totalPages;
  const itemsOnCurrentPage = isLastPage
    ? totalItems - (currentPage - 1) * pageSize
    : pageSize;
  const endRange = startRange + itemsOnCurrentPage - 1;

  return {
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    startRange: totalItems === 0 ? 0 : startRange,
    endRange: totalItems === 0 ? 0 : endRange,
  };
}
