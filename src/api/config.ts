// lib/axios-client.ts
import axios, { Axios, AxiosError } from "axios";
import { API_URL } from "@/App";
import { RefreshToken } from "./auth";
import { useLocalStorage } from "@/hooks/use-local-storage";

const { getItem, setItem } = useLocalStorage();

// Cria instância do axios
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Request interceptor - adiciona token
apiClient.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - trata refresh token
apiClient.interceptors.response.use(
  (response) => {
    // Se a resposta tem data.data, retorna apenas data
    if (response.data?.data !== undefined) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const result = await RefreshToken();
        setItem("token", result.token);

        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${result.token}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redireciona para login ou trata erro
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Usando nos services ficaria assim:
// export async function GetPaginatedOrders(
//   paginationParams: PaginationParams
// ): Promise<PaginatedDataResponse<Order>> {
//   const response = await apiClient.post('/api/v1/order/paginated', paginationParams);
//   return response.data;
// }
