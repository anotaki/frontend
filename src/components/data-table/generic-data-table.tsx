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

export interface FilterOption {
  value: any;
  label: string;
}

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
  options: FilterOption[];
  component?: React.ComponentType<{
    options: FilterOption[];
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
  width?: string;
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
  columns: ColumnConfig<T>[];
  actions?: ActionConfig<T>[];
  addButton?: {
    label: string;
    onClick: () => void;
  };
  fetchData: (
    paginationParams: PaginationParams
  ) => Promise<PaginatedDataResponse<T> | undefined>;
  TData: (data: PaginatedDataResponse<T> | undefined) => void;
  defaultSort?: SortConfig;
  defaultFilter?: FilterConfig;
  defaultPageSize?: number;
  emptyMessage?: string;
}

export function GenericDataTable<T>({
  columns,
  actions = [],
  TData,
  addButton,
  fetchData,
  defaultSort = { field: "id", direction: "asc" },
  defaultFilter = { field: "", value: "" },
  defaultPageSize = 5,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableConfig<T>) {
  const [data, setData] = useState<PaginatedDataResponse<T>>();
  // const [loading, setLoading] = useState(false);
  const [selectedPageSize, setSelectedPageSize] = useState(defaultPageSize);

  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSort);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>(defaultFilter);

  const { currentPage, endRange, startRange, totalItems, totalPages } =
    usePagination(data);

  const getData = async (
    page: number,
    pageSize: number,
    sortBy?: string,
    sortDirection?: "asc" | "desc",
    filterBy?: string,
    filter?: string
  ) => {
    try {
      // setLoading(true);
      const params: PaginationParams = {
        page,
        pageSize,
        sortBy,
        sortDirection,
        filterBy,
        filter,
      };

      const result = await fetchData(params);
      setData(result);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    TData(data);
  }, [data]);

  useEffect(() => {
    getData(
      1,
      selectedPageSize,
      sortConfig.field,
      sortConfig.direction,
      filterConfig.field,
      filterConfig.value
    );
  }, [sortConfig, filterConfig]);

  const handlePageSizeChange = (value: string) => {
    const intValue = Number.parseInt(value);
    setSelectedPageSize(intValue);
    getData(
      1,
      intValue,
      sortConfig.field,
      sortConfig.direction,
      filterConfig.field,
      filterConfig.value
    );
  };

  const handlePageChange = (newPage: number) => {
    getData(
      newPage,
      selectedPageSize,
      sortConfig.field,
      sortConfig.direction,
      filterConfig.field,
      filterConfig.value
    );
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

    const { component: CustomComponent, options } = column.filterConfig;

    if (CustomComponent) {
      return (
        <CustomComponent
          options={options}
          filterConfig={filterConfig}
          setFilterConfig={setFilterConfig}
          field={column.key}
        />
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
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

      {/* Loading State */}
      {/* {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )} */}

      {/* Table */}
      <div className="">
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
                      className={column.align === "center" ? "text-center" : ""}
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
            {data?.items && data.items.length > 0 ? (
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

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
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

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={totalPages === currentPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
