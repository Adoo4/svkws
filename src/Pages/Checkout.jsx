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
  const amountToPay = Math.round((total + 8) * 100); // BAM minor units

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
    injectMonriLightbox(data);
  } catch (err) {
    console.error("Payment init failed:", err);
    alert("Payment could not be initialized");
  }
};

// Inject Lightbox script only once
const injectMonriLightbox = async (paymentData) => {
  // Remove any old form
  const oldForm = document.querySelector("#monri-lightbox-form");
  if (oldForm) oldForm.remove();

  const form = document.createElement("form");
  form.id = "monri-lightbox-form";
  form.method = "POST";
  form.action = "https://backendsvkwbshp.onrender.com/api/payment/callback";

  const script = document.createElement("script");
  script.src = "https://ipgtest.monri.com/dist/lightbox.js";
  script.type = "text/javascript";
  script.className = "lightbox-button";

  // Digest calculation
  let digest = paymentData.digest;
  if (!digest && paymentData.merchantKey) {
    const encoder = new TextEncoder();
    const dataToHash =
      paymentData.merchantKey +
      paymentData.order_number +
      paymentData.amount +
      paymentData.currency;
    const hashBuffer = await crypto.subtle.digest(
      "SHA-512",
      encoder.encode(dataToHash)
    );
    digest = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  script.setAttribute("data-authenticity-token", paymentData.authenticity_token);
  script.setAttribute("data-order-number", paymentData.order_number);
  script.setAttribute("data-amount", paymentData.amount);
  script.setAttribute("data-currency", paymentData.currency);
  script.setAttribute("data-digest", digest);
  script.setAttribute("data-transaction-type", "purchase");
  script.setAttribute("data-language", "ba");
  script.setAttribute("data-order-info", "Book Order");

  // Customer info
  Object.entries(paymentData.customer).forEach(([key, value]) => {
    script.setAttribute(`data-${key}`, value);
  });

  form.appendChild(script);
  document.body.appendChild(form);

  // Wait a tiny bit to ensure MonriLightbox is attached
  setTimeout(() => {
    if (!window.MonriLightbox) return;

    const lightbox = window.MonriLightbox;

    // Register event handlers
    lightbox.on("success", (resp) => {
      console.log("Payment successful:", resp);
      clearCart();
      alert("Payment completed successfully!");
      form.remove(); // remove form after success
    });

    lightbox.on("close", () => {
      console.log("Lightbox closed by user");
      form.remove(); // remove form on cancel
    });

    lightbox.on("error", (err) => {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
      form.remove(); // remove form on error
    });

    // Open Lightbox
    lightbox.open();
  }, 100); // 100ms delay ensures script is ready
};



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
