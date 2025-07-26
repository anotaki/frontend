import { useState, useEffect, type ReactNode } from "react";
import type { LoggedUser, User } from "@/types";
import { useRefresh } from "@/hooks/mutations/use-auth.mutations";
import { AuthContext } from "./use-auth";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const { refreshMutation } = useRefresh();

  useEffect(() => {
    console.log("Verificando autenticação...");

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        handleRefresh();
      } catch (error) {
        console.error("Erro ao fazer refresh do token:", error);
        logout();
      }
    }
    //  else {
    //     logout();
    //   }

    setIsLoading(false);
  }, []); // Executar apenas na montagem

  async function handleRefresh() {
    await refreshMutation.mutateAsync(undefined, {
      onSuccess: (data) => {
        authenticate(data);
      },
      onError: (error) => {
        console.error("Erro no refresh:", error);
        logout();
      },
    });
  }

  const authenticate = (data: LoggedUser) => {
    setIsAuthenticated(true);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setIsLoading(false);

    console.log("Autenticado com sucesso");
  };

  function logout() {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setIsLoading(false);

    console.log("Logout realizado com sucesso");
  }

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        token,
        setUser,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
