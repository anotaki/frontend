import { API_URL } from "@/App";
import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { ProductFormData } from "@/components/products/product-modal";
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
  const formData = new FormData();

  if (productData.image) formData.append("image", productData.image);

  formData.append("categoryId", productData.category);
  formData.append("description", productData.description);
  formData.append("name", productData.name);
  formData.append("price", productData.price);

  if (productData.extras && productData.extras.length > 0) {
    formData.append("extras", JSON.stringify(productData.extras));
  }

  const response = await fetch(`${API_URL}/api/v1/product`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar produto: ${response.status}`);
  }

  const result: ApiResponse<Product> = await response.json();

  return result.data!;
}

export async function UpdateProduct(data: {
  id: number;
  productData: ProductFormData;
}): Promise<Product> {
  const formData = new FormData();

  if (data.productData.image) {
    formData.append("image", data.productData.image);
  }

  formData.append("name", data.productData.name);
  formData.append("description", data.productData.description);
  formData.append("price", data.productData.price.toString());
  formData.append("categoryId", data.productData.category.toString());

  if (data.productData.extras && data.productData.extras.length > 0) {
    formData.append("extras", JSON.stringify(data.productData.extras));
  }

  const response = await fetch(`${API_URL}/api/v1/product/${data.id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar produto: ${response.status}`);
  }

  const result: ApiResponse<Product> = await response.json();

  return result.data!;
}

export async function DeleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar produto: ${response.status}`);
  }
}

export async function GetProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/api/v1/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar produto: ${response.status}`);
  }

  const result: ApiResponse<Product> = await response.json();

  return result.data!;
}
