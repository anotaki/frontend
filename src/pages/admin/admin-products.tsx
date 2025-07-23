import type { Product } from "@/types";
import { formatDate, formatPriceWithCurrencyStyle } from "@/utils";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  CreateProduct,
  DeleteProduct,
  GetPaginatedProducts,
  UpdateProduct,
} from "@/api/products";
import {
  GenericDataTable,
  type ActionConfig,
  type ColumnConfig,
} from "@/components/data-table/generic-data-table";
import { Badge } from "@/components/ui/badge";
import CategoryFilter from "@/components/products/category-filter";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ProductFormData } from "@/components/products/product-modal";
import ProductModal from "@/components/products/product-modal";
import ImageProductModal from "@/components/products/image-product-modal";
import DeleteConfirmationModal from "@/components/products/delete-product-modal";
import { useMutationBase } from "@/hooks/mutations/use-mutation-base";

export default function AdminProducts() {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    createMutation: createProductMutation,
    deleteMutation: deleteProductMutation,
    updateMutation: updateProductMutation,
  } = useMutationBase({
    queryKey: "products",
    create: { fn: CreateProduct },
    delete: { fn: DeleteProduct },
    update: { fn: UpdateProduct },
    // customMutations: [
    //   {
    //     name: "updateProductMutation",
    //     errorMessage: "Erro",
    //     fn: UpdateProduct,
    //   },
    // ] as const,
  });

  const handleAddProduct = (form: ProductFormData) => {
    createProductMutation.mutate(form);
    setIsModalAddOpen(false);
  };

  const handleEditProduct = (form: ProductFormData) => {
    if (!selectedProduct) return;

    updateProductMutation.mutate({
      id: selectedProduct.id,
      form: form,
    });

    setIsModalEditOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedProduct) return;

    deleteProductMutation.mutate(selectedProduct.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      },
    });
  };

  // Função para preparar dados iniciais para edição
  const getInitialEditData = (product: Product): Partial<ProductFormData> => {
    return {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.categoryId?.toString() || "",
      extras: product.extras.map((x) => x.extraId) ?? [],
    };
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
      render: (product) =>
        product.imageMimeType || product.imageData ? (
          <img
            onClick={() => {
              setSelectedProduct(product);
              setIsModalImageOpen(true);
            }}
            src={`data:${product.imageMimeType};base64,${product.imageData}`}
            alt={product.name}
            className="w-16 h-16 object-cover rounded cursor-pointer"
          />
        ) : (
          <div className="size-16 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400 text-[10px]">Sem imagem</span>
          </div>
        ),
      align: "right",
    },
    {
      key: "name",
      label: "Nome do Produto",
      align: "left",
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
      label: "Editar",
      icon: Edit,
      onClick: (product) => {
        setSelectedProduct(product);
        setIsModalEditOpen(true);
      },
    },
    {
      label: "Excluir",
      icon: Trash2,
      onClick: handleDeleteClick,
      variant: "destructive",
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-6">Gerenciamento de produtos</h1>

      <GenericDataTable<Product>
        queryKey="products"
        columns={columns}
        actions={actions}
        addButton={{
          label: "Adicionar Produto",
          onClick: () => setIsModalAddOpen(true),
        }}
        fetchData={GetPaginatedProducts}
        defaultSort={{ field: "id", direction: "asc" }}
        defaultPageSize={5}
        emptyMessage="Nenhum produto encontrado."
      />

      {/* Modal para adicionar produto */}
      {isModalAddOpen && (
        <ProductModal
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
          onSubmit={handleAddProduct}
          isLoading={createProductMutation.isPending}
          mode="add"
        />
      )}

      {/* Modal para editar produto */}
      {isModalEditOpen && (
        <ProductModal
          isOpen={isModalEditOpen}
          onClose={() => {
            setIsModalEditOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleEditProduct}
          isLoading={updateProductMutation.isPending}
          initialData={
            selectedProduct ? getInitialEditData(selectedProduct) : undefined
          }
          mode="edit"
        />
      )}

      {isModalImageOpen && (
        <ImageProductModal
          isOpen={isModalImageOpen}
          onClose={() => setIsModalImageOpen(false)}
          imageData={selectedProduct?.imageData}
          imageMimeType={selectedProduct?.imageMimeType}
        />
      )}

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!deleteProductMutation.isPending) {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteProductMutation.isPending}
        product={selectedProduct}
      />
    </main>
  );
}
