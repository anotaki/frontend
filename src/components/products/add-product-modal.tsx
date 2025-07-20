import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatPrice, unformatPrice } from "@/utils";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category?: string;
  image?: File;
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
    setValue,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      image: undefined,
    },
  });

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
    // reset();
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-base">
            Adicionar Novo Produto
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para adicionar um novo produto ao
            estoque.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Nome do Produto */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome do produto"
              className={errors.name ? "border-red-500" : ""}
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

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Controller
              name="category"
              control={control}
              defaultValue={undefined}
              rules={{
                required: "Categoria é obrigatória",
              }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      <SelectItem value="pasteis">Pastéis</SelectItem>
                      <SelectItem value="hamburguers">Hambúrgueres</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="sobremesas">Sobremesas</SelectItem>
                      <SelectItem value="petiscos">Petiscos</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{
                required: "Preço é obrigatório",
                validate: (value) => {
                  const num = parseFloat(value.replace(",", "."));
                  return num > 0 || "Preço deve ser maior que zero";
                },
              }}
              render={({ field }) => (
                <Input
                  id="price"
                  placeholder="0,00"
                  value={formatPrice(field.value)}
                  onChange={(e) => {
                    const rawValue = unformatPrice(e.target.value);
                    field.onChange(rawValue);
                  }}
                  className={errors.price ? "border-red-500" : ""}
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Digite a descrição do produto"
              className={errors.description ? "border-red-500" : ""}
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

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image">Imagem do Produto</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;

                setValue("image", file);
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image.message}</p>
            )}
          </div>

          <DialogFooter className="sticky bottom-0 w-full pt-4 bg-white">
            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Adicionar Produto
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
