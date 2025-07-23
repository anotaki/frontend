import { API_URL } from "@/App";
import type { CategoryFormData } from "@/components/categories/category-modal";
import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { ApiResponse, Category, PaginatedDataResponse } from "@/types";

export async function GetCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/v1/category`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar categorias: ${response.status}`);
  }

  const result: ApiResponse<Category[]> = await response.json();

  return result.data!;
}

export async function GetPaginatedCategories(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<Category>> {
  const response = await fetch(`${API_URL}/api/v1/category/paginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar categorias: ${response.status}`);
  }

  const result: ApiResponse<PaginatedDataResponse<Category>> =
    await response.json();

  return result.data!;
}

export async function CreateCategory(
  form: CategoryFormData
): Promise<Category> {
  const response = await fetch(`${API_URL}/api/v1/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar category: ${response.status}`);
  }

  const result: ApiResponse<Category> = await response.json();

  return result.data!;
}

export async function UpdateCategory(data: {
  id: number;
  form: CategoryFormData;
}): Promise<Category> {
  const response = await fetch(`${API_URL}/api/v1/category/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data.form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar categoria: ${response.status}`);
  }

  const result: ApiResponse<Category> = await response.json();

  return result.data!;
}

export async function DeleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/category/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar categoria: ${response.status}`);
  }
}
