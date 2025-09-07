import  { useEffect } from "react";
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

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartMenu({ cart, setCart, cartMenu, setCartMenu }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("cart:", cart);
  }, [cart]);

  const round = (num, decimals = 2) =>
    Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;

  const list = () => (
    <Box
      sx={{
        width: { xs: 300, sm: 400, md: 450 },
        p: 2,
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
          p: 2,
          borderRadius: 2,
          backgroundColor: "transparent", // semi-transparent background
        }}
      >
        <Typography variant="h6" sx={{ color: "#f9f9f9", fontWeight: "bold" }}>
          Vaša korpa ({cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
          artikala)
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#444" }} />

      <List sx={{ mt: 1 }}>
        {cart.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: "center", color: "#aaa" }}>
            Vaša korpa je prazna
          </Typography>
        ) : (
          cart.map((book) => {
            const isDiscountValid =
              book.discount && new Date(book.discount.validUntil) > new Date();

            const price = isDiscountValid
              ? round(book.price * (1 - book.discount.amount / 100))
              : book.price;

            return (
              <ListItem
                key={book._id}
                alignItems="flex-start"
                disablePadding
                sx={{
                  background: "#2b2b2b",
                  alignItems:"center",
                  
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={book.coverImage}
                    alt={book.title}
                    sx={{
                      width: { xs: 80, sm: 100, md: 130 },
                      height: { xs: 100, sm: 130, md: 150 },
                      borderRadius: 2,
                      "& img": {
                        objectFit: "contain", // ensure image scales without cropping
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  />
                </ListItemAvatar>

                <ListItemText
                  sx={{ ml: 2, mr: 1 }}
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
                        justifyContent:"center",
                        gap: 0.5,
                        mt: 0.5,
                        
                      }}
                    >
                      {/* Author */}
                      <Typography variant="body2" color="#bbb" noWrap>
                        {book.author}
                      </Typography>

                      {/* Quantity */}
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
                          {book.quantity}
                        </Typography>
                      </Typography>

                      {/* Price Row */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{
                            color: isDiscountValid ? "#f33600" : "#f9f9f9",
                          }}
                        >
                          {(price * book.quantity).toFixed(2)} BAM
                        </Typography>

                        {isDiscountValid && (
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "#999",
                              fontWeight: "normal",
                              fontSize: "0.8rem",
                            }}
                          >
                            {(book.price * book.quantity).toFixed(2)} BAM
                          </Typography>
                        )}
                      </Box>
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
                  <IconButton
                    size="small"
                    onClick={() =>
                      setCart((prev) =>
                        prev.map((item) =>
                          item._id === book._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                      )
                    }
                    sx={{
                      color: "#4caf50",
                      "&:hover": { color: "#388e3c" },
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
                    {book.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() =>
                      setCart((prev) =>
                        prev
                          .map((item) =>
                            item._id === book._id
                              ? { ...item, quantity: item.quantity - 1 }
                              : item
                          )
                          .filter((item) => item.quantity > 0)
                      )
                    }
                    sx={{
                      color: "#f44336",
                      "&:hover": { color: "#d32f2f" },
                      mt: 0.5,
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })
        )}
      </List>

      <Divider sx={{ my: 2, borderColor: "#444" }} />

      {cart.length > 0 && (
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
            Total:{" "}
            {cart
              .reduce((sum, item) => {
                const isDiscountValid =
                  item.discount &&
                  new Date(item.discount.validUntil) > new Date();
                const price = isDiscountValid
                  ? item.price * (1 - item.discount.amount / 100)
                  : item.price;
                return sum + price * item.quantity;
              }, 0)
              .toFixed(2)}{" "}
            BAM
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
  onClick={() => {
    navigate("/checkout"); // navigate first
    setCartMenu(false);    // then close the drawer
  }}
>
  ZAVRŠI KUPOVINU
</Button>

{/* Clear Cart */}
<Button
  onClick={() => {
    setCart([]);       // clear cart
    setCartMenu(false); // close drawer
  }}
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
  Isprazni
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
