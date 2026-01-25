import { useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // add this at the top
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export default function CartMenu({
  cart,
  cartMenu,
  setCartMenu,
  updateCartItem,
  removeCartItem,
  clearCart,
}) {
  const navigate = useNavigate();
  const totalItems = useMemo(
    () => cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
    [cart],
  );

  const { enqueueSnackbar } = useSnackbar(); // initialize snackbar

  const handleClearCart = () => {
    clearCart(); // your function to empty the cart
    enqueueSnackbar("Korpa ispražnjena", { variant: "info" });
  };

  const list = () => (
    <Box
      sx={{
        width: { xs: 300, sm: 400, md: 450 },
        p: 1,
        background: "#1f1f1f",
        height: "100%",
        overflowY: "auto",
      }}
      role="presentation"
      onKeyDown={() => setCartMenu(false)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          p: 1,
          borderRadius: 2,
          backgroundColor: "transparent", // semi-transparent background
          mt: {xs:5, md:8},
        }}
      >
        <Typography variant="h6" sx={{ color: "#f9f9f9", fontWeight: "bold" }}>
          Vaša korpa ({totalItems} artikala)
        </Typography>
        <IconButton
          onClick={() => setCartMenu(false)}
          sx={{ color: "#f9f9f9" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "#444" }} />

      <List sx={{ mt: 1 }}>
        {!cart?.items || cart?.items.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: "center", color: "#aaa" }}>
            Vaša korpa je prazna
          </Typography>
        ) : (
          cart?.items.map(({ book, quantity, itemTotal }) => {
            const hasDiscount =
              book.discount?.amount > 0 &&
              book.discountedPrice < book.priceWithVAT;

            return (
              <ListItem
                key={book._id}
                alignItems="flex-start"
                disablePadding
                sx={{ mb: 2, borderRadius: 2 }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={book.coverImage}
                    alt={book.title}
                     onClick={() => {
  const search = typeof window !== "undefined" ? window.location.search : "";
  navigate(`/books/${book.slug}${search}`, {
    state: { book, category: book.subCategory },
  });
}}
                    sx={{
                      width: { xs: 80, sm: 100, md: 130 },
                      height: { xs: 100, sm: 130, md: 150 },
                      borderRadius: 2,
                      "& img": { objectFit: "contain" },
                    }}
                  />
                </ListItemAvatar>

                <ListItemText
                  sx={{ ml: 1, mr: 1 }}
                    primaryTypographyProps={{ component: "div" }}
  secondaryTypographyProps={{ component: "div" }}
                  primary={
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      noWrap
                      sx={{ color: "#f9f9f9" }}
                    >
                      {book.title}
                    </Typography>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <Typography variant="body2" color="#bbb" noWrap>
                        {book.author}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#aaa", fontWeight: 500 }}
                      >
                        Količina:{" "}
                        <Typography
                          component="span"
                          fontWeight="bold"
                          color="#f9f9f9"
                        >
                          {quantity}
                        </Typography>
                      </Typography>
                      {book.quantity > 0 && book.quantity <= 5 && (
                        <Typography
                          sx={{ color: "#ff9800", fontSize: "0.75rem" }}
                        >
                          Samo {book.quantity} na stanju!
                        </Typography>
                      )}

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ color: hasDiscount ? "#4caf50" : "#f9f9f9" }}
                        >
                          {book.discountedPrice.toFixed(2)} BAM
                        </Typography>

                        {hasDiscount && (
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "#ff0000ff",
                              fontSize: "0.8rem",
                            }}
                          >
                            {book.priceWithVAT.toFixed(2)} BAM
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 0.5,
                        }}
                      >
                        <Box component="span" sx={{ color: "#666" }}>
                          Ukupno:
                        </Box>
                        <Box
                          component="span"
                          sx={{ color: "#f33600", fontWeight: 600 }}
                        >
                          {itemTotal.toFixed(2)} BAM
                        </Box>
                      </Typography>
                    </Box>
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      ml: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      disabled={quantity >= book.quantity} // visually disables button
                      onClick={() => {
                        // ⚠️ Logical check: do nothing if quantity >= stock
                        if (quantity >= book.quantity) return;

                        // Only update cart if we are below stock
                        updateCartItem(book._id, quantity + 1);

                        enqueueSnackbar(`Povećana količina: ${book.title}`, {
                          variant: "success",
                        });
                      }}
                      sx={{
                        color: quantity >= book.quantity ? "#666" : "#515151",
                        background: "#282828",
                        cursor:
                          quantity >= book.quantity ? "not-allowed" : "pointer",
                        "&:hover": {
                          color: quantity >= book.quantity ? "#666" : "#388e3c",
                        },
                        mb: 0.5,
                      }}
                    >
                      <AddIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        color: "#f9f9f9",
                        fontWeight: "bold",
                        minWidth: 24,
                        textAlign: "center",
                      }}
                    >
                      {quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => {
                        if (quantity === 1) {
                          removeCartItem(book._id);
                          enqueueSnackbar(`Knjiga uklonjena: ${book.title}`, {
                            variant: "warning",
                          });
                        } else {
                          updateCartItem(book._id, quantity - 1);
                          enqueueSnackbar(`Smanjena količina: ${book.title}`, {
                            variant: "info",
                          });
                        }
                      }}
                      sx={{
                        color: "#414141",
                        "&:hover": { color: "#d32f2f" },
                        mt: 0.5,
                        background: "#282828",
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            );
          })
        )}
      </List>

      {cart?.items?.length > 0 && (
        <Box
          sx={{
            p: 3,
            borderRadius: 3,

            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Total */}
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#f9f9f9",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Total: {cart.totalCart.toFixed(2)} BAM
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            {/* Checkout */}

            <Button
              startIcon={<ShoppingCartIcon />}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontSize: { xs: "0.70rem", sm: "0.70rem" },
                bgcolor: "#f33600",
                color: "#fff",
                py: 1.2,
                fontWeight: 400,
                "&:hover": {
                  bgcolor: "#d62d00",
                },
              }}
              disabled={!cart?.items?.length}
              onClick={() => {
                if (!cart?.items?.length) return;
                navigate("/checkout");
                setCartMenu(false);
              }}
            >
              ZAVRŠI KUPOVINU
            </Button>

            {/* Clear Cart */}
            <Button
              onClick={handleClearCart}
              disabled={!cart?.items?.length}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                borderColor: "white",
                color: "white",
                py: 1.2,
                fontWeight: 400,
                "&:hover": {
                  borderColor: "#d62d00",
                  color: "#d62d00",
                },
              }}
            >
              Isprazni Korpu
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={cartMenu}
      onClose={() => setCartMenu(false)}
      PaperProps={{
        sx: {
          backgroundColor: "#1f1f1f",
          color: "#f9f9f9",
          width: { xs: 300, sm: 400, md: 450 },
        },
      }}
    >
      {list()}
    </Drawer>
  );
}
