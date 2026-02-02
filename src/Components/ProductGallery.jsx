import Box from "@mui/material/Box";
import { Grid, Typography, Pagination, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { memo, useState, useEffect, useMemo, useCallback } from "react";
import BookCard from "./Bookcard/Bookcard";
import BookCardSkeleton from "./Bookcard/BookCardSkeleton";

// predefine sx objects outside render to prevent recalculation
const containerSx = {
  marginTop: 0,
  minHeight: { xs: "100lvh", md: "120lvh" },
  padding: { xs: "0.5rem", lg: "1.2rem" },
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  background: "#f0f0f0",
  boxShadow: "1px 0 10px rgba(0, 0, 0, 0.1)",
};

const emptyStateSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  py: 10,
  color: "gray",
  textAlign: "center",
};

const paginationBoxSx = {
  px: 3,
  py: 1.5,
  mt: "1rem",
  borderRadius: "50px",
  bgcolor: "#262626",
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const ProductGallery = memo(({
  books = [],
  loading = false,
  toggleDrawer,
  cart,
  drawerData,
  setDrawerData,
  addToCart,
  updateCartItem,
  removeCartItem,
  totalPages = 1,
  currentPage = 1,
  setPage,
  wishlist,
  addToWishlist,
  removeFromWishlist,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  // lazy render: only first 8 items immediately
  const itemsPerPage = 20;
  const initialVisible = Math.min(8, books.length);
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  useEffect(() => {
    if (!loading) {
      const id = requestIdleCallback(() => setVisibleCount(itemsPerPage));
      return () => cancelIdleCallback(id);
    }
  }, [books, loading]);

  const displayedBooks = useMemo(() => books.slice(0, visibleCount), [books, visibleCount]);

  // memoized handler for pagination
  const handlePageChange = useCallback((e, value) => setPage(value), [setPage]);

  return (
    <Box sx={containerSx}>
      {/* Loading Skeleton */}
      {loading && (
        <Grid container spacing={1} justifyContent="center">
          {Array.from({ length: Math.min(itemsPerPage, 8) }).map((_, index) => (
            <Grid item xs key={index} sx={{ display: "flex" }}>
              <BookCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty State */}
      {!loading && displayedBooks.length === 0 && (
        <Box sx={emptyStateSx}>
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
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }} // avoid vw spacing for performance
          columns={{ xs: 4, sm: 12, md: 12, lg: 4, xl: 5 }}
          justifyContent="center"
        >
          {!loading &&
            displayedBooks.map((book) => (
              <Grid
                item
                xs={2} sm={4} md={4} lg={1}
                key={book._id}
                sx={{ display: "flex", justifyContent: "center", alignItems: "stretch" }}
              >
                <BookCard
                  book={book}
                  toggleDrawer={toggleDrawer}
                  setDrawerData={setDrawerData}
                  drawerData={drawerData}
                  cart={cart}
                  addToCart={addToCart}
                  updateCartItem={updateCartItem}
                  removeCartItem={removeCartItem}
                  wishlist={wishlist}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                  isMobile={isSmallScreen} // pass down to avoid per-card useMediaQuery
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Box sx={paginationBoxSx}>
          <Pagination
            count={totalPages}
            page={currentPage}
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
});

export default ProductGallery;
