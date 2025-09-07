// CheckoutPage.jsx
// CheckoutPage.jsx
import  { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useAuth } from "@clerk/clerk-react";

export default function CheckoutPage({ cart, setCart }) {
  const { user } = useAuth();
  const [shipping, setShipping] = useState({
    fullName: user?.firstName + " " + user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(()=>  window.scrollTo(0, 0))

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => {
    const isDiscountValid =
      item.discount && new Date(item.discount.validUntil) > new Date();
    const price = isDiscountValid
      ? item.price * (1 - item.discount.amount / 100)
      : item.price;
    return sum + price * item.quantity; // multiply by quantity
  }, 0);

  const handleCheckout = () => {
    alert(`Narudžba poslana!\nUkupno: ${total.toFixed(2)} BAM`);
    setCart([]);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        marginTop:"4rem",
        
        p: 1,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      {/* Cart Summary */}
     <Box
  sx={{
    flex: 2,
    background: "#f9f9f9",
    borderRadius: 3,
    p: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  }}
>
  {/* Header */}
  <Typography
    variant="h5"
    sx={{ mb: 3, color: "#313131", fontWeight: "bold" }}
  >
    🛒 Vaša korpa (
    {cart.reduce((sum, item) => sum + item.quantity, 0)} artikla)
  </Typography>

  <Divider sx={{ borderColor: "#333", mb: 3 }} />

  {/* Cart Items */}
  <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {cart.map((book) => {
      const isDiscountValid =
        book.discount && new Date(book.discount.validUntil) > new Date();
      const price = isDiscountValid
        ? book.price * (1 - book.discount.amount / 100)
        : book.price;

      return (
        <ListItem
          key={book._id}
          sx={{
            background: "#262626",
            borderRadius: 2,
            p: 2,
            alignItems: "flex-start",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.01)", background: "#333" },
          }}
        >
          <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
            {/* Book Cover */}
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={book.coverImage}
                alt={book.title}
                sx={{
                  width: "auto",
                  height: 140,
                  borderRadius: 1,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                }}
              />
            </ListItemAvatar>

            {/* Book Info */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Title & Meta */}
              <Box>
                <Typography
                  color="#f9f9f9"
                  fontWeight="bold"
                  sx={{ fontSize: "1rem" }}
                >
                  {book.title}{" "}
                  <Typography component="span" color="#aaa" fontSize="0.85rem">
                    ({book.format})
                  </Typography>
                </Typography>

                <Typography color="#bbb" fontSize="0.85rem">
                  {book.author}
                </Typography>
                <Typography color="#777" fontSize="0.75rem">
                  ISBN: {book.isbn} • {book.pages} str.
                </Typography>
              </Box>

              {/* Price Row */}
            <Box
  sx={{
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1, // spacing between elements
  }}
>
  {/* Left side: price + quantity */}
  <Box>
    <Typography color="#f9f9f9" fontWeight="bold">
      {price.toFixed(2)} BAM
    </Typography>
    <Typography color="#aaa" fontSize="0.85rem">
      Količina: {book.quantity}
    </Typography>
  </Box>

  {/* Right side: total + discount */}
  <Box sx={{ textAlign: "right" }}>
    <Typography color="#f33600" fontWeight="bold" fontSize="1rem">
      {(price * book.quantity).toFixed(2)} BAM
    </Typography>

    {isDiscountValid && (
      <Typography
        sx={{
          textDecoration: "line-through",
          color: "#999",
          fontSize: "0.85rem",
        }}
      >
        {(book.price * book.quantity).toFixed(2)} BAM
      </Typography>
    )}
  </Box>
</Box>

            </Box>
          </Box>
        </ListItem>
      );
    })}
  </List>

  {/* Total */}
  <Divider sx={{ borderColor: "#333", mt: 3, mb: 2 }} />
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h6" sx={{ color: "#313131", fontWeight: "bold" }}>
      Ukupno:
    </Typography>
    <Typography
      variant="h5"
      sx={{ color: "#f33600", fontWeight: "bold" }}
    >
      {total.toFixed(2)} BAM
    </Typography>
  </Box>
</Box>



      {/* Shipping / Payment Form */}
      <Box sx={{ flex: 1, background: "#f9f9f9", borderRadius: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#f9f9f9" }}>
          Podaci za dostavu
        </Typography>
        <TextField
          label="Ime i prezime"
          name="fullName"
          value={shipping.fullName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={shipping.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Adresa"
          name="address"
          value={shipping.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Grad"
          name="city"
          value={shipping.city}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Poštanski broj"
          name="zip"
          value={shipping.zip}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#f33600",
            color: "#fff",
            py: 1.5,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#d62d00" },
          }}
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Završi kupovinu
        </Button>
      </Box>
    </Box>
  );
}
