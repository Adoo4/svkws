import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

// useBooks.js
const useBooks = (filter) => {
  const { data: allBooks = [], isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("http://192.168.0.15:5000/api/books");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredBooks = useMemo(() => {
    if (!Array.isArray(allBooks)) return [];
    return allBooks.filter((b) => {
      if (filter.bookCategory && filter.bookCategory.toLowerCase() !== "sve knjige") {
        if (b.mainCategory?.toLowerCase() !== filter.bookCategory.toLowerCase()) return false;
      }
      if (filter.bookSubCategory) {
        if (b.subCategory?.toLowerCase() !== filter.bookSubCategory.toLowerCase()) return false;
      }
      if (filter.bookLanguage) {
        if (b.language?.toLowerCase() !== filter.bookLanguage.toLowerCase()) return false;
      }
      if (filter.newBook && !b.isNew) return false;
      if (filter.bookDiscount && (!b.discount || b.discount.amount <= 0)) return false;
      return true;
    });
  }, [allBooks, filter]);

  return { allBooks, filteredBooks, isLoading, isError };
};

export default useBooks;