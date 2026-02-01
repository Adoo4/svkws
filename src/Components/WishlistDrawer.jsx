import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Drawer,
  Button,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Utils.js/useWishlist";

const WishlistDrawer = ({ open, onClose, addToCart }) => {
  const { wishlist, isLoading, removeFromWishlist, clearWishlist } =
    useWishlist();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleRemove = useCallback(
    (bookId) => {
      removeFromWishlist(bookId);
      enqueueSnackbar("Knjiga je uklonjena iz liste želja", {
        variant: "info",
      });
    },
    [removeFromWishlist, enqueueSnackbar],
  );

  const handleAddToCart = useCallback(
    (book) => {
      addToCart(book);
      enqueueSnackbar("Knjiga je dodana u korpu", { variant: "success" });
    },
    [addToCart, enqueueSnackbar],
  );

  const handleClearWishlist = useCallback(() => {
    clearWishlist();
    enqueueSnackbar("Lista želja ispražnjena", { variant: "info" });
  }, [clearWishlist, enqueueSnackbar]);

  const bookList = useMemo(() => {
    if (!wishlist.length) {
      return (
        <Typography sx={{ p: 2, textAlign: "center", color: "#aaa" }}>
          Lista želja je prazna.
        </Typography>
      );
    }

    return (
      <List sx={{ mt: 1 }}>
        {wishlist.map((book) => {
          const hasDiscount = book.discountAmount > 0;

          return (
            <ListItem
              key={book._id}
              alignItems="flex-start"
              disablePadding
              sx={{
                mb: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                "&:hover": { backgroundColor: "#333" },
                mr: 1,
              }}
            >
              {/* Book Image */}
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={book.coverImage}
                  alt={book.title}
                  onClick={() => {
                    navigate(`/books/${book.slug}${window.location.search}`, {
                      state: { book, category: book.subCategory },
                    });
                  }}
                  sx={{
                    width: { xs: 80, sm: 100, md: 130 },
                    height: { xs: 100, sm: 130, md: 150 },
                    borderRadius: 2,
                    "& img": {
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    },
                    cursor: "pointer",
                  }}
                />
              </ListItemAvatar>

              {/* Book Info */}
              <ListItemText
                sx={{ ml: 2, mr: 1 }}
                primaryTypographyProps={{ component: "div" }}
                secondaryTypographyProps={{ component: "div" }}
                primary={
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {book.title}
                  </Typography>
                }
                secondary={
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                  >
                    <Typography variant="body2" color="#bbb" noWrap>
                      {book.author || ""}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="#fff"
                        fontWeight="bold"
                      >
                        {book.discountedPrice.toFixed(2)} KM
                      </Typography>

                      {hasDiscount && (
                        <Typography
                          variant="body2"
                          sx={{ color: "#bbb", textDecoration: "line-through" }}
                        >
                          {book.mpc.toFixed(2)} KM
                        </Typography>
                      )}

                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            book.quantity === 0
                              ? "#f44336"
                              : book.onlineQuantity === 0
                                ? "#ff9800"
                                : "#4caf50",
                        }}
                      >
                        {book.quantity === 0 && "Nema na lageru"}

                        {book.quantity > 0 &&
                          book.onlineQuantity === 0 &&
                          "Dostupno u knjižari (Upit)"}

                        {book.onlineQuantity > 0 &&
                          `Dostupno online: ${book.onlineQuantity}`}
                      </Typography>
                    </Box>
                  </Box>
                }
              />

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: 1,
                  gap: 1.5,
                }}
              >
                <Tooltip title="Izbriši iz liste" arrow>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(book._id)}
                    sx={{
                      color: "#f44336",
                      bgcolor: "#2b2b2b",
                      "&:hover": { color: "#fff", bgcolor: "#d32f2f" },
                      borderRadius: 1.25,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    book.quantity === 0
                      ? "Knjiga trenutno nije na stanju"
                      : book.onlineQuantity === 0
                        ? "Knjiga nije dostupna online – pošaljite upit knjižari"
                        : "Prebaci ovu knjigu u korpu"
                  }
                  arrow
                >
                  <span>
                    <IconButton
                      size="small"
                      disabled={book.onlineQuantity === 0}
                      onClick={() => handleAddToCart(book)}
                      sx={{
                        color: "#fff",
                        bgcolor: "#313131",
                        "&:hover": {
                          bgcolor:
                            book.onlineQuantity > 0 ? "#388e3c" : "#313131",
                        },
                        borderRadius: 1.25,
                        opacity: book.onlineQuantity === 0 ? 0.5 : 1,
                        cursor:
                          book.onlineQuantity === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </ListItem>
          );
        })}
      </List>
    );
  }, [wishlist, navigate, handleAddToCart, handleRemove]);

  if (isLoading) {
    return (
      <Box sx={{ p: 2, color: "#fff", textAlign: "center" }}>Loading...</Box>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1f1f1f",
          color: "#f9f9f9",
          width: { xs: 300, sm: 400, md: 450 },
        },
      }}
    >
      <Box sx={{ width: "100%", p: 1, height: "100%", overflowY: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            p: 1,
            mt: { xs: 5, md: 8 },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Moja lista želja ({wishlist.length})
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#f9f9f9" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#444" }} />

        {bookList}

        {/* Clear Wishlist */}
        {wishlist.length > 0 && (
          <Box sx={{ p: 3 }}>
            <Tooltip title="Obriši sve artikle iz liste želja" arrow>
              <Button
                onClick={handleClearWishlist}
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  borderColor: "#fff",
                  color: "#fff",
                  py: 1.2,
                  fontWeight: 400,
                  "&:hover": { borderColor: "#d62d00", color: "#d62d00" },
                }}
              >
                Isprazni Listu
              </Button>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

WishlistDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default WishlistDrawer;
