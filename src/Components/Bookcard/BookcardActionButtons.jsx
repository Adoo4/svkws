import { CardActions, Button, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { useMemo, useCallback } from "react";


import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const BookCardActionsBottom = ({
  book,
  inWishlist,
  isSignedIn,
  addToCart,
  isAdding,
  clerk,
}) => {
  const navigate = useNavigate();
 const outOfStock = useMemo(() => book.quantity <= 0, [book.quantity]);

const cartIcon = useMemo(() => 
  !outOfStock ? (
    <ShoppingCartIcon sx={{ fontSize: { xs: "0.9rem", sm: "1.2rem" } }} />
  ) : (
    <RemoveShoppingCartIcon />
  ),
  [outOfStock]
);


const handleDetailsClick = useCallback(() => {
  navigate(`/books/${book.slug}${window.location.search}`, {
    state: { book, category: book.subCategory },
  });
}, [book, navigate]);

const handleAddToCartClick = useCallback(() => {
  if (!isSignedIn) {
    clerk.openSignIn();
  } else {
    addToCart(book);
  }
}, [isSignedIn, clerk, addToCart, book]);

  return (
    <CardActions
      sx={{
        p: 1,
        mt: 1,
        display: { xs: "none", md: "flex" },
        flexDirection: { xs: "column", sm: "column", md: "row" },
        alignItems: "stretch",
        justifyContent: "center",
        gap: { xs: 0.5, sm: 1 },
        "& > :not(:first-of-type)": {
          ml: { xs: 0, sm: 0, md: 1, lg: 2 },
        },
      }}
    >
      {/* Detalji Button */}
      <Button
        variant="outlined"
        size="small"
     onClick={ handleDetailsClick}
        startIcon={
          <InfoOutlinedIcon
            sx={{ fontSize: { xs: "0.9rem", sm: "1.2rem" } }}
          />
        }
        sx={{
          flex: 1,
          px: { xs: 1, sm: 1.5 },
          borderRadius: "12px",
          textTransform: "none",
          borderColor: inWishlist ? "#f1f1f1" : "#262626",
          color: inWishlist ? "#f1f1f1" : "#262626",
          fontSize: { xs: "0.60rem", sm: "0.7rem" },
          "&:hover": { borderColor: "#f33600", color: "#f33600" },
        }}
      >
        Detalji
      </Button>

      {/* Add to Cart Button with Tooltip */}
      <Tooltip
        title={
          isSignedIn ? "" : "Morate biti prijavljeni da dodate knjige u korpu"
        }
        arrow
      >
        <Button
  variant="contained"
  disabled={isAdding || outOfStock}
  size="small"
  onClick={handleAddToCartClick}
  startIcon={cartIcon}
  sx={{
  flex: 1,
  px: { xs: 1, sm: 1.5 },
  fontSize: { xs: "0.60rem", sm: "0.7rem" },
  borderRadius: "12px",
  textTransform: "none",
  bgcolor: "#313131",
  color: "#fff",
  "&:hover": { bgcolor: "#d62d00" },
  boxShadow: "none",
}}
>
  Dodaj
</Button>

      </Tooltip>
    </CardActions>
  );
};

export default memo(BookCardActionsBottom);
