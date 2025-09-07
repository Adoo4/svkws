import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import {
  Grid,
  Typography,
  Pagination,
  useMediaQuery,
  useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookCard from "../Components/Bookcard";
import BookCardSkeleton from "../Components/BookCardSkeleton";

const ProductGallery = ({
  books = [],         // default to empty array if undefined
  loading = false,
  toggleDrawer,
  drawerData,
  setDrawerData,
  cart,
  setCart,
  wishlist,
  setWishlist
}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Safe fallback
  const safeBooks = Array.isArray(books) ? books : [];

  // Reset to page 1 whenever books change
  React.useEffect(() => {
    setPage(1);
  }, [safeBooks]);

  // Pagination applied after filtering
  const paginatedBooks = useMemo(() => {
    return safeBooks.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [safeBooks, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        marginTop: 0,
        minHeight: { xs: "100lvh", md: "100lvh" },
        padding: { xs: "0.5rem", lg: "1.2rem" },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        background: "#f0f0f0",
        boxShadow: "1px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Loading Skeleton */}
      {loading && (
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <Grid item xs key={index} sx={{ display: "flex" }}>
              <BookCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty State */}
      {!loading && safeBooks.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            py: 10,
            color: "gray",
            textAlign: "center",
          }}
        >
          <SearchIcon fontSize="large" />
          <Typography variant="h6" fontWeight={500}>
            U odabranoj kategoriji ne postoje proizvodi
          </Typography>
          <Typography variant="body2">
            Pokušaj promijeniti filter ili pretragu.
          </Typography>
        </Box>
      )}

      {/* Book Grid */}
      {!loading && safeBooks.length > 0 && (
        <Grid
          container
          spacing={{ xs: 0.5, sm: 2, xl: 3 }}
          columns={12}
          justifyContent="center"
          sx={{ width: "100%", height: "100%" }}
        >
          {paginatedBooks.map((book) => (
            <Grid item xs sx={{ display: "flex" }} key={book._id}>
              <BookCard
                book={book}
                toggleDrawer={toggleDrawer}
                setDrawerData={setDrawerData}
                drawerData={drawerData}
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {!loading && safeBooks.length > itemsPerPage && (
        <Box
          sx={{
            px: 3,
            py: 1.5,
            mt: "1rem",
            borderRadius: "50px",
            bgcolor: "#262626",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Pagination
            count={Math.ceil(safeBooks.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
            size={isSmallScreen ? "small" : "medium"}
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "50%",
                transition: "all 0.3s ease",
                border: "1px solid #313131",
                color: "#f9f9f9",
                bgcolor: "#313131",
              },
              "& .MuiPaginationItem-root:hover": {
                bgcolor: "#d62d00",
                color: "#f9f9f9",
                borderColor: "#d62d00",
              },
              "& .Mui-selected": {
                bgcolor: "#d62d00",
                color: "#f9f9f9",
                fontWeight: "bold",
                borderColor: "#d62d00",
                boxShadow: "0px 0px 8px rgba(214, 45, 0, 0.6)",
                "&:hover": { bgcolor: "#a32000" },
              },
              "& .MuiPaginationItem-ellipsis": { color: "#f9f9f9" },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGallery;
