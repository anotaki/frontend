import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/login-form";
import RegisterForm from "./pages/register-form";
import MenuPage from "./pages/menu";
import AdminLayout from "./components/admin/admin-layout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminProducts from "./pages/admin/admin-products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import AdminExtras from "./pages/admin/admin-extras";
import AdminCategories from "./pages/admin/admin-categories";
import AdminPaymentMethods from "./pages/admin/admin-payment-methods";
import AdminUsers from "./pages/admin/admin-users";

export const API_URL = "https://localhost:7098";

const envKey = import.meta.env.DEV ? Date.now() : undefined;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

export default function App() {
  return (
    <div id="app" className="max-w-[2560px] mx-auto relative">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />{" "}
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts key={envKey} />} />
              <Route path="extras" element={<AdminExtras key={envKey} />} />
              <Route
                path="categories"
                element={<AdminCategories key={envKey} />}
              />
              <Route
                path="payment-methods"
                element={<AdminPaymentMethods key={envKey} />}
              />
              <Route path="users" element={<AdminUsers key={envKey} />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
