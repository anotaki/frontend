import { useState, useEffect, type ReactNode } from "react";
import type { LoggedUser, User } from "@/types";
import { AuthContext } from "./use-auth";

let externalLogout: (() => void) | null = null;
export function getExternalAuthActions() {
  return { logout: externalLogout };
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    externalLogout = logout;
  }, []);

  const authenticate = (data: LoggedUser) => {
    setIsAuthenticated(true);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    setIsLoading(false);

    console.log("Autenticado com sucesso");
  };

  function logout() {
    setUser(null);
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
        setUser,
        isAuthenticated,
        setIsAuthenticated,
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
