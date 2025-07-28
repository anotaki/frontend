import type { PaginationParams } from "@/components/data-table/generic-data-table";
import type { PaginatedDataResponse, User } from "@/types";
import { apiClient } from "../config";
import type { RegisterFormData } from "@/pages/register-form";

export async function GetPaginatedUsers(
  paginationParams: PaginationParams
): Promise<PaginatedDataResponse<User>> {
  const response = await apiClient.post<PaginatedDataResponse<User>>(
    "/api/v1/user/paginated",
    paginationParams
  );
  return response.data;
}

export async function CreateUser(form: RegisterFormData): Promise<User> {
  const requestForm = {
    name: form.name,
    cpf: form.cpf,
    email: form.email,
    password: form.password,
  };

  const response = await apiClient.post<User>("/api/v1/user", requestForm);
  return response.data;
}

export async function UpdateUser(data: {
  id: number;
  form: RegisterFormData;
}): Promise<User> {
  const requestForm = {
    name: data.form.name,
    cpf: data.form.cpf,
    email: data.form.email,
    password: data.form.password,
  };

  const response = await apiClient.put<User>(
    `/api/v1/user/${data.id}`,
    requestForm
  );
  return response.data;
}

export async function DeleteUser(id: number): Promise<void> {
  await apiClient.delete(`/api/v1/user/${id}`);
}

export async function GetUserById(id: number): Promise<User> {
  const response = await apiClient.get<User>(`/api/v1/user/${id}`);
  return response.data;
}
