import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBookBySlug = async (slug) => {
  const { data } = await axios.get(
    `https://backendsvkwbshp.onrender.com/api/books/slug/${slug}`
  );
  return data; // return the object directly
};

export default function useBook(slug) {
  return useQuery({
    queryKey: ["book", slug],
    queryFn: () => fetchBookBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
