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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex fixed left-0 top-0 h-screen w-64 flex-col bg-white border-r border-gray-200 z-10 overflow-auto custom-scroll">
      {/* Botão de fechar (visível apenas em telas pequenas) */}
      <div className="absolute right-0 flex justify-end p-4 md:hidden">
        <button
          onClick={onClose}
          aria-label="Fechar sidebar"
          className="hover:bg-gray-200/70 rounded-full p-1 cursor-pointer"
        >
          <X className="size-5 text-black/60" />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 p-6 pt-12 bg-blue-500">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Store className="h-6 w-6 text-blue-500" />
        </div>
        <div className="text-white">
          <h2 className="text-lg font-semibold">Anotaki Admin</h2>
          <p className="text-sm text-blue-100">Painel de Controle</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gestão
          </h3>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/dashboard">
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/produtos">
              <Package className="h-5 w-5" />
              Produtos
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/categorias">
              <Tag className="h-5 w-5" />
              Categorias
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/pedidos">
              <ShoppingBag className="h-5 w-5" />
              Pedidos
            </Link>
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Usuários
          </h3>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/usuarios">
              <Users className="h-5 w-5" />
              Usuários
            </Link>
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Relatórios
          </h3>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/relatorios">
              <FileText className="h-5 w-5" />
              Relatórios
            </Link>
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sistema
          </h3>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link to="/admin/configuracoes">
              <Settings className="h-5 w-5" />
              Configurações
            </Link>
          </Button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}
