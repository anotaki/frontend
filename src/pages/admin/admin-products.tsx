import { GetPaginatedProducts } from "@/api/products";
import AddProductModal from "@/components/products/add-product-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePagination } from "@/hooks/use-pagination";
import type { PaginatedDataResponse, Product } from "@/types";
import { formatDate, formatPrice } from "@/utils";
import { Edit, EllipsisVertical, Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Hambúrguer Artesanal",
    price: 29.9,
    description:
      "Delicioso hambúrguer artesanal com 180g de carne angus, queijo cheddar e bacon.",
    imageUrl: "https://example.com/images/burger.jpg",
    extras: [],
    categoryId: 1,
    category: undefined,
    createdAt: "2025-07-01T14:30:00.000Z",
    salesCount: 152,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    price: 49.9,
    description:
      "Pizza tradicional italiana com molho de tomate, mussarela de búfala e manjericão fresco.",
    imageUrl: "https://example.com/images/pizza.jpg",
    extras: [],
    categoryId: 2,
    category: undefined,
    createdAt: "2025-07-03T18:00:00.000Z",
    salesCount: 89,
  },
  {
    id: 3,
    name: "Suco Natural de Laranja",
    price: 9.5,
    description:
      "Suco natural de laranja, 300ml, sem adição de açúcar ou conservantes.",
    imageUrl: "https://example.com/images/orange-juice.jpg",
    extras: [],
    categoryId: 3,
    category: undefined,
    createdAt: "2025-07-05T12:15:00.000Z",
    salesCount: 213,
  },
  {
    id: 4,
    name: "Brownie de Chocolate",
    price: 14.0,
    description:
      "Brownie caseiro com pedaços de chocolate meio amargo e cobertura cremosa.",
    imageUrl: "https://example.com/images/brownie.jpg",
    extras: [],
    categoryId: 4,
    category: undefined,
    createdAt: "2025-07-06T10:45:00.000Z",
    salesCount: 67,
  },
  {
    id: 5,
    name: "Salada Caesar",
    price: 24.5,
    description:
      "Clássica salada Caesar com alface romana, croutons crocantes e molho especial.",
    imageUrl: "https://example.com/images/caesar-salad.jpg",
    extras: [],
    categoryId: 5,
    category: undefined,
    createdAt: "2025-07-07T16:20:00.000Z",
    salesCount: 45,
  },
];

export default function AdminProducts() {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [products, setProducts] = useState<PaginatedDataResponse<Product>>();

  const DEFAULT_PAGE_SIZE = 5;

  const { currentPage, endRange, startRange, totalItems, totalPages } =
    usePagination<Product>(products);

  async function GetData(page: number, pageSize: number) {
    await GetPaginatedProducts(page, pageSize).then((data) =>
      setProducts(data)
    );
  }

  useEffect(() => {
    GetData(1, DEFAULT_PAGE_SIZE);
  }, []);

  const handleAddProductSubmit = (data: ProductFormData) => {
    console.log("Dados do produto:", data);

    setIsModalAddOpen(false);
  };

  const handleEditProduct = (id: number) => {
    console.log("Editar produto:", id);
  };

  const handleDeleteProduct = (id: number) => {
    console.log("Excluir produto:", id);
  };

  const handleViewProduct = (id: number) => {
    console.log("Visualizar produto:", id);
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-6">Gerenciamento de Produtos</h1>

      <div className="space-y-4">
        {/* Header with Add Product button */}
        <div className="flex justify-end">
          <Button
            onClick={() => setIsModalAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>

        {/* Products Table */}
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Imagem</TableHead>
                <TableHead>Nome do Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.items && products.items.length > 0 ? (
                products?.items.map((product: Product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell>#{product.id}</TableCell>
                    <TableCell>
                      {/* <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    /> */}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-bold">{product.name}</div>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{product.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        {product.category?.name || "Sem categoria"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>
                      <span className="text-green-600 font-medium">
                        {product.salesCount} vendas
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(product.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-gray-50 text-center w-full">
                  <TableCell colSpan={12}>Sem dados.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer with pagination info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <Select
            onValueChange={(value) => GetData(1, Number.parseInt(value))}
            defaultValue={DEFAULT_PAGE_SIZE.toString()}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={DEFAULT_PAGE_SIZE.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-center">
            {startRange}-{endRange} de {totalItems} produtos
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage == 1}
              onClick={() => GetData(currentPage - 1, 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={totalPages == currentPage}
              onClick={() => GetData(currentPage + 1, 1)}
            >
              Próximo
            </Button>
          </div>
        </div>

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
          onSubmit={handleAddProductSubmit}
        />
      </div>
    </main>
  );
}
