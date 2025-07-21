import { API_URL } from "@/App";
import type { ApiResponse, Category } from "@/types";

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
