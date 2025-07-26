import { API_URL } from "@/App";
import type { LoginFormData } from "@/pages/login-form";
import type { ApiResponse, LoggedUser } from "@/types";

export async function MakeLogin(form: LoginFormData): Promise<LoggedUser> {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer login: ${response.status}`);
  }

  const result: ApiResponse<LoggedUser> = await response.json();

  return result.data!;
}

export async function RefreshToken(): Promise<LoggedUser> {
  const response = await fetch(`${API_URL}/api/v1/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer login: ${response.status}`);
  }

  const result: ApiResponse<LoggedUser> = await response.json();

  return result.data!;
}
