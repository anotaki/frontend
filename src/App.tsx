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

export const API_URL = "https://localhost:7098";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />{" "}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
