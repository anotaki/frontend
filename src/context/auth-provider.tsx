import { useState, useEffect, type ReactNode } from "react";
import type { LoggedUser, User } from "@/types";
import { AuthContext } from "./use-auth";
import { useRefresh } from "@/hooks/mutations/use-auth.mutations";

let externalLogout: (() => void) | null = null;
let externalSetToken: ((token: string) => void) | null = null;
let externalToken = "";

export function getExternalAuthActions() {
  return {
    logout: externalLogout,
    setToken: externalSetToken,
    token: externalToken,
  };
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { refreshMutation } = useRefresh();

  const isAuthenticated = !!token;

  useEffect(() => {
    externalLogout = logout;
    externalSetToken = setToken;
    externalToken = token || "";
  }, []);

  useEffect(() => {
    async function handleRefresh() {
      await refreshMutation.mutateAsync(undefined, {
        onSuccess: (data) => {
          authenticate(data);
        },
        onError: (error) => {
          console.error("Erro ao fazer refresh do token:", error);
          logout();
        },
      });
    }

    handleRefresh();
  }, []);

  const authenticate = (data: LoggedUser) => {
    setUser(data.user);
    setToken(data.token);
    setIsLoading(false);

    console.log("Autenticado com sucesso");
  };

  function logout() {
    setUser(null);
    setToken(null);
    setIsLoading(false);

    console.log("Logout realizado com sucesso");
  }

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        isLoading,
        setIsLoading,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
