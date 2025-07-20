import type { Product } from "@/types";
import { formatDate, formatPriceWithCurrencyStyle } from "@/utils";
import { useEffect, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { CreateProduct, GetPaginatedProducts } from "@/api/products";
import {
  GenericDataTable,
  type ActionConfig,
  type ColumnConfig,
} from "@/components/data-table/generic-data-table";
import { Badge } from "@/components/ui/badge";
import AddProductModal, {
  type ProductFormData,
} from "@/components/products/add-product-modal";
import CategoryFilter from "@/components/products/category-filter";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminProducts() {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleAddProductSubmit = async (form: ProductFormData) => {
    const newProduct = await CreateProduct(form);
    console.log(newProduct);

    setIsModalAddOpen(false);
  };

  // Configuração das colunas
  const columns: ColumnConfig<Product>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (product) => `#${product.id}`,
    },
    {
      key: "image",
      label: "Imagem",
      sortable: false,
      render: (product) => (
        <img
          src={`data:${product.imageMimeType};base64,${product.imageData}`}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      ),
      align: "right",
    },
    {
      key: "name",
      label: "Nome do Produto",
      sortable: true,
      render: (product) => (
        <div>
          <div className="font-bold">{product.name}</div>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {product.description}
              </div>
            </TooltipTrigger>
            <TooltipContent>{product.description}</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "category",
      label: "Categoria",
      sortable: true,
      filterable: true,
      filterConfig: {
        options: [
          { value: "pastéis", label: "Pastéis" },
          { value: "hamburguers", label: "Hambúrgueres" },
          { value: "bebidas", label: "Bebidas" },
        ],
        component: CategoryFilter,
      },
      render: (product) => (
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {product.category?.name || "Sem categoria"}
        </Badge>
      ),
    },
    {
      key: "price",
      label: "Preço",
      sortable: true,
      render: (product) => (
        <span className="font-medium">
          {formatPriceWithCurrencyStyle(product.price)}
        </span>
      ),
    },
    {
      key: "salesCount",
      label: "Vendas",
      sortable: true,
      render: (product) => (
        <span className="text-green-600 font-medium">
          {product.salesCount} vendas
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Data Criação",
      align: "center",
      sortable: true,
      render: (product) => (
        <span className="text-sm text-gray-500">
          {formatDate(product.createdAt)}
        </span>
      ),
    },
  ];

  // Configuração das ações
  const actions: ActionConfig<Product>[] = [
    {
      label: "Visualizar",
      icon: Eye,
      onClick: (product) => console.log("Visualizar produto:", product.id),
    },
    {
      label: "Editar",
      icon: Edit,
      onClick: (product) => console.log("Editar produto:", product.id),
    },
    {
      label: "Excluir",
      icon: Trash2,
      onClick: (product) => console.log("Excluir produto:", product.id),
      variant: "destructive",
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-6">Gerenciamento de produtos</h1>

      <GenericDataTable<Product>
        columns={columns}
        actions={actions}
        addButton={{
          label: "Adicionar Produto",
          onClick: () => setIsModalAddOpen(true),
        }}
        fetchData={GetPaginatedProducts}
        // product={product}
        TData={(data) => {
          console.log(data?.items);

          // if (product.id) data?.items.push(product);
        }}
        defaultSort={{ field: "id", direction: "asc" }}
        defaultPageSize={5}
        emptyMessage="Nenhum produto encontrado."
      />

      {isModalAddOpen && (
        <AddProductModal
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
          onSubmit={handleAddProductSubmit}
        />
      )}
    </main>
  );
}
