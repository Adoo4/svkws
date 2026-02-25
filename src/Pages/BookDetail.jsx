import { useParams } from "react-router-dom";
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
  Tooltip,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios"; // ← FIX 2 (see below)
import {
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  MenuBook as MenuBookIcon,
  Language as LanguageIcon,
  CalendarToday as CalendarTodayIcon,
  PeopleAlt as PeopleAltIcon,
  LocalLibrary as LocalLibraryIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  AspectRatio as AspectRatioIcon,
} from "@mui/icons-material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import RelatedBooks from "../Components/RelatedBooks";
import ShareButton from "../Components/ShareButton";
import { useSnackbar } from "notistack";
import { useUser } from "@clerk/clerk-react";
import { useWishlist } from "../Utils.js/useWishlist";
import useCart from "../Utils.js/useCart";

import SEO from "../Utils.js/SEO";
import useBookBySlug from "../Utils.js/useBookBySlug";
import { getImageUrl, getImageSrcSet, toHttpsUrl } from "../Utils.js/imageUrl";
import {
  localBusinessJsonLd,
  organizationJsonLd,
} from "../Utils.js/seoBusinessData";

export default function BookDetail() {
  const { slug } = useParams();
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
  const canonicalBookUrl = `${window.location.origin}/books/${slug}`;

  const { data: book, isLoading } = useBookBySlug(!isObjectId ? slug : null);

  // Scroll to top on component mount
  useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}, [slug, ])

  // Redirect old ID URLs → slug
  useEffect(() => {
    if (isObjectId) {
      axios
        .get(`https://backendsvkwbshp.onrender.com/api/books/redirect/${slug}`)
        .then((res) => {
          if (res.data?.url) window.location.replace(res.data.url);
        })
        .catch(() => {});
    }
  }, [slug, isObjectId]);

  const { cart, addToCart: addToCartFromHook } = useCart();
  const { isSignedIn } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isLoading: wishlistLoading,
  } = useWishlist();

  if (!book) return null;
  const bookCover = getImageUrl(book.coverImage, { width: 420 }) || "/fallback-cover.jpg";
  const bookCoverSrcSet = getImageSrcSet(book.coverImage, [240, 360, 480, 640, 800]);
  const seoImage = toHttpsUrl(book.coverImage) || "/og-image.png";

  const LOW_STOCK_THRESHOLD = 5;

const stockState =
  book.onlineQuantity === 0
    ? "none"
    : book.onlineQuantity <= LOW_STOCK_THRESHOLD
    ? "low"
    : "ok";

  const finalPrice =
    book.discountAmount > 0
      ? book.discountedPrice // already calculated on backend
      : book.mpc; // use MPC as fallback

  // JSON-LD structured data for the book
  const jsonLdBook = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: book.author,
    isbn: book.isbn,
    image: seoImage,
    publisher: book.publisher,
    datePublished: book.publicationYear,
    numberOfPages: book.pages,
    inLanguage: book.language,
    offers: {
      "@type": "Offer",
      price: finalPrice, // now using MPC/discountedPrice
      priceCurrency: "BAM",
      availability:
        book.onlineQuantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  // Breadcrumb JSON-LD for SEO
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${window.location.origin}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Books",
        item: `${window.location.origin}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: canonicalBookUrl,
      },
    ],
  };

  const handleAddToCart = () => {
    const cartItem = cart.items.find((i) => i.book._id === book._id);
    const cartQuantity = cartItem?.quantity || 0;

    if (cartQuantity + 1 > book.onlineQuantity) {
      enqueueSnackbar(
        `Ne možete dodati više od ${book.onlineQuantity} primjeraka u korpu`,
        { variant: "warning" },
      );
      return;
    }

    addToCartFromHook(book);
    enqueueSnackbar(`Dodano u korpu: ${book.title}`, { variant: "success" });
  };

  return (
    <>
      {/* SEO Component */}
      <SEO
        title={`${book.title} - ${book.author} | MyBookStore`}
        description={`${book.title} od ${book.author}, ${book.pages} stranica, ${book.language}. Kupite online po najboljim cijenama!`}
        url={canonicalBookUrl}
        ogImage={seoImage}
        type="book"
        jsonLd={[organizationJsonLd, localBusinessJsonLd, jsonLdBook, jsonLdBreadcrumb]}
      />

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
         background: "linear-gradient(360deg,#313131 0%, rgba(38, 38, 38, 1) 50%, rgb(0, 0, 0) 100%)",
          p: { xs: 2, md: 4 },
        }}
      >
        {isLoading ? (
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
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{ width: { xs: "100%", md: 350 } }}
            />
            <CardContent sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
              <Skeleton variant="text" sx={{ width: "60%", height: 40 }} />
              <Skeleton variant="text" sx={{ width: "40%", height: 30 }} />
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: 200, mt: 2 }}
              />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={6} md={4} key={i}>
                    <Skeleton
                      variant="text"
                      sx={{ width: "100%", height: 20 }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: 50, mt: 2 }}
              />
            </CardContent>
          </Card>
        ) : (
          <Card
            sx={{
              maxWidth: 1100,
              mt: "4rem",
              mx: "auto",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: "20px",
              overflow: "hidden",
              bgcolor: "transparent",
              color: "#f9f9f9",
            }}
            elevation={0}
          >
            {/* Cover */}
            <CardMedia
              component="img"
              image={bookCover}
              srcSet={bookCoverSrcSet}
              sizes="(max-width: 900px) 92vw, 350px"
              alt={`Cover of "${book.title}" by ${book.author}`}
              loading="eager"
              fetchpriority="high"
              imgProps={{ width: 350, height: 500, decoding: "async" }}
              sx={{
                width: { xs: "100%", md: 350 },
                height: { xs: 500, md: "auto" },
                objectFit: "contain",
                borderRight: { md: "1px solid #444" },
                borderBottom: { xs: "1px solid #444", md: "none" },
              }}
            />

            {/* Book Content */}
            <CardContent sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
              {/* Title & Chips */}
            <Box
  display="flex"
  flexDirection="column"
 
  alignItems="start"
  gap={1.5}
  flexWrap="wrap"
  mb={2}    
  
>
  <Typography
    variant="h5"
    fontWeight="bold"
    sx={{  fontSize: { xs: "1.3rem", md: "2rem" } }}
  >
    {book.title}
  </Typography>
<Box display="flex" gap={1} flexWrap="wrap" sx={{ mt: 1 }}>
  {/* Common chip style */}
  {book.isNew && (
  <Chip
    label="Novo"
    size="small"
    variant="outlined"
    sx={{
      borderColor: "green",
      color: "green",
      fontWeight: "bold",
      fontSize: "0.75rem",
      height: 26,
      px: 1.5,
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    }}
  />
)}

{book.discountAmount > 0 && (
  <Chip
    label={`${book.discountAmount}% Sniženje`}
    size="small"
    variant="outlined"
    sx={{
      borderColor: "red",
      color: "red",
      fontWeight: "bold",
      fontSize: "0.75rem",
      height: 26,
      px: 1.5,
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    }}
  />
)}

<Chip
  label={
    stockState === "ok"
      ? "Dostupno"
      : stockState === "low"
        ? "Niske zalihe"
        : "Nema na stanju"
  }
  size="small"
  variant="outlined"
  sx={{
    height: 26,
    fontSize: "0.75rem",
    fontWeight: 600,
    color:
      stockState === "ok"
        ? "success.main"
        : stockState === "low"
          ? "warning.main"
          : "error.main",
    borderColor:
      stockState === "ok"
        ? "success.main"
        : stockState === "low"
          ? "warning.main"
          : "error.main",
    px: 1.5,
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
  }}
/>
</Box>


                
               

              </Box>
 <ShareButton />
              {/* Author */}
              <Typography
                variant="subtitle1"
                sx={{ marginTop: 3, fontSize: { xs: "0.9rem", md: "1rem" }, color: "#ccc" }}
              >
                Autor: {book.author}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  mb: 3,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  color: "#ddd",
                }}
              >
                {book.description}
              </Typography>

              <Divider sx={{ my: 2, borderColor: "#444" }} />

              {/* Info Grid */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* Format, Language, Year, Publisher, Pages, ISBN, TR, Barcode, Dimensions */}
                {[
                  { icon: MenuBookIcon, label: "Uvez", value: book.format },
                  { icon: LanguageIcon, label: "Jezik", value: book.language },
                  {
                    icon: CalendarTodayIcon,
                    label: "Godina izdanja",
                    value: book.publicationYear,
                  },
                  {
                    icon: PeopleAltIcon,
                    label: "Izdavač",
                    value: book.publisher,
                  },
                  {
                    icon: LocalLibraryIcon,
                    label: "Stranica",
                    value: book.pages,
                  },
                  {
                    icon: ConfirmationNumberIcon,
                    label: "ISBN",
                    value: book.isbn,
                  },
                  { icon: LocalOfferIcon, label: "TR", value: book.TR },
                  {
                    icon: ConfirmationNumberIcon,
                    label: "Barcode",
                    value: book.barcode,
                  },
                  {
                    icon: AspectRatioIcon,
                    label: "Dimenzije",
                    value: book.dimensions,
                  },
                ].map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    key={index}
                  >
                    <item.icon sx={{ color: "#505050" }} />

                    <Typography variant="body2" sx={{ color: "#9c9c9c" }}>
                      {item.label}: {item.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {/* Price & Actions */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                gap={2}
                mt={2}
              >
                <Box display="flex" gap={1} alignItems="center">
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#f33600",
                      fontSize: { xs: "1.2rem", md: "1.5rem" },
                    }}
                  >
                    {finalPrice.toFixed(2)} KM
                  </Typography>
                  {book.discountAmount > 0 && (
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "#999",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      {book.mpc?.toFixed(2)} KM
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
                    disabled={!isSignedIn || wishlistLoading}
                    onClick={() => {
                      const alreadyInWishlist = wishlist.some(
                        (b) => b._id === book._id,
                      );
                      if (alreadyInWishlist) removeFromWishlist(book._id);
                      else addToWishlist(book);
                    }}
                  >
                    {wishlist.some((b) => b._id === book._id)
                      ? "Ukloni iz liste želja"
                      : "Dodaj u listu želja"}
                  </Button>

                  <Tooltip
                    title={
                      !isSignedIn
                        ? "Morate biti prijavljeni"
                        : stockState === "none"
                          ? "Trenutno nema dostupnih primjeraka"
                          : ""
                    }
                    arrow
                  >
                    <span>
                      <Button
                        variant="contained"
                        startIcon={
                          stockState !== "none" ? (
                            <ShoppingCartIcon />
                          ) : (
                            <NotInterestedIcon />
                          )
                        }
                        disabled={!isSignedIn || stockState === "none"}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          fontSize: { xs: "0.60rem", sm: "0.7rem" },
                          bgcolor:
                            stockState === "ok"
                              ? "#f33600"
                              : stockState === "low"
                                ? "#ff9800"
                                : "#888",
                          "&:hover": {
                            bgcolor:
                              stockState === "ok"
                                ? "#d62d00"
                                : stockState === "low"
                                  ? "#fb8c00"
                                  : "#888",
                          },
                        }}
                        onClick={handleAddToCart}
                      >
                        {stockState === "ok"
                          ? "Dodaj u korpu"
                          : stockState === "low"
                            ? "Požuri – malo je ostalo "
                            : "Nema na stanju"}
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Related Books */}
        <Divider sx={{ my: 4, borderColor: "#444" }} />
        <Typography
          variant="subtitle1"
          mb={2}
          sx={{ color: "#ccc", textAlign: "center" }}
        >
          Možda će vam se i ovo svidjeti
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <RelatedBooks book={book} />
        </Box>
      </Box>
    </>
  );
}
