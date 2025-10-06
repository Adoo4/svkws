import { useState } from "react";

export default function useFilters(initial = {}) {
  const [filters, setFilters] = useState({
    mainCategory: "",
    subCategory: "",
    language: "",
    isNew: false,
    discount: false,
    ...initial,
  });

  // Optional: helper to reset filters
  const resetFilters = () => {
    setFilters({
      mainCategory: "",
      subCategory: "",
      language: "",
      isNew: false,
      discount: false,
    });
  };

  // Optional: helper to update a single filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, setFilters, resetFilters, updateFilter };
}
