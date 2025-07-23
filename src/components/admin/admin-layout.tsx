import { useEffect, useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // Detecta se é tela md (768px) ou maior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setIsSideBarOpen(mediaQuery.matches);
    };

    // Inicializa
    handleResize();

    // Atualiza ao redimensionar
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {isSideBarOpen && (
        <AdminSidebar onClose={() => setIsSideBarOpen(false)} />
      )}

      <div className="ml-0 md:ml-60">
        <AdminHeader
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />

        <Outlet />
      </div>
    </div>
  );
}
