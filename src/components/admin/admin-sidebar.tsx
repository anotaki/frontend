import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  Store,
  FileText,
  Tag,
  LogOut,
  X,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { act, useEffect, useState } from "react";

const menuSections = [
  {
    sectionName: "Principal",
    options: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <BarChart3 />,
      },
      {
        name: "Pedidos",
        path: "/admin/orders",
        icon: <ShoppingBag />,
      },
    ],
  },
  {
    sectionName: "Gestão",
    options: [
      {
        name: "Produtos",
        path: "/admin/products",
        icon: <Package />,
      },
      {
        name: "Extras",
        path: "/admin/extras",
        icon: <Package />,
      },
      {
        name: "Categorias",
        path: "/admin/categories",
        icon: <Tag />,
      },
      {
        name: "Métodos de Pagamento",
        path: "/admin/categories",
        icon: <CreditCard />,
      },
    ],
  },
  {
    sectionName: "Usuários",
    options: [
      {
        name: "Usuários",
        path: "admin/users",
        icon: <Users />,
      },
    ],
  },
  {
    sectionName: "Sistema",
    options: [
      {
        name: "Configurações",
        path: "admin/settings",
        icon: <Settings />,
      },
    ],
  },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const [selectedRoute, setSelectedRoute] = useState("");

  useEffect(() => {
    const actualRoute = window.location.pathname;

    setSelectedRoute(actualRoute);
  }, []);

  return (
    <div className="flex fixed left-0 top-0 h-screen w-60 flex-col bg-white border-r border-gray-200 z-10 overflow-auto custom-scroll">
      {/* Botão de fechar (visível apenas em telas pequenas) */}
      <div className="absolute right-0 flex justify-end p-4 md:hidden">
        <button
          onClick={onClose}
          aria-label="Fechar sidebar"
          className="hover:bg-black/20 rounded-full p-1 cursor-pointer"
        >
          <X className="size-5 text-white" />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 p-6 pt-12 md:pt-6 bg-blue-500">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Store className="h-6 w-6 text-blue-500" />
        </div>
        <div className="text-white">
          <h2 className="text-base font-semibold">Anotaki Admin</h2>
          <p className="text-xs text-blue-100">Painel de Controle</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuSections &&
          menuSections.length > 0 &&
          menuSections.map((section, index) => (
            <>
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {section.sectionName}
                </h3>

                {section.options.length > 0 &&
                  section.options &&
                  section.options.map((option) => (
                    <Button
                      variant="ghost"
                      title={option.name}
                      className={`w-full justify-start gap-3 h-11 transition-all ease-in-out text-xs
                        ${
                          selectedRoute == option.path
                            ? "border-l-primary border-l-[1px] text-primary"
                            : ""
                        }`}
                      asChild
                      onClick={() => setSelectedRoute(option.path)}
                    >
                      <Link to={option.path}>
                        <span className="h-5 w-5 flex items-center">
                          {option.icon}
                        </span>
                        <p className="truncate"> {option.name}</p>
                      </Link>
                    </Button>
                  ))}
              </div>

              {index != menuSections.length - 1 && (
                <Separator className="my-4" />
              )}
            </>
          ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}
