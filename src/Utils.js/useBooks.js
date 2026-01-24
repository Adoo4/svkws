import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBooks = (filters = {}, page = 1, limit = 20) => {
  const stableFilters = JSON.stringify(filters); // 🚀 prevents queryKey duplication

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", stableFilters, page],
    queryFn: async () => {
      const params = { ...filters, page, limit };
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
