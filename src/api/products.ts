import { API_URL } from "@/App";
import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { ProductFormData } from "@/components/products/add-product-modal";
import type { ApiResponse, PaginatedDataResponse, Product } from "@/types";

export async function GetPaginatedProducts(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<Product>> {
  const response = await fetch(`${API_URL}/api/v1/product/paginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar produto: ${response.status}`);
  }

  const result: ApiResponse<PaginatedDataResponse<Product>> =
    await response.json();

  return result.data!;
}

export async function CreateProduct(
  productData: ProductFormData
): Promise<Product> {
  const response = await fetch(`${API_URL}/api/v1/product`, {
    method: "POST",
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar produto: ${response.status}`);
  }

  const result: ApiResponse<Product> = await response.json();

  return result.data!;
}
