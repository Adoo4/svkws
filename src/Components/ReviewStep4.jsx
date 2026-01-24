import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTempOrder } from "../Utils.js/useTempOrder";
import { useAuth } from "@clerk/clerk-react";

export default function ReviewStep({
  cart = { items: [] },
  shipping = {},
  deliveryOption = "",
  paymentOption = "",
  totalCart = 0,
  delivery = 0,
  totalWithDelivery = 0,
  orderNumber = "",
  handlePay,
}) {
  const { user } = useAuth();
  const { createTempOrder, isCreating } = useTempOrder();

  /* ----------------------------------
     Memoized labels (performance-safe)
  ---------------------------------- */
  const paymentName = useMemo(() => {
    const map = {
      card: "Kartično plaćanje",
      cash: "Pouzećem",
      bank: "Plaćanje na žiro račun",
    };
    return map[paymentOption] ?? "Nije odabrano";
  }, [paymentOption]);

  const deliveryName = useMemo(() => {
    const map = {
      bhposta: "BH pošta",
      brzapošta: "Brza pošta",
      storepickup: "Preuzimanje u trgovini",
    };
    return map[deliveryOption] ?? "Nije odabrano";
  }, [deliveryOption]);

  /* ----------------------------------
     Validation guard
  ---------------------------------- */
  const isValidOrder =
    cart?.items?.length > 0 &&
    shipping.fullName &&
    shipping.address &&
    shipping.city &&
    shipping.zip &&
    shipping.email &&
    paymentOption &&
    deliveryOption;

  /* ----------------------------------
     Order factory (clean architecture)
  ---------------------------------- */
  const buildTempOrder = () => ({
    orderNumber: String(orderNumber),
    paymentOption,
    status: "pending",
    userEmail: user?.emailAddresses?.[0]?.emailAddress ?? "",
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
      delivery,
      total: totalWithDelivery,
    },
  });

  const handleCreateTempOrder = async () => {
    const tempOrder = buildTempOrder();
    return createTempOrder(tempOrder);
  };

  /* ----------------------------------
     Transactional checkout (CRITICAL)
  ---------------------------------- */
  const handleCheckout = async () => {
    if (isCreating) return;

    if (!isValidOrder) {
      alert("Molimo popunite sve podatke prije nastavka.");
      return;
    }

    try {
      await handleCreateTempOrder(); // 1️⃣ create order
      await handlePay();             // 2️⃣ then redirect to payment
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  return (
    <Box sx={{ p: { sm: 2 }, maxWidth: 1200, mx: "auto" }}>
      {/* SHIPPING INFO */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#ff4b2b" mb={1}>
          🏠 Podaci za dostavu
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Lični podaci",
              fields: [
                ["Ime i prezime", shipping.fullName],
                ["Email", shipping.email],
                ["Telefon", shipping.phone],
              ],
            },
            {
              title: "Adresa dostave",
              fields: [
                ["Adresa", shipping.address],
                ["Grad", shipping.city],
                ["Poštanski broj", shipping.zip],
              ],
            },
          ].map((section, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Typography fontWeight="bold" mb={1}>
                {section.title}
              </Typography>
              {section.fields.map(([label, value], j) => (
                <Typography key={j} fontSize="0.85rem">
                  <strong>{label}:</strong> {value || "-"}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* DELIVERY + PAYMENT */}
      <Grid container spacing={2.5} mb={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#ff4b2b">
              🚚 Način dostave
            </Typography>
            <Box display="flex" justifyContent="space-between" fontSize="0.85rem">
              <span>{deliveryName}</span>
              <span>{delivery.toFixed(2)} KM</span>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#ff4b2b">
              💳 Način plaćanja
            </Typography>
            <Typography fontSize="0.85rem">{paymentName}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* CART ITEMS */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#ff4b2b" mb={2}>
          🛒 Proizvodi u korpi
        </Typography>

        {cart.items.length ? (
          <List disablePadding>
            {cart.items.map((item, index) => {
              if (!item.book) return null;
              const book = item.book;

              return (
                <React.Fragment key={book._id}>
                  <ListItem sx={{ px: 0 }}>
                    <Box
                      component="img"
                      src={book.coverImage || "/placeholder-book.png"}
                      alt={`Knjiga: ${book.title}`}
                      sx={{ height: 80, mr: 2 }}
                    />
                    <Box flexGrow={1}>
                      <Typography fontWeight="bold">{book.title}</Typography>
                      <Typography fontSize="0.8rem">{book.author}</Typography>
                      <Typography fontSize="0.8rem">
                        Količina: <strong>{item.quantity}</strong>
                      </Typography>
                    </Box>
                    <Typography fontWeight="bold">
                      {(item.itemTotal ?? book.price * item.quantity).toFixed(2)} KM
                    </Typography>
                  </ListItem>
                  {index < cart.items.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        ) : (
          <Typography align="center" color="#777">
            Vaša korpa je prazna.
          </Typography>
        )}
      </Paper>

      {/* TOTAL */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#ff4b2b">
          ✅ Ukupan iznos
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container justifyContent="space-between">
          <Typography>Ukupno u korpi:</Typography>
          <Typography>{totalCart.toFixed(2)} KM</Typography>
        </Grid>
        <Grid container justifyContent="space-between">
          <Typography>Dostava:</Typography>
          <Typography>{delivery.toFixed(2)} KM</Typography>
        </Grid>
        <Divider sx={{ my: 1 }} />
        <Grid container justifyContent="space-between">
          <Typography fontWeight="bold">Ukupno:</Typography>
          <Typography fontWeight="bold" color="#ff4b2b">
            {totalWithDelivery.toFixed(2)} KM
          </Typography>
        </Grid>
      </Paper>

      {/* CHECKOUT BUTTON */}
      <Button
        fullWidth
        variant="contained"
        aria-label="Završi kupovinu"
        onClick={handleCheckout}
        disabled={!isValidOrder || isCreating}
        sx={{ mt: 2, bgcolor: "#f33600", py: 1.5 }}
      >
        {isCreating ? (
          <>
            <CircularProgress size={22} color="inherit" sx={{ mr: 1 }} />
            Obrada...
          </>
        ) : (
          "Završi kupovinu"
        )}
      </Button>
    </Box>
  );
}
