// useBooks.js
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const useBooks = (initialFilters = {}, initialLimit = 20) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // =========================
  // FILTER STATE
  // =========================
  const [filters, setFilters] = useState(() => ({
    mainCategory: searchParams.get("mainCategory") || initialFilters.mainCategory || "",
    subCategory: searchParams.get("subCategory") || initialFilters.subCategory || "",
    language: searchParams.get("language") || initialFilters.language || "",
    isNew: searchParams.get("isNew") === "true" || initialFilters.isNew || false,
    discount: searchParams.get("discount") === "true" || initialFilters.discount || false,
  }));

  // =========================
  // SORT & PAGINATION STATE
  // =========================
  const defaultSort = "";
  const defaultOrder = "asc";
  const sortParam = searchParams.get("sort");
  const normalizedSort = sortParam === "relevance" ? "" : sortParam;
  const [sort, setSort] = useState(normalizedSort || defaultSort);
  const [order, setOrder] = useState(searchParams.get("order") || defaultOrder);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(initialLimit);

  // =========================
  // URL SYNC
  // =========================
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;

    const syncParam = (key, value) => {
      if (value !== undefined && value !== null) {
        if (params.get(key) !== String(value)) {
          params.set(key, value);
          changed = true;
        }
      } else if (params.has(key)) {
        params.delete(key);
        changed = true;
      }
    };

    syncParam("mainCategory", filters.mainCategory || null);
    syncParam("subCategory", filters.subCategory || null);
    syncParam("language", filters.language || null);
    syncParam("isNew", filters.isNew ? "true" : null);
    syncParam("discount", filters.discount ? "true" : null);
    syncParam("page", page > 1 ? page : null);
    if (sort) {
      syncParam("sort", sort);
      syncParam("order", order || defaultOrder);
    } else {
      syncParam("sort", null);
      syncParam("order", null);
    }

    if (changed) setSearchParams(params, { replace: true });
  }, [filters, page, sort, order, searchParams, setSearchParams]);

  // =========================
  // STABLE FILTERS
  // =========================
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  // =========================
  // FETCH DATA
  // =========================
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["books", stableFilters, page, sort, order],
    queryFn: async () => {
      const params = { ...filters, page, limit };
      if (sort) {
        params.sort = sort;
        params.order = order || defaultOrder;
      }
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/books",
        { params }
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    retry: 2, // automatic retry
  });

  // =========================
  // HELPERS
  // =========================
  const setPageSafe = useCallback((p) => {
    setPage((prev) => (p > 0 ? p : prev));
  }, []);

  const resetPage = useCallback(() => setPage(1), []);

  return {
    books: data?.books || [],
    totalPages: data?.totalPages || 1,
    totalBooks: data?.totalBooks || 0,
    serverPage: data?.currentPage || 1,
    isLoading,
    isError,
    refetch,

    // STATE & SETTERS
    filters,
    setFilters,
    sort,
    setSort,
    order,
    setOrder,
    page,
    setPage: setPageSafe,
    limit,
    setLimit,
    resetPage,
    
  };
};

export default useBooks;
