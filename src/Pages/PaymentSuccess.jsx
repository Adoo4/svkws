import { useEffect } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useLocation } from "react-router-dom";
import useCart from "../Utils.js/useCart";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  // Parse Monri query parameters
  const params = new URLSearchParams(location.search);
  const orderNumber = params.get("order_number");
  const amount = params.get("amount");

  useEffect(() => {
    // ✅ Clear cart on success
    clearCart();
  }, [clearCart]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          p: 3,
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        <CardContent>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "#28a745", mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Uplata uspješna!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: "#4a4a4a",
              lineHeight: 1.7,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              textAlign: "center",
              backgroundColor: "rgba(76, 175, 80, 0.08)",
              borderLeft: "4px solid #4caf50",
              borderRadius: "8px",
              p: { xs: 2, sm: 3 },
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              fontWeight: 500,
            }}
          >
            <Box
              component="span"
              sx={{ display: "block", color: "#2e7d32", fontWeight: 600, mb: 1 }}
            >
              ✅ Vaša uplata je uspješno izvršena!
            </Box>
            {orderNumber && (
              <Box component="span" sx={{ display: "block", fontWeight: 600 }}>
                Broj narudžbe: {orderNumber}
              </Box>
            )}
            {amount && (
              <Box component="span" sx={{ display: "block", mb: 1 }}>
                Iznos: {amount} BAM
              </Box>
            )}
            Zahvaljujemo vam na kupovini. Uskoro ćete primiti potvrdu putem e-maila.
            <Box component="span" sx={{ display: "block", mt: 1 }}>
              Za sve dodatne informacije obratite se na{" "}
              <Box
                component="a"
                href="mailto:info@svjetlostkomerc.ba"
                sx={{
                  color: "#1e88e5",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                info@svjetlostkomerc.ba
              </Box>
              .
            </Box>
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d62d00",
              "&:hover": { backgroundColor: "#b82400" },
              px: 4,
              py: 1,
              borderRadius: 3,
            }}
            onClick={() => navigate("/")}
          >
            Nazad na početnu
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
