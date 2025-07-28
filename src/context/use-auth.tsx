import type { LoggedUser, User } from "@/types";
import { createContext, useContext } from "react";

interface AuthContextState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  authenticate: (data: LoggedUser) => void;
  logout: () => void;
}

const initialState: AuthContextState = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
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
