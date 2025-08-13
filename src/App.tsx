import { Routes, Route, Navigate } from "react-router-dom";
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
import { ProtectedRoute } from "./components/global/protected-route";
import { UserRole } from "./types";
import { Loading, NotFoundPage } from "./components/global/fallbacks";
import AdminStoreSettings from "./pages/admin/admin-store-settings";

export default function App() {
  const { connect, disconnect } = useOrderHub();
  const { isLoading, user, isAuthenticated, token } = useAuth();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="max-w-[2560px] mx-auto dark dark:bg-amber-400">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user?.role === UserRole.Admin ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/menu" replace />
              )
            ) : (
              <LoginForm />
            )
          }
        />
        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <MenuPage />
            </ProtectedRoute>
          }
        />

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
          <Route path="extras" element={<AdminExtras />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="payment-methods" element={<AdminPaymentMethods />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<AdminOrderDetails />} />
          <Route path="store-settings" element={<AdminStoreSettings />} />
        </Route>

        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.role === UserRole.Admin ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/menu" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}
