import { API_URL } from "@/App";
import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { ExtraFormData } from "@/components/extras/extra-modal";
import type { ApiResponse, Extra, PaginatedDataResponse } from "@/types";

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

export async function GetPaginatedExtras(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<Extra>> {
  const response = await fetch(`${API_URL}/api/v1/extra/paginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar extras: ${response.status}`);
  }

  const result: ApiResponse<PaginatedDataResponse<Extra>> =
    await response.json();

  return result.data!;
}

export async function CreateExtra(form: ExtraFormData): Promise<Extra> {
  const response = await fetch(`${API_URL}/api/v1/extra`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar extra: ${response.status}`);
  }

  const result: ApiResponse<Extra> = await response.json();

  return result.data!;
}

export async function UpdateExtra(data: {
  id: number;
  form: ExtraFormData;
}): Promise<Extra> {
  const extra = {
    ...data.form,
  };

  const response = await fetch(`${API_URL}/api/v1/extra/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(extra),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar extra: ${response.status}`);
  }

  const result: ApiResponse<Extra> = await response.json();

  return result.data!;
}

export async function DeleteExtra(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/extra/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar extra: ${response.status}`);
  }
}
