import type { PaginatedDataResponse } from "@/types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BaseSortableHeader } from "@/components/ui/sortable-table-header";
import { usePagination } from "@/hooks/use-pagination";
import { EllipsisVertical, Plus } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface FilterConfig {
  field: string;
  value: string;
}

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  filterBy?: string;
  filter?: string;
}

export interface ColumnFilterConfig {
  component: React.ComponentType<{
    filterConfig: FilterConfig;
    setFilterConfig: (config: FilterConfig) => void;
    field: string;
  }>;
}

export interface ColumnConfig<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterConfig?: ColumnFilterConfig;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface ActionConfig<T> {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: (item: T) => void;
  variant?: "default" | "destructive";
  show?: (item: T) => boolean;
}

export interface DataTableConfig<T> {
  queryKey: string;
  columns: ColumnConfig<T>[];
  actions?: ActionConfig<T>[];
  addButton?: {
    label: string;
    onClick: () => void;
  };
  fetchData: (
    paginationParams: PaginationParams
  ) => Promise<PaginatedDataResponse<T>>;
  defaultSort?: SortConfig;
  defaultFilter?: FilterConfig;
  defaultPageSize?: number;
  emptyMessage?: string;
}

export function GenericDataTable<T>({
  queryKey,
  columns,
  actions = [],
  addButton,
  fetchData,
  defaultSort = { field: "id", direction: "asc" },
  defaultFilter = { field: "", value: "" },
  defaultPageSize = 5,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableConfig<T>) {
  const [selectedPageSize, setSelectedPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSort);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>(defaultFilter);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationParams: PaginationParams = {
    page: currentPage,
    pageSize: selectedPageSize,
    sortBy: sortConfig.field,
    sortDirection: sortConfig.direction,
    filterBy: filterConfig.field,
    filter: filterConfig.value,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, paginationParams],
    queryFn: () => fetchData(paginationParams),
    placeholderData: keepPreviousData,
    staleTime: 30000, //30s Tempo pra invalidar o cache
    // gcTime: 0, // Não manter cache
    refetchOnWindowFocus: true, // Refetch quando a janela ganha foco
    refetchOnMount: true, // Sempre refetch ao montar o componente
  });

  const { endRange, startRange, totalItems } = usePagination(data);

  useEffect(() => {
    if (data && data.totalItems > 0 && currentPage > data.totalPages) {
      const validPage = Math.max(1, data.totalPages);
      setCurrentPage(validPage);
    }

    if (data && data.totalItems === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [data, currentPage]);

  const handlePageSizeChange = (value: string) => {
    const intValue = Number.parseInt(value);
    setSelectedPageSize(intValue);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (data && data.totalPages > 0) {
      const validPage = Math.min(Math.max(1, newPage), data.totalPages);
      setCurrentPage(validPage);
    } else {
      setCurrentPage(Math.max(1, newPage));
    }
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <BaseSortableHeader
      field={field}
      setSortConfig={setSortConfig}
      sortConfig={sortConfig}
    >
      {children}
    </BaseSortableHeader>
  );

  const renderFilter = (column: ColumnConfig<T>) => {
    if (!column.filterable || !column.filterConfig) return null;

    const { component: CustomComponent } = column.filterConfig;

    if (CustomComponent) {
      return (
        <CustomComponent
          filterConfig={filterConfig}
          setFilterConfig={setFilterConfig}
          field={column.key}
        />
      );
    }
  };

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = data ? currentPage >= data.totalPages : true;

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Erro ao carregar dados: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {addButton && (
          <Button
            onClick={addButton.onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            {addButton.label}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <React.Fragment key={column.key}>
                    {column.sortable ? (
                      <SortableHeader field={column.key}>
                        <div className="flex items-center">
                          {column.label}
                          {renderFilter(column)}
                        </div>
                      </SortableHeader>
                    ) : (
                      <TableHead
                        className={
                          column.align === "center" ? "text-center" : ""
                        }
                      >
                        <div className="flex items-center">
                          {column.label}
                          {renderFilter(column)}
                        </div>
                      </TableHead>
                    )}
                  </React.Fragment>
                ))}
                {actions.length > 0 && (
                  <TableHead className="text-center">Ações</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items && data.items?.length > 0 ? (
                data.items.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={`${
                          column.align == "center"
                            ? "text-center"
                            : column.align == "right"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {column.render
                          ? column.render(item)
                          : (item as any)[column.key]}
                      </TableCell>
                    ))}
                    {actions.length > 0 && (
                      <TableCell className="text-center">
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
                            {actions
                              .filter(
                                (action) => !action.show || action.show(item)
                              )
                              .map((action, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  onClick={() => action.onClick(item)}
                                  className={
                                    action.variant === "destructive"
                                      ? "text-red-600 focus:text-red-600"
                                      : ""
                                  }
                                >
                                  <action.icon className="w-4 h-4 mr-2" />
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-gray-50 text-center w-full">
                  <TableCell
                    colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600 overflow-x-auto">
        <Select
          onValueChange={handlePageSizeChange}
          defaultValue={selectedPageSize.toString()}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={selectedPageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-center">
          {startRange}-{endRange} de {totalItems} registros
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isPreviousDisabled}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isNextDisabled}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
