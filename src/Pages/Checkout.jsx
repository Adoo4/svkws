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
import useCart from "../Utils.js/useCart";
import CheckoutStepper from "../Components/CheckoutStepper"


export default function CheckoutPage() {
  const { user } = useAuth();
   const { cart, clearCart } = useCart();
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

  const startPayment = async () => {
  const amountToPay = Math.round((total + 8) * 100); // in cents

  try {
    const res = await fetch(
      "https://backendsvkwbshp.onrender.com/api/payment/create-payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountToPay.toString(),
          currency: "BAM",
          customer: {
            ch_full_name: shipping.fullName,
            ch_email: shipping.email,
            ch_address: shipping.address,
            ch_city: shipping.city,
            ch_zip: shipping.zip,
            ch_country: "BA",
            ch_phone: "00000000",
          },
        }),
      }
    );

    const data = await res.json();

    if (!data?.client_secret) {
      console.error("No client_secret returned:", data);
      return;
    }

    openMonriLightbox(data.client_secret);
  } catch (err) {
    console.error("Payment init failed:", err);
    alert("Payment could not be initialized");
  }
};

const openMonriLightbox = (clientSecret) => {
  if (!window.Monri) {
    console.error("Monri script not loaded");
    return;
  }

  const monri = window.Monri("test"); // change to "production" when live
  monri.lightbox({
    client_secret: clientSecret,
    order_info: {
      order_number: "ORDER_" + Date.now(),
      amount: Math.round((total + 8) * 100),
      currency: "BAM",
    },
    transaction_type: "purchase",
    language: "ba",
  });

  monri.on("success", (response) => {
    console.log("Success:", response);
    clearCart();
    alert("Plaćanje uspješno!");
  });

  monri.on("error", (error) => {
    console.error("Error:", error);
    alert("Greška u plaćanju.");
  });

  monri.on("cancel", () => {
    console.log("User cancelled payment");
  });
};


// Inject Lightbox script only once




const handleCheckout = () => {
  startPayment();
};

  return (
    <Box  sx={{
    display: "flex",
    flexDirection: { xs: "column-reverse", md: "row" },
    gap: 4,
    marginTop: { xs: "4rem", md: "6rem" },
    marginBottom: { xs: "4rem", md: "6rem" },
    alignItems: "flex-start", // ensures both children start at the top
    p:1
  }}>
<Box sx={{ width: { xs: "100%", md: "70%" } }}>
      <CheckoutStepper
  shipping={shipping}
  handleChange={handleChange}
  handleCheckout={handleCheckout}
  cart={cart}
/>
</Box>
     <Box sx={{ width: { xs: "100%", md: "30%" } }}>
      {/* Cart Summary */}
     <Box
  sx={{
    flex: 2,
    background: "#f0f0f0",
    borderRadius: 3,
    p: 1,
    
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
            background: "#313131",
            borderRadius: 2,
            p: 2,
            alignItems: "flex-start",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "0.3s",
           
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
<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  {/* Price of all books */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h7" sx={{ color: "#313131", fontWeight: "bold" }}>
      Cijena knjiga:
    </Typography>
    <Typography variant="h7" sx={{ color: "#313131", fontWeight: "bold" }}>
      {total.toFixed(2)} BAM
    </Typography>
  </Box>

  {/* Dostava */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h7" sx={{ color: "#313131", fontWeight: "bold" }}>
      Dostava:
    </Typography>
    <Typography variant="h7" sx={{ color: "#313131", fontWeight: "bold" }}>
      8.00 BAM
    </Typography>
  </Box>

  {/* Grand total */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h5" sx={{ color: "#f33600", fontWeight: "bold" }}>
      Ukupno:
    </Typography>
    <Typography variant="h5" sx={{ color: "#f33600", fontWeight: "bold" }}>
      {(total + 8).toFixed(2)} BAM
    </Typography>
  </Box>
</Box>

</Box>



     
    </Box>
    </Box>
  );
}
