import { Home, Package, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function BottomNavigation() {
  const cartCount = 2;
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        <Link to={"/menu"}>
          <button className="flex flex-col items-center py-2 px-4 text-primary cursor-pointer">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium">Início</span>
          </button>
        </Link>

        <Link to={"/my-orders"}>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary cursor-pointer">
            <Package className="w-5 h-5 mb-1" />
            <span className="text-sm">Pedidos</span>
          </button>
        </Link>

        <Link to={"/my-cart"}>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary relative cursor-pointer">
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-sm">Carrinho</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}
