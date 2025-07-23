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

export async function CreateProduct(form: ProductFormData): Promise<Product> {
  const formData = new FormData();

  if (form.image) formData.append("image", form.image);

  formData.append("categoryId", form.category);
  formData.append("description", form.description);
  formData.append("name", form.name);
  formData.append("price", form.price);

  if (form.extras && form.extras.length > 0) {
    formData.append("extras", JSON.stringify(form.extras));
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
  form: ProductFormData;
}): Promise<Product> {
  const formData = new FormData();

  if (data.form.image) {
    formData.append("image", data.form.image);
  }

  formData.append("name", data.form.name);
  formData.append("description", data.form.description);
  formData.append("price", data.form.price.toString());
  formData.append("categoryId", data.form.category.toString());

  if (data.form.extras && data.form.extras.length > 0) {
    formData.append("extras", JSON.stringify(data.form.extras));
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
