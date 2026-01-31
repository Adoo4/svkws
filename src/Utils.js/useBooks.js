import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBooks = (
  filters = {},
  page = 1,
  limit = 20,
  sort = "relevance",
  order = "asc"
) => {
  const stableFilters = JSON.stringify(filters); // 🚀 prevents queryKey duplication

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", stableFilters, page, sort, order],
    queryFn: async () => {
      const params = { ...filters, page, limit, sort, order };
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/books",
        { params }
      );
      
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return {
    books: data?.books || [],
    totalPages: data?.totalPages || 1,
    serverPage: data?.currentPage || 1,
    totalBooks: data?.totalBooks || 0,
    isLoading,
    isError,
  };
};

export default useBooks;
