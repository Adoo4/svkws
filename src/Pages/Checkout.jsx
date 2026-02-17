import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
 import { useUser } from "@clerk/clerk-react";
import useCart from "../Utils.js/useCart";
import CheckoutStepper from "../Components/CheckoutStepper";
import axios from "axios";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { getImageUrl } from "../Utils.js/imageUrl";

export default function CheckoutPage() {
 
const { user } = useUser();
  const { cart, isLoading } = useCart();
  const [orderNumber, setOrderNumber] = useState(null);

  const [shipping, setShipping] = useState({
    fullName:
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    deliveryMethod: "bhposta",
    paymentMethod: "card"
  });

  const [totals, setTotals] = useState({
    totalCart: 0,
    delivery: 0,
    totalWithDelivery: 0,
  });

const deliveryPrices = useMemo(
  () => ({
    bhposta: 7,
    brzapošta: 10,
    storepickup: 0,
  }),
  [] // empty deps = only created once
);

useEffect(() => {
  if (!cart?.items) return;
  const deliveryCost = deliveryPrices[shipping.deliveryMethod] || 0;
  const totalCart = cart.totalCart ?? 0;

  setTotals({
    totalCart,
    delivery: deliveryCost,
    totalWithDelivery: totalCart + deliveryCost,
  });
}, [cart, shipping.deliveryMethod, deliveryPrices]);



  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  useEffect(() => {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toISOString().slice(0,10).replace(/-/g, '');
  setOrderNumber(`ORD-${date}-${randomPart}`);
}, []);

  const handlePay = async () => {
    try {
     

      const amount = Math.round(totals.totalWithDelivery * 100); // smallest currency unit
      const currency = "BAM";

      const { data } = await axios.post(
        "https://backendsvkwbshp.onrender.com/api/payment/create-payment",
        { amount, currency, order_number: orderNumber }
      );

      const formattedPhone = shipping.phone
        ? shipping.phone.startsWith("+387")
          ? shipping.phone.replace(/\s+/g, "")
          : `+387${shipping.phone.replace(/^0+/, "").replace(/\s+/g, "")}`
        : "";

      const formData = {
        authenticity_token: data.authenticity_token,
        digest: data.digest,
        order_number: orderNumber,
        amount,
        currency,
        transaction_type: "purchase",
        order_info: "Online order",
        language: "ba-hr",
        locale: "bs-BA",
        ch_full_name: shipping.fullName || "",
        ch_address: shipping.address || "",
        ch_city: shipping.city || "",
        ch_zip: shipping.zip || "",
        ch_country: "BA",
        ch_phone: formattedPhone || "",
        ch_email: shipping.email || "",
        success_url_override: "https://bookstore.ba/success",
        cancel_url: "https://backendsvkwbshp.onrender.com/api/payment/cancel",
        callback_url: "https://backendsvkwbshp.onrender.com/api/payment/callback",
      };

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://ipgtest.monri.com/v2/form";

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
     
      alert("Greška pri plaćanju.");
    }
  };



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        gap: 4,
        mt: { xs: "2.5rem", sm: "3.5rem", md: "6rem" },
        mb: { xs: "4rem", md: "6rem" },
        alignItems: "flex-start",
        pt: 1,
        background: "white",
      }}
    >
      {/* Checkout Form */}
      <Box sx={{ width: { xs: "100%", md: "70%" }, p: 2, background: "white" }}>
        <CheckoutStepper
          shipping={shipping}
          handleChange={handleChange}
          handlePay={handlePay}
          setShipping={setShipping}
          totals={totals}
          setTotals={setTotals}
          cart={cart}
          orderNumber={orderNumber}
        />
      </Box>

      {/* Summary */}
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          bgcolor: "#1e1e1e",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🛒 Vaša korpa{" "}
          <Typography
            component="span"
            sx={{ color: "#f33600", fontWeight: "bold" }}
          >
            ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} artikla)
          </Typography>
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cart.items
            .filter((item) => item.book)
            .map((item) => {
              const { book, quantity } = item;
              const validDiscount =
                book.discount?.amount > 0 && book.discountedPrice < book.price;
              const coverSrc = getImageUrl(book.coverImage, { width: 140 });
if (isLoading) {
  return <Typography sx={{ mt: 10, textAlign: "center" }}>Učitavanje korpe...</Typography>;
}
              return (
                <ListItem
                  key={book._id}
                  sx={{
                    bgcolor: "#2a2a2a",
                    borderRadius: 2,
                    p: 2,
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "#333",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={coverSrc || "/placeholder-book.png"}
                        variant="square"
                        sx={{
                          height: 110,
                          width: 75,
                          borderRadius: 1,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                        }}
                      />
                    </ListItemAvatar>

                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold" color="#fff">
                          {book.title}
                        </Typography>
                        <Typography fontSize="0.9rem" color="#bbb">
                          {book.author}
                        </Typography>
                        <Typography fontSize="0.75rem" color="#aaa">
                          ISBN: {book.isbn} • {book.pages} str.
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              fontWeight="bold"
                              sx={{
                                color: validDiscount ? "#4caf50" : "#fff",
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              {book.discountedPrice.toFixed(2)} KM
                              {validDiscount && <LocalOfferOutlinedIcon sx={{ color: "#4caf50", fontSize: "1.1rem" }} />}
                            </Typography>
                          </Box>
                          <Typography fontSize="0.85rem" color="#ccc">
                            Količina: {quantity}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            color="#f33600"
                            fontWeight="bold"
                            fontSize="1rem"
                          >
                           {item.itemTotal.toFixed(2)} KM

                          </Typography>

                          {validDiscount && (
                            <Typography
                              sx={{
                                textDecoration: "line-through",
                                fontSize: "0.8rem",
                                color: "#888",
                              }}
                            >
                              {(book.price * quantity).toFixed(2)} KM
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

        <Divider sx={{ mt: 3, mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#2b2b2b",
            borderRadius: 2,
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Vrijednost korpe:
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#f33600", fontWeight: "bold", fontSize: "1.3rem" }}
          >
            {cart.totalCart?.toFixed(2)} KM
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
