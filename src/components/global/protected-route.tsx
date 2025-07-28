import { Navigate } from "react-router-dom";
import { UserRole } from "@/types";
import { useAuth } from "@/context/use-auth";
import { Loading } from "./fallbacks";

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
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  // Usuário não autenticado
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  // Usuário autenticado mas não tem permissão
  if (
    user?.role !== UserRole.Admin &&
    user?.role !== requiredRole &&
    requiredRole
  ) {
    return <Navigate to="/menu" replace />;
  }

  return <>{children}</>;
}
