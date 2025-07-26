import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "./pages/login-form";
import RegisterForm from "./pages/register-form";
import MenuPage from "./pages/menu";
import AdminLayout from "./components/admin/admin-layout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminProducts from "./pages/admin/admin-products";
import { Toaster } from "./components/ui/sonner";
import AdminExtras from "./pages/admin/admin-extras";
import AdminCategories from "./pages/admin/admin-categories";
import AdminPaymentMethods from "./pages/admin/admin-payment-methods";
import AdminUsers from "./pages/admin/admin-users";
import AdminOrders from "./pages/admin/admin-orders";
import AdminOrderDetails from "./pages/admin/admin-order-details";
import { useEffect } from "react";
import useOrderHub from "./hooks/signalR-hubs/use-order-hub";
import { useAuth } from "./context/use-auth";
import { ProtectedRoute } from "./components/protected-route";
import { UserRole } from "./types";

export const API_URL = "http://localhost:5276";

const envKey = import.meta.env.DEV ? Date.now() : undefined;

export default function App() {
  const { connect, disconnect } = useOrderHub();
  const { isLoading } = useAuth();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  // Mostrar loading enquanto verifica autenticação inicial
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div id="app" className="max-w-[2560px] mx-auto">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/menu" element={<MenuPage />} />

        {/* Rotas privadas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={UserRole.Admin}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="extras" element={<AdminExtras key={envKey} />} />
          <Route path="categories" element={<AdminCategories key={envKey} />} />
          <Route
            path="payment-methods"
            element={<AdminPaymentMethods key={envKey} />}
          />
          <Route path="users" element={<AdminUsers key={envKey} />} />
          <Route path="orders" element={<AdminOrders key={envKey} />} />
          <Route
            path="orders/:orderId"
            element={<AdminOrderDetails key={envKey} />}
          />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}
