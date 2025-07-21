import { API_URL } from "@/App";
import type { ApiResponse, Extra } from "@/types";

export async function GetExtras(): Promise<Extra[]> {
  const response = await fetch(`${API_URL}/api/v1/extra`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar extras: ${response.status}`);
  }

  const result: ApiResponse<Extra[]> = await response.json();

  return result.data!;
}
