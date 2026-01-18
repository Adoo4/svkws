import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBooksGrid = ({ page, pageSize, sortModel, filters }) => {
  const stableSort = JSON.stringify(sortModel);
  const stableFilters = JSON.stringify(filters);

  return useQuery({
    queryKey: [
      "books-grid",
      page,
      pageSize,
      stableSort,
      stableFilters,
    ],
    queryFn: async () => {
   const res = await axios.get(
  "https://backendsvkwbshp.onrender.com/api/admin/books",
  {
    params: {
      page,
      pageSize,
    sortField: sortModel[0]?.field || "_id",
            sortOrder: sortModel[0]?.sort || "asc",
      filters: stableFilters,
    },
  }
);
      return res.data;
    },
   
  });
};


export default useBooksGrid;
