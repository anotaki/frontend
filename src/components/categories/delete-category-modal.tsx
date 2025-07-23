import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

interface DeleteCategoryConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  category: Category | null;
}

export default function DeleteCategoryConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  category,
}: DeleteCategoryConfirmationModalProps) {
  if (!category) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-4 md:p-6">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-base text-red-900">
                Confirmar Exclusão
              </DialogTitle>
              <DialogDescription className="mt-1">
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-3">
              Você tem certeza que deseja excluir a categoria:
            </p>

            <div className="bg-white border border-red-200 rounded-md p-3">
              <div className="flex items-center gap-3">
                {/* Informações da categoria */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {category.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center text-xs text-red-700">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Todos os dados relacionados serão perdidos
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Excluindo...</span>
                </div>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Sim, Excluir Categoria
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
