import type { LoggedUser, User } from "@/types";
import { createContext, useContext } from "react";

interface AuthContextState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  authenticate: (data: LoggedUser) => void;
  logout: () => void;
}

const initialState: AuthContextState = {
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
  authenticate: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a ThemeProvider");

  return context;
};
