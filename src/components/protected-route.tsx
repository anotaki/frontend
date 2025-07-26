import { Navigate, useNavigate } from "react-router-dom";
import { UserRole } from "@/types";
import { useAuth } from "@/context/use-auth";
import { useRefresh } from "@/hooks/mutations/use-auth.mutations";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  console.log("verificando rota");

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole != UserRole.Admin && user?.role !== requiredRole) {
    return <Navigate to="/menu" replace />;
  }

  return <>{children}</>;
}
