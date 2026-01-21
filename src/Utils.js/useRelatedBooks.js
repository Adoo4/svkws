import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRelatedBooks = async (bookId, category) => {
  const { data } = await axios.get(
    `https://backendsvkwbshp.onrender.com/api/books/related/${bookId}?category=${encodeURIComponent(category)}`
  );
  return data;
};

export function useRelatedBooks(book) {
  return useQuery({
    queryKey: ["relatedBooks", book?._id],
    queryFn: () => fetchRelatedBooks(book._id, book.mainCategory),
    enabled: !!book,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}

export default useRelatedBooks;
