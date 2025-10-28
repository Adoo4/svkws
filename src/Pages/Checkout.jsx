// CheckoutPage.jsx
import  { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useAuth } from "@clerk/clerk-react";
import useCart from "../Utils.js/useCart";
import CheckoutStepper from "../Components/CheckoutStepper"
import axios from "axios";


export default function CheckoutPage() {
  const { user } = useAuth();
   const { cart } = useCart();
  const [shipping, setShipping] = useState({
    fullName: user?.firstName + " " + user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: null,
    address: "",
    city: "",
    zip: "",
  });

  

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


const handlePay = async () => {
    try {
      const orderNumber = "ORD-" + Math.floor(Math.random() * 1000000);
      const amount = 500; // means 5.00 BAM
      const currency = "BAM";

      // 1️⃣ Request digest from backend
      const { data } = await axios.post("https://backendsvkwbshp.onrender.com/api/payment/create-payment", {
        amount,
        currency,
        order_number: orderNumber,
      });

     const formattedPhone = shipping.phone
  ? shipping.phone.startsWith("+387")
    ? shipping.phone.replace(/\s+/g, "")
    : `+387${shipping.phone.replace(/^0+/, "").replace(/\s+/g, "")}`
  : "";



      // 2️⃣ Prepare Monri form fields
      const formData = {
        authenticity_token: data.authenticity_token,
        digest: data.digest,
        order_number: orderNumber,
        amount,
        currency,
        transaction_type: "purchase",
        order_info: "Online order",
          // --- Localization ---
   language: "ba-hr",  // ✅ Correct language tag
  locale: "bs-BA",    // Optional, can help with formatting
       ch_full_name: shipping.fullName || "",
      ch_address: shipping.address || "",
      ch_city: shipping.city || "",
      ch_zip: shipping.zip || "",
      ch_country: "BA", // optionally extend with country selector
      ch_phone: formattedPhone || "",
      ch_email: shipping.email || "",
      
        success_url_override: "https://backendsvkwbshp.onrender.com/api/payment/success",
        cancel_url: "https://backendsvkwbshp.onrender.com/api/payment/cancel",
        callback_url: "https://backendsvkwbshp.onrender.com/api/payment/callback",
      };

      // 3️⃣ Dynamically create and submit form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://ipgtest.monri.com/v2/form"; // TEST endpoint

      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Greška pri plaćanju.");
    }
  };




const handleCheckout = () => {
  handlePay();
};


//

  return (
    <Box  sx={{
    display: "flex",
    flexDirection: { xs: "column-reverse", md: "row" },
    gap: 4,
    marginTop: { xs: "2.5rem", sm:"3.5rem", md: "6rem" },
    marginBottom: { xs: "4rem", md: "6rem" },
    alignItems: "flex-start", // ensures both children start at the top
    pt:1,
    background:"white"
  }}>
<Box sx={{ width: { xs: "100%", md: "70%" }, padding:"1rem",  minHeight:"100lvh", background:"white" }}>
      <CheckoutStepper
  shipping={shipping}
  handleChange={handleChange}
  handleCheckout={handleCheckout}
   setShipping={setShipping}
  cart={cart}
/>
</Box>
     <Box sx={{ width: { xs: "100%", md: "30%" }, display:{xs:"none", md:"flex"} }}>
      {/* Cart Summary */}
     <Box
  sx={{
    flex: 2,
    //background: "#f0f0f0",
    borderRadius: 3,
    p: 1,
    
  }}
>
  {/* Header */}
  <Typography
    variant="h6"
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
                  color="#f0f0f0"
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
  

  

  {/* Grand total */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="h6" sx={{ color: "#313131", fontWeight: "bold" }}>
      Cijena knjiga u korpi:
    </Typography>
    <Typography variant="h6" sx={{ color: "#f33600", fontWeight: "bold" }}>
      {(total).toFixed(2)} BAM
    </Typography>
  </Box>
</Box>

</Box>



     
    </Box>
    </Box>
  );
}
