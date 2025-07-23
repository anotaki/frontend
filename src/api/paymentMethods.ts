import { API_URL } from "@/App";
import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { PaymentMethodFormData } from "@/components/payment-methods/payment-method-modal";
import type {
  ApiResponse,
  Category,
  PaginatedDataResponse,
  PaymentMethod,
} from "@/types";

export async function GetPaymentMethods(): Promise<PaymentMethod[]> {
  const response = await fetch(`${API_URL}/api/v1/payment-method`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar métodos de pagamento: ${response.status}`);
  }

  const result: ApiResponse<Category[]> = await response.json();

  return result.data!;
}

export async function GetPaginatedPaymentMethods(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<PaymentMethod>> {
  const response = await fetch(`${API_URL}/api/v1/payment-method/paginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar métodos de pagamento: ${response.status}`);
  }

  const result: ApiResponse<PaginatedDataResponse<PaymentMethod>> =
    await response.json();

  return result.data!;
}

export async function CreatePaymentMethod(
  form: PaymentMethodFormData
): Promise<PaymentMethod> {
  const response = await fetch(`${API_URL}/api/v1/payment-method`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar método de pagamento: ${response.status}`);
  }

  const result: ApiResponse<PaymentMethod> = await response.json();

  return result.data!;
}

export async function UpdatePaymentMethod(data: {
  id: number;
  form: PaymentMethodFormData;
}): Promise<PaymentMethod> {
  const response = await fetch(`${API_URL}/api/v1/payment-method/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data.form),
  });

  if (!response.ok) {
    throw new Error(
      `Erro ao atualizar método de pagamento: ${response.status}`
    );
  }

  const result: ApiResponse<PaymentMethod> = await response.json();

  return result.data!;
}

export async function DeletePaymentMethod(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/payment-method/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar método de pagamento: ${response.status}`);
  }
}
