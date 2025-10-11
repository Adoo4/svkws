import { useMemo } from "react";
import Box from "@mui/material/Box";
import {
  Grid,
  Typography,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookCard from "../Components/Bookcard";
import BookCardSkeleton from "../Components/BookCardSkeleton";



const ProductGallery = ({
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
  setPage, // <- use this from parent
  wishlist,
  addToWishlist,
  removeFromWishlist,
}) => {
  const itemsPerPage = 20;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Safe fallback
  const safeBooks = useMemo(() => {
  // If the backend returns fewer than requested, show whatever is available
  if (!books || books.length === 0) return [];
  return books.slice(0, Math.min(books.length, 20)); // Option 1 logic
}, [books]);


  

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
        <Grid container spacing={1} justifyContent="center">
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
     {/* Book Grid */}
<Box sx={{ flexGrow: 1, width: "100%" }}>
  <Grid
    container
    spacing={{ xs: 1, sm: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
    justifyContent="center"
  >
    {!loading && safeBooks.length > 0 &&
      safeBooks.map((book) => (
        <Grid
          item
          xs={2}  // ✅ two per row on mobile
          sm={4}  // ✅ two per row on tablet
          md={3}  // ✅ four per row on desktop
          key={book._id}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
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
          />
        </Grid>
      ))}
  </Grid>
</Box>


      {/* Pagination */}
      {!loading && totalPages > 1 && (
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
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => {
              setPage(value);
              window.scrollTo({
                top: 0, // scroll to top
                behavior: "smooth", // optional smooth scroll
              });
            }}
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
