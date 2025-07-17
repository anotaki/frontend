import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProductFormData } from "@/pages/admin/admin-products";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const inputStyles =
  "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
}: AddProductModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
    },
  });

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
    reset();
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-base">
            Adicionar Novo Produto
          </DialogTitle>
          <DialogDescription className="">
            Preencha o formulário abaixo para adicionar um novo produto ao
            estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do produto"
              className={`${inputStyles} ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", {
                required: "Nome do produto é obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter pelo menos 2 caracteres",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Categoria
            </label>

            <Controller
              name="category"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Preço
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              className={`${inputStyles} ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              {...register("price", {
                required: "Preço é obrigatório",
                min: {
                  value: 0.01,
                  message: "Preço deve ser maior que zero",
                },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Digite a descrição do produto"
              className={`${inputStyles} ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Descrição deve ter no máximo 500 caracteres",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
              className="px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Adicionar Produto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
