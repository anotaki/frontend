import { API_URL } from "@/App";
import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { ApiResponse, Order, PaginatedDataResponse } from "@/types";
import { RefreshToken } from "./auth";
import { useLocalStorage } from "@/hooks/use-local-storage";

const { getItem, setItem } = useLocalStorage();

export async function GetPaginatedOrders(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<Order>> {
  const response = await fetch(`${API_URL}/api/v1/order/paginated`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getItem("token")}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  });

  if (response.status === 401) {
    const result = await RefreshToken();

    setItem("token", result.token);
  }

  if (!response.ok) {
    throw new Error(`Erro ao listar pedidos: ${response.status}`);
  }

  const result: ApiResponse<PaginatedDataResponse<Order>> =
    await response.json();

  return result.data!;
}

export async function DeleteOrder(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/order/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar pedido: ${response.status}`);
  }
}

export async function ChangeOrderStatus(data: {
  id: number;
  status: number;
}): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/v1/order/change-status/${data.id}?orderStatus=${data.status}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao alterar status do pedido: ${response.status}`);
  }
}

export async function GetOrderDetails(id: number): Promise<Order> {
  const response = await fetch(`${API_URL}/api/v1/order/details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar pedido: ${response.status}`);
  }

  const result: ApiResponse<Order> = await response.json();

  return result.data!;
}
