import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type {
  FilterConfig,
  FilterOption,
} from "../data-table/generic-data-table";

interface CategoryFilterProps {
  options: FilterOption[];
  filterConfig: FilterConfig;
  setFilterConfig: any;
  field: string;
}

export default function CategoryFilter({
  filterConfig,
  setFilterConfig,
  field,
  options,
}: CategoryFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Filter
          className={`w-4 h-4 ml-1  cursor-pointer ${
            filterConfig.value != "" ? "text-primary" : "text-gray-400"
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setFilterConfig({ field: "", value: "" });
          }}
        >
          Todas
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              setFilterConfig({ field, value: option.value });
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
