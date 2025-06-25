import { useState } from "react";
import { ShoppingCart, Home, Package, User, Search, Clock } from "lucide-react";
import Burguer from "../assets/img/burguer.jpg";
import NoImage from "../assets/img/item_no_image.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Dados mock do cardápio
const menuData = {
  restaurant: {
    name: "Anotaki Delivery",
    status: "Aberto hoje às 18h",
    info: "Sem pedido mínimo",
  },
  mostOrdered: [
    {
      id: 1,
      name: "Anotaki Simples",
      price: 10.0,
      image: Burguer,
    },
    {
      id: 2,
      name: "Anotaki Frango",
      price: 13.0,
      image: Burguer,
    },
    {
      id: 3,
      name: "X - Egg",
      price: 16.0,
      image: Burguer,
    },
    {
      id: 4,
      name: "X - Bacon",
      price: 18.0,
      image: Burguer,
    },
    {
      id: 5,
      name: "Anotaki Burger",
      price: 20.0,
      image: Burguer,
    },
    {
      id: 6,
      name: "Refrigerantes 350ml",
      price: 5.0,
      image: Burguer,
    },
  ],
  categories: [
    {
      name: "Hot Dog's",
      items: [
        {
          id: 7,
          name: "Anotaki Simples",
          description: "2 salsichas, alface, milho, batata palha e molhos.",
          price: 10.0,
          image: Burguer,
        },
        {
          id: 8,
          name: "Anotaki Frango",
          description:
            "2 salsichas, frango, alface, milho, batata palha e molho.",
          price: 13.0,
          image: Burguer,
        },
        {
          id: 9,
          name: "Anotaki Carne Seca",
          description:
            "2 salsichas, carne seca, alface, milho, batata palha e molho.",
          price: 19.0,
          image: Burguer,
        },
      ],
    },
    {
      name: "Lanches",
      items: [
        {
          id: 10,
          name: "X - Salada",
          description:
            "Pão, Hambúrguer, Alface, Tomate, Milho, Queijo Mussarela e Batata Palha",
          price: 15.0,
          image: NoImage,
        },
        {
          id: 11,
          name: "X - Bacon",
          description:
            "Pão, Hambúrguer, Bacon, Alface, Tomate, Milho, Queijo Mussarela e Batata Palha",
          price: 18.0,
          image: NoImage,
        },
        {
          id: 12,
          name: "X - Egg",
          description:
            "Pão, Hambúrguer, Ovo, Alface, Tomate, Milho, Queijo Mussarela e Batata Palha",
          price: 16.0,
          image: NoImage,
        },
      ],
    },
  ],
};

export default function MenuPage() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const addToCart = (item: any) => {
    setCartCount((prev) => prev + 1);
    console.log("Adicionado ao carrinho:", item);
  };

  const openProductDialog = (item: any) => {
    setSelectedProduct(item);
    setIsDialogOpen(true);
  };

  const addToCartFromDialog = (item: any) => {
    addToCart(item);
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-6xl w-full mx-auto">
          <div className="flex items-center space-x-3">
            <div className="size-10 bg-white rounded-full flex items-center justify-center">
              <img src="/anotaki_img.png"></img>
            </div>

            <h1 className="font-bold text-lg">{menuData.restaurant.name}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 cursor-pointer hover:text-primary/80" />
            <User className="w-5 h-5 cursor-pointer hover:text-primary/80" />
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center justify-between text-sm text-gray-600 max-w-6xl w-full mx-auto">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {menuData.restaurant.status}
            </span>
            <span>• {menuData.restaurant.info}</span>
          </div>
          <span className="text-primary font-medium cursor-pointer hover:text-primary/80">
            Perfil da loja
          </span>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-primary/10 px-4 py-2 text-center">
        <span className="text-primary text-sm">
          Loja fechada, abre hoje às 18h
        </span>
      </div>

      {/* Main Content */}
      <main className="pb-20 max-w-6xl w-full mx-auto">
        {/* Most Ordered Section */}
        {/* <section className="bg-white px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Os mais pedidos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {menuData.mostOrdered.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(item)}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-primary font-bold text-sm">
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Categories */}
        {menuData.categories.map((category) => (
          <section key={category.name} className="bg-white mt-2 px-4 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {category.name}
            </h2>
            <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => openProductDialog(item)}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <p className="text-primary font-bold">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="size-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md mx-auto border-0">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-3">
                    {selectedProduct.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {selectedProduct.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <Button
                  onClick={() => addToCartFromDialog(selectedProduct)}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Adicionar ao carrinho
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4 text-primary cursor-pointer">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary cursor-pointer">
            <Package className="w-5 h-5 mb-1" />
            <span className="text-xs">Pedidos</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary relative cursor-pointer">
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs">Carrinho</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
