import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetch book by ID
 */
const fetchBookById = async (id) => {
  const { data } = await axios.get(
    `https://backendsvkwbshp.onrender.com/api/books/${id}`
  );
  // Handle backend structure (might be wrapped)
  return data.book || data;
};

export default function useBook(id) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id, // only run if id exists
    staleTime: 1000 * 60 * 5, // 5 minutes, optional
  });
}
