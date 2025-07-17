import { API_URL } from "@/App";
import type { ApiResponse, PaginatedDataResponse, Product } from "@/types";

export async function GetPaginatedProducts(
  page = 1,
  pageSize = 5
): Promise<PaginatedDataResponse<Product> | undefined> {
  const paginationParams = {
    page,
    pageSize,
  };

  const data = await fetch(`${API_URL}/api/v1/product/paginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  })
    .then((res) => res.json())
    .then((res: ApiResponse<PaginatedDataResponse<Product>>) => res.data)
    .catch((error) => {
      console.log(error);
      return undefined;
    });

  return data;
}
