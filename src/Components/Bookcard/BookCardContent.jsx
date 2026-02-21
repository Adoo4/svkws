// React
import React, { memo, useMemo } from "react";

// MUI components (direct imports)
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";



// Local components/utilities
import WishlistButton from "./WishlistButton";



/* =========================
   STYLE CONSTANTS
========================= */
const cardContentSx = { p: 0, minHeight: { xs: "5rem", sm: "7rem" }, alignItems: "space-between" };
const titleSx = (inWishlist) => ({
  fontWeight: 600,
  color: inWishlist ? "#f1f1f1" : "#262626",
  mb: 0.6,
  lineHeight: { xs: 1.3, sm: 1.2 },
  fontSize: { xs: "0.88rem", sm: "0.88rem", md: "0.95rem" },
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  minHeight: "1.7rem",
});
const authorSx = { display: "block", fontSize: { xs: "0.65rem", md: "0.75rem" }, color: "#555", fontWeight: 500, mb: 0.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const rowSx = { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", mt: 0.5 };
const quantityChipSx = { fontSize: "0.70rem", height: 18, px: 0.5 };

const smCategoryWrapperSx = { display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.2, color: "white", flexWrap: "wrap" };
const smCategoryTextSx = (inWishlist) => ({ fontWeight: 400, fontSize: "0.6rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: inWishlist ? "#f1f1f1" : "#262626" });
const descriptionSx = (inWishlist) => ({
  color: inWishlist ? "#f1f1f1" : "#262626",
  fontWeight: 500,
  fontSize: { xs: "0.60rem", md: "0.75rem" },
  fontStyle: "italic",
  lineHeight: 1.3,
  display: { xs: "none", md: "-webkit-box" },
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
});
const priceBoxSx = { mt: 1 };
const discountedPriceSx = { fontWeight: 700, color: "error.main", fontSize: { xs: "0.95rem", sm: "1.1rem" } };
const originalPriceSx = { textDecoration: "line-through", color: "text.disabled", fontSize: { xs: "0.75rem", sm: "0.85rem" } };
const pdvSx = { fontSize: "0.65rem", color: "text.secondary" };
const normalPriceSx = { fontWeight: "bold", color: "text.primary", fontSize: { xs: "0.8rem", sm: "1rem" } };

const BookCardContent = memo(({
  book,
  inWishlist,
  categoryMatch,
  mainCategory,
  hasDiscount,
  handleWishlistClick,
  openDetails,
}) => {
  const displayPrice = useMemo(() => hasDiscount ? book.discountedPrice : book.mpc, [hasDiscount, book]);

 

  return (
    <CardContent sx={cardContentSx}>
      <Typography variant="subtitle2" sx={titleSx(inWishlist)}>
        {book?.title}
      </Typography>

      <Typography sx={authorSx}>{book.author}</Typography>

      <Box sx={rowSx}>
        <Box sx={{ display: "flex", gap: 0.5 }}></Box>
      </Box>

      <Box sx={{ mb: 0.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {book.onlineQuantity === 0 && <Chip label="Nema na stanju" color="error" size="small" sx={quantityChipSx} />}
        {book.onlineQuantity > 0 && book.onlineQuantity <= 5 && <Chip label={`Samo ${book.onlineQuantity} na stanju`} color="warning" size="small" sx={quantityChipSx} />}
        {book.onlineQuantity > 5 && <Chip label="Ima na stanju" color="success" size="small" sx={quantityChipSx} />}

        <WishlistButton inWishlist={inWishlist} handleWishlistClick={handleWishlistClick} openDetails={openDetails} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", width: "100%", gap: 0.5 }}>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", alignItems: "center", maxWidth: { xs: "70%", sm: "80%", md: "85%" }, overflow: "hidden" }}>
          {book.subCategory && (
  <Typography
    sx={{
      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.8rem" },
      color: categoryMatch?.boja,
      mb: 0.4,
      fontWeight: 600,
      lineHeight: 1.2,
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
      whiteSpace: "normal",
    }}
    title={book.subCategory}
  >
    {book.subCategory}
  </Typography>
)}

          {mainCategory && (
            <Box sx={smCategoryWrapperSx}>
              <Box sx={{ color: mainCategory.boja, display: "flex", alignItems: "center" }}>{mainCategory.ikona}</Box>
              <Box sx={{ display: "flex", gap: 0.25, flexWrap: "nowrap", overflow: "hidden" }}>
                {book.subCategory && <Typography component="span" sx={smCategoryTextSx(inWishlist)}>{book.subCategory}</Typography>}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Typography sx={descriptionSx(inWishlist)}>{book.description}</Typography>

      <Box sx={priceBoxSx}>
        {hasDiscount ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <Typography sx={discountedPriceSx}>{displayPrice.toFixed(2)} KM</Typography>
              <Typography sx={originalPriceSx}>{book.mpc.toFixed(2)} KM</Typography>
            </Box>
            <Typography sx={pdvSx}>*PDV uključen u cijenu</Typography>
          </Box>
        ) : (
          <Box>
            <Typography sx={normalPriceSx}>{displayPrice.toFixed(2)} KM</Typography>
            <Typography sx={pdvSx}>*PDV uključen u cijenu</Typography>
          </Box>
        )}
      </Box>
    </CardContent>
  );
});

export default BookCardContent;
