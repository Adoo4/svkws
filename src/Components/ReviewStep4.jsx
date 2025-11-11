import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
   ListItem,
  Grid,
  Paper,
  Button, CircularProgress
} from "@mui/material";

import { useTempOrder } from "../Utils.js/useTempOrder";
import { useAuth } from "@clerk/clerk-react";




export default function ReviewStep({
  cart = { items: [], totalCart: 0, totalWithDelivery: 0 },
  shipping = {},
  deliveryOption = "",
  paymentOption = "",
  totalCart = 0,
  delivery = 0,
  totalWithDelivery = 0,
  orderNumber = 0,
  handlePay
  
}) {

const paymentNames = {
  card: "Kartično plaćanje",
  cash: "Pouzećem",
  bank: "Plaćanje na žiro račun",
};

const paymentName = paymentNames[paymentOption] || "Nije odabrano";

  const deliveryNames = {
  bhposta: "BH pošta",
  euroexpress: "Euro Express",
  storepickup: "Preuzimanje u trgovini",
};

const deliveryName = deliveryNames[deliveryOption] || "Nije odabrano";

const { user } = useAuth();

const { createTempOrder, isCreating } = useTempOrder();

 const handleCreateTempOrder = () => {
   

  

    const tempOrder = {
       orderNumber: String(orderNumber),
        paymentOption: String(paymentOption),
      status: "pending",
      userEmail: user?.emailAddresses[0]?.emailAddress,
      shipping: {
        fullName: shipping.fullName,
        address: shipping.address,
        city: shipping.city,
        zip: shipping.zip,
        email: shipping.email,
        phone: shipping.phone,
        deliveryMethod: shipping.deliveryMethod,
      },
      totals: {
        subtotal: totalCart,
        delivery: delivery,
        total: totalWithDelivery,
      },
    };

 createTempOrder(tempOrder, {
      onSuccess: (data) => {
        console.log("✅ Temporary order created:", data);
        // 👉 here you can redirect to Monri create-payment endpoint
      },
    });
  };

  const handleCheckout = () => {
    handleCreateTempOrder();
  
    handlePay();
  }

  return (
<Box
  sx={{
    p: {  sm: 2 },
    maxWidth: 1200,
    mx: "auto",
    borderRadius: 3,
    color: "#333",
    
  }}
>
  {/* SHIPPING INFO */}
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        bgcolor: "#fff",
        mb: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
    variant="h7"
    fontWeight="bold"
    sx={{
      color: "#ff4b2b",
      mb: 1,
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    🏠 Podaci za dostavu
  </Typography>

      <Grid container spacing={{ xs: 4, sm: 4, md: 4, lg: 17 }}>
        
        {[
          {
            title: "Lični podaci",
            fields: [
              { label: "Ime i prezime", value: shipping.fullName },
              { label: "Email", value: shipping.email },
              { label: "Telefon", value: shipping.phone },
            ],
          },
          {
            title: "Adresa dostave",
            fields: [
              { label: "Adresa", value: shipping.address },
              { label: "Grad", value: shipping.city },
              { label: "Poštanski broj", value: shipping.zip },
            ],
          },
        ].map((section, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Typography fontWeight="bold" sx={{ mb: 1, color: "#222" }}>
              {section.title}
            </Typography>
            
            {section.fields.map((f, j) => (
              <Typography key={j} sx={{ color: "#555", fontSize:"0.85rem" }}>
                <strong>{f.label}:</strong> {f.value || "-"}
              </Typography>
              
            ))}
            
          </Grid>
        ))}
        
      </Grid>
    </Paper>

   {/* DELIVERY + PAYMENT */}
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2.5,
    mb: 3,
  }}
>
  {/* Način dostave */}
  <Paper
    onClick={() => console.log("Open delivery options")}
    sx={{
      flex: 1,
      p: 2,
      borderRadius: 4,
      cursor: "pointer",
      transition: "all 0.3s ease",
      bgcolor: "#fff",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      border: "1px solid transparent",
      
      
    }}
  >
    <Typography
      variant="h7"
      fontWeight="bold"
      sx={{
        color: "#ff4b2b",
        mb: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      🚚 Način dostave
    </Typography>
  <Typography
  color="#444"
  variant="body1"
  sx={{ fontSize: "0.80rem", display: "flex", justifyContent: "space-between" }}
>
  {deliveryName}
  <Box>{delivery.toFixed(2)} KM</Box>
</Typography>
  </Paper>

  {/* Način plaćanja */}
  <Paper
    onClick={() => console.log("Open payment options")}
    sx={{
      flex: 1,
      p: 2,
      borderRadius: 4,
      cursor: "pointer",
      transition: "all 0.3s ease",
      bgcolor: "#fff",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      border: "1px solid transparent",
    
    }}
  >
    <Typography
      variant="h7"
      fontWeight="bold"
      sx={{
        color: "#ff4b2b",
        mb: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      💳 Način plaćanja
    </Typography>
   <Typography color="#444" variant="body1" sx={{fontSize:"0.80rem"}}>
  {paymentName}
</Typography>
  </Paper>
</Box>


  {/* CART ITEMS */}
  <Box sx={{ mb: 4 }}>
   

  {cart?.items?.length > 0 ? (
  <Paper
    sx={{
      bgcolor: "#fff",
      borderRadius: 3,
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      p: { xs: 2, sm: 2 },
    }}
  >

     <Typography
      variant="h7"
      fontWeight="bold"
      textAlign="left"
      sx={{ color: "#ff4b2b", mb: 2 }}
    >
      🛒 Proizvodi u korpi
    </Typography>
    <List disablePadding>
  {cart.items.map((item, index) => (
    <React.Fragment key={item.book._id}>
      <ListItem
        alignItems="flex-start"
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 1,
          py: 1.5,
          padding: "0rem",
        }}
      >
        {/* IMAGE */}
        <Box
          component="img"
          src={item.book.coverImage}
          alt={item.book.title}
          sx={{
            width: "auto",
            height: 80,
            objectFit: "contain",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            flexShrink: 0,
          }}
        />

        {/* INFO */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#222"
            sx={{ lineHeight: 1.3 }}
          >
            {item.book.title}
          </Typography>
          <Typography variant="body2" color="#666" sx={{ fontSize: "0.80rem" }}>
            {item.book.author}
          </Typography>
          <Typography variant="body2" color="#555" sx={{ fontSize: "0.80rem" }}>
            Količina: <strong>{item.quantity}</strong>
          </Typography>
        </Box>

        {/* PRICE */}
        <Typography
          variant="body1"
          fontWeight="bold"
          color="#262626"
          sx={{ minWidth: 80, textAlign: { xs: "right", sm: "right" } }}
        >
          {(item.itemTotal ?? item.book.price * item.quantity).toFixed(2)} KM
        </Typography>
      </ListItem>

      {/* Divider between items */}
      {index < cart.items.length - 1 && (
        <Divider sx={{ borderColor: "#eee", my: 1 }} />
      )}
    </React.Fragment>
  ))}
</List>

  </Paper>
) : (
  <Typography color="#777" align="center" sx={{ mt: 3 }}>
    Vaša korpa je prazna.
  </Typography>
)}

  </Box>

  {/* TOTAL SECTION */}
  <Paper
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
      bgcolor: "#fff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}
  >
  <Typography
  variant="h7"
  fontWeight="bold"
  sx={{
    color: "#ff4b2b",
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 1,
  }}
>
  ✅ Ukupan iznos
</Typography>
   <Divider sx={{ mb: 2, borderColor: "#eee" }} />
<Grid container justifyContent="space-between" mb={1}>
  <Typography sx={{ fontSize: "0.8rem" }}>Ukupno u korpi:</Typography>
  <Typography sx={{ fontSize: "0.8rem" }}>{totalCart.toFixed(2)} KM</Typography>
</Grid>
    <Grid container justifyContent="space-between" mb={1}>
     <Typography sx={{fontSize:"0.8rem"}}>Dostava:</Typography>
      <Typography sx={{fontSize:"0.8rem"}}>{delivery.toFixed(2)} KM</Typography>
    </Grid>
    <Divider sx={{ my: 1, borderColor: "#eee" }} />
    <Grid container justifyContent="space-between">
      <Typography variant="h7" fontWeight="bold">
       Ukupno: 
      </Typography>
      <Typography variant="h7" fontWeight="bold" color="#ff4b2b">
        {totalWithDelivery.toFixed(2)} KM
      </Typography>
    </Grid>
  </Paper>


<Button
  variant="contained"
  fullWidth
  onClick={handleCheckout}
  disabled={isCreating || !cart?.items?.length}
  sx={{
    mt: 2,
    bgcolor: "#f33600",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: 2,
    py: 1.5,
    boxShadow: "0 3px 10px rgba(243, 54, 0, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      bgcolor: "#d62d00",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 14px rgba(243, 54, 0, 0.4)",
    },
    "&:disabled": {
      bgcolor: "#ccc",
      color: "#666",
      boxShadow: "none",
      transform: "none",
    },
  }}
>
  {isCreating ? (
    <>
      <CircularProgress
        size={22}
        color="inherit"
        sx={{ mr: 1 }}
      />
      Obrada...
    </>
  ) : (
    "Završi kupovinu"
  )}
</Button>

</Box>



  );
}

