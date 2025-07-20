import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { TableHead } from "./table";
import type { SortConfig } from "../data-table/generic-data-table";

// Componente para header clicável
export const BaseSortableHeader = ({
  field,
  children,
  sortConfig,
  setSortConfig,
}: {
  field: string;
  children: React.ReactNode;
  sortConfig: SortConfig;
  setSortConfig: any;
}) => {
  const handleSort = () => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ field, direction });
  };

  const getSortIcon = () => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    }

    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1 text-blue-600" />
    );
  };

  return (
    <TableHead className=" hover:bg-gray-100">
      <div className="flex items-center">
        {children}
        <span className="cursor-pointer" onClick={() => handleSort()}>
          {getSortIcon()}
        </span>
      </div>
    </TableHead>
  );
};
