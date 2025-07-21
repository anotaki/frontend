import type {
  FilterConfig,
  SortConfig,
} from "@/components/data-table/generic-data-table";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Hook personalizado para gerenciar search params
export function useTableUrlState(
  defaultSort: SortConfig,
  defaultFilter: FilterConfig,
  defaultPageSize: number
) {
  const navigate = useNavigate();
  const location = useLocation();

  const getSearchParams = () => new URLSearchParams(location.search);

  // lê os valores dos search params ou usa os defaults
  const getInitialState = () => {
    const searchParams = getSearchParams();

    return {
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(
        searchParams.get("pageSize") || defaultPageSize.toString()
      ),
      sortField: searchParams.get("sortBy") || defaultSort.field,
      sortDirection:
        (searchParams.get("sortDirection") as "asc" | "desc") ||
        defaultSort.direction,
      filterField: searchParams.get("filterBy") || defaultFilter.field,
      filterValue: searchParams.get("filter") || defaultFilter.value,
    };
  };

  const [state, setState] = useState(getInitialState);

  const updateUrl = (newState: typeof state) => {
    const params = new URLSearchParams();

    // Só adiciona parâmetros que não são os valores default
    if (newState.page !== 1) {
      params.set("page", newState.page.toString());
    }

    if (newState.pageSize !== defaultPageSize) {
      params.set("pageSize", newState.pageSize.toString());
    }

    if (
      newState.sortField !== defaultSort.field ||
      newState.sortDirection !== defaultSort.direction
    ) {
      params.set("sortBy", newState.sortField);
      params.set("sortDirection", newState.sortDirection);
    }

    if (newState.filterField && newState.filterValue) {
      params.set("filterBy", newState.filterField);
      params.set("filter", newState.filterValue);
    }

    const paramString = params.toString();
    const newUrl = `${location.pathname}${
      paramString ? `?${paramString}` : ""
    }`;

    navigate(newUrl, { replace: true });
  };

  const updateState = (updates: Partial<typeof state>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    updateUrl(newState);
  };

  // URL compartilhavel com estados

  // useEffect(() => {
  //   const newState = getInitialState();
  //   setState(newState);
  // }, [location.search]);

  return { state, updateState };
}
