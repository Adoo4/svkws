import { useEffect } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import useCart from "../Utils.js/useCart";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

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
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Uplata uspješna!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Vaša uplata je uspješno izvršena.  
            Zahvaljujemo vam na kupovini! Uskoro ćete primiti potvrdu putem e-maila.
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
