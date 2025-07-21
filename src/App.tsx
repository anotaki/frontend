import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/login-form";
import RegisterForm from "./pages/register-form";
import MenuPage from "./pages/menu";
import AdminHome from "./pages/admin/admin-home";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminProducts from "./pages/admin/admin-products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

export const API_URL = "https://localhost:7098";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div id="app" className="max-w-[2560px] mx-auto relative">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />{" "}
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/admin" element={<AdminHome />}>
              <Route index element={<Navigate to="dashboard" replace />} />

              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="products"
                element={
                  <AdminProducts
                    key={import.meta.env.DEV ? Date.now() : undefined}
                  />
                }
              />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
