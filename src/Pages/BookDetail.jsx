
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RelatedBooks from "../Components/RelatedBooks";
import { round } from "../Utils.js/round";
import { useUser } from "@clerk/clerk-react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Tooltip from "@mui/material/Tooltip";
import { useSnackbar } from "notistack";
import {
  getWishlist,
  
  
} from "../Utils.js/wishlist"; 


export default function BookDetail({cart, setCartMenu,  wishlist, setWishlist,  addToCart, updateCartItem, removeFromWishlist, addToWishlist}) {
  const { id } = useParams(); // book id from route
  const location = useLocation();
  const { book: initialBook } = location.state || {};
  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(true);
   const { isSignedIn } = useUser();
    const { enqueueSnackbar } = useSnackbar();
/* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
  if (!wishlist || wishlist.length === 0) {
    const storedWishlist = getWishlist();
    setWishlist(storedWishlist);
  }
}, []); // empty dependency array
/* eslint-enable react-hooks/exhaustive-deps */
useEffect(() => {
  setBook(null); // reset state
   window.scrollTo(0, 0); // scroll to top
  axios
    .get(`https://backendsvkwbshp.onrender.com/api/books/${id}`)
    .then((res) => {setBook(res.data); setLoading(false)})
    .catch((err) => console.error("Book fetch error:", err));
}, [id]);

 

  return (
     <Box sx={{ width: "100%", minHeight: "100vh", background: "#313131", p: { xs: 2, md: 4 } }}>
      {loading ? (
        // Skeleton while loading
           <Card
      sx={{
        maxWidth: 1100,
        mt: "4rem",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "#313131",
      }}
    >
      {/* Cover Skeleton */}
      <Skeleton
        variant="rectangular"
        height={500}
        sx={{ width: { xs: "100%", md: 350 } }}
      />

      <CardContent sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
        {/* Title & Author */}
        <Skeleton variant="text" sx={{ width: "60%", height: 40 }} />
        <Skeleton variant="text" sx={{ width: "40%", height: 30 }} />

        {/* Description */}
        <Skeleton variant="rectangular" sx={{ width: "100%", height: 200, mt: 2 }} />

        {/* Info Grid */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={6} md={4} key={i}>
              <Skeleton variant="text" sx={{ width: "100%", height: 20 }} />
            </Grid>
          ))}
        </Grid>

        {/* Add to Cart / Wishlist Skeleton */}
        <Skeleton variant="rectangular" sx={{ width: "100%", height: 50, mt: 2 }} />
      </CardContent>
    </Card>
      ) : (
        <>
          {/* Real Book Content */}
        { book&& <Card
            sx={{
              maxWidth: 1100,
              mt: "4rem",
              mx: "auto",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: "20px",
              overflow: "hidden",
              bgcolor: "#313131",
              color: "#f9f9f9",
            }}
            elevation={0}
          >
            <CardMedia
              component="img"
              image={book?.coverImage}
              alt={book?.title}
              sx={{
                width: { xs: "100%", md: 350 },
                height: { xs: 500, md: "auto" },
                objectFit: "contain",
                borderRight: { md: "1px solid #444" },
                borderBottom: { xs: "1px solid #444", md: "none" },
              }}
            />
            <CardContent sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
              {/* Title & Chip */}
              <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
                <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: "1.3rem", md: "2rem" }, color: "#f9f9f9" }}>
                  {book.title}
                </Typography>
                {book.isNew && <Chip label="Novo" sx={{ bgcolor: "green", color: "#fff", fontWeight: "bold" }} />}
              </Box>

              {/* Author */}
              <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, color: "#ccc" }}>
                Autor: {book.author}
              </Typography>

              {/* Description */}
              <Typography variant="body2" sx={{ mb: 3, fontSize: { xs: "0.75rem", md: "0.85rem" }, color: "#ddd" }}>
                {book.description}
              </Typography>

              <Divider sx={{ my: 2, borderColor: "#444" }} />

              {/* Info Grid */}
<Grid container spacing={3} sx={{ mb: 3 }}>
  <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
    <MenuBookIcon sx={{ color: "#f9f9f9" }} />
    <Typography variant="body2">Format: {book.format}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
    <LanguageIcon sx={{ color: "#f9f9f9" }} />
    <Typography variant="body2">Jezik: {book.language}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
    <CalendarTodayIcon sx={{ color: "#f9f9f9" }} />
    <Typography variant="body2">Godina izdanja: {book.publicationYear}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
    <PeopleAltIcon sx={{ color: "#f9f9f9" }} />
    <Typography variant="body2">Izdavač: {book.publisher}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
    <LocalLibraryIcon sx={{ color: "#f9f9f9" }} />
    <Typography variant="body2">Stranica: {book.pages}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
    <ConfirmationNumberIcon sx={{ color: "#f9f9f9" }} />
    <Typography variant="body2">ISBN: {book.isbn}</Typography>
  </Grid>
</Grid>



              {/* Price & Actions */}
              <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" gap={2} mt={4}>
               <Box display="flex" gap={1} alignItems="center">
  <Typography
    sx={{
      fontWeight: "bold",
      color: "#f33600",
      fontSize: { xs: "1.2rem", md: "1.5rem" },
    }}
  >
    {book.discount?.amount > 0
  ? round(book.price * (1 - book.discount.amount / 100)).toFixed(2)
  : book.price.toFixed(2)} KM
    
  </Typography>

  {book.discount?.amount > 0 && (
    <Typography
      sx={{
        textDecoration: "line-through",
        color: "#999",
        fontSize: { xs: "0.9rem", md: "1rem" },
      }}
    >
      {book.price.toFixed(2)} KM
    </Typography>
  )}
</Box>

                <Box display="flex" gap={2} flexWrap="wrap">
      <Button
  variant="outlined"
  startIcon={<FavoriteBorderIcon />}
  sx={{
    borderRadius: "12px",
    textTransform: "none",
    flex: { xs: 1, sm: "unset" },
    borderColor: "#f9f9f9",
    color: "#f9f9f9",
    fontSize: { xs: "0.60rem", sm: "0.7rem" },
    "&:hover": { borderColor: "#f33600", color: "#f33600" },
  }}
  fullWidth
  disabled={!isSignedIn}
  onClick={() => {
    if (!book) return;

    const alreadyInWishlist = wishlist.some((b) => b._id === book._id);

    if (alreadyInWishlist) {
      removeFromWishlist(book._id);
      enqueueSnackbar(`${book.title} uklonjeno iz liste želja`, { variant: "info" });
    } else {
      addToWishlist(book);
      enqueueSnackbar(`${book.title} dodano u listu želja`, { variant: "success" });
    }
  }}
>
  {wishlist.some((b) => b._id === book._id) ? "Ukloni iz liste želja" : "Dodaj u listu želja"}
</Button>



      {/* Cart button */}
      <Tooltip
        title={!isSignedIn ? "Morate biti prijavljeni da biste kupili knjige" : ""}
        arrow
      >
        <span>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              flex: { xs: 1, sm: "unset" },
              fontSize: { xs: "0.60rem", sm: "0.7rem" },
              bgcolor: "#f33600",
              "&:hover": { bgcolor: "#d62d00" },
            }}
            fullWidth
           onClick={() => {
    addToCart(book);   // ✅ pass book directly
    enqueueSnackbar(`Dodano u korpu: ${book.title}`, { variant: "success" });
  }}
            disabled={!isSignedIn}
          >
            Dodaj u korpu
          </Button>
  </span>
</Tooltip>
    </Box>
              </Box>
            </CardContent>
          </Card>}
          
<Divider sx={{ my: 2, borderColor: "#444" }} />
<Typography
        variant="subtitle1"
        mb={2}
        sx={{ color: "#ccc",  display:"flex", justifyContent:"center" }}
      >
        Možda će vam se i ovo svidjeti
      </Typography>
          {/* Related Books Section */}
         {book && (
  <Box mt={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
    <RelatedBooks book={book} />
  </Box>
)}
        </>
      )}
     
    </Box>
  );
}
