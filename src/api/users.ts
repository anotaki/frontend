import { API_URL } from "@/App";
import type { PaginationParams } from "@/components/data-table/generic-data-table";

// import type { UserFormData } from "@/components/users/user-modal"; //Assumindo que você tem isso
import type {
  ApiResponse,
  PaginatedDataResponse,
  UserRole,
  User,
} from "@/types";

export interface UserFormData {
  name: string;
  cpf: string;
  email: string;
  role: UserRole;
  password: string;
}

export async function GetPaginatedUsers(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<User>> {
  const response = await fetch(`${API_URL}/api/v1/user/paginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(paginationParams),
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar usuários: ${response.status}`);
  }

  const result: ApiResponse<PaginatedDataResponse<User>> =
    await response.json();

  return result.data!;
}

export async function CreateUser(form: UserFormData): Promise<User> {
  const response = await fetch(`${API_URL}/api/v1/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar usuário: ${response.status}`);
  }

  const result: ApiResponse<User> = await response.json();

  return result.data!;
}

export async function UpdateUser(data: {
  id: number;
  form: UserFormData;
}): Promise<User> {
  const response = await fetch(`${API_URL}/api/v1/user/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data.form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar usuário: ${response.status}`);
  }

  const result: ApiResponse<User> = await response.json();

  return result.data!;
}

export async function DeleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar usuário: ${response.status}`);
  }
}

export async function GetUserById(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/api/v1/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar usuário: ${response.status}`);
  }

  const result: ApiResponse<User> = await response.json();

  return result.data!;
}
