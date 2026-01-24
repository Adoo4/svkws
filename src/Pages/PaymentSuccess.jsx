import { useEffect, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useLocation } from "react-router-dom";
import useCart from "../Utils.js/useCart";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  const hasClearedRef = useRef(false);

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const orderNumber = params.get("order_number");
  const amount = params.get("amount");

  const formattedAmount = useMemo(() => {
    if (!amount) return null;
    return `${(Number(amount) / 100).toFixed(2)} BAM`;
  }, [amount]);

  useEffect(() => {
    if (!hasClearedRef.current) {
      clearCart();
      hasClearedRef.current = true;
    }
  }, [clearCart]);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 520,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: "center" }}>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 84,
              color: "#2e7d32",
              mb: 2,
            }}
            aria-hidden
          />

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Uplata uspješna
          </Typography>

          <Typography
            sx={{
              mt: 2,
              mb: 3,
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 2.5 },
              bgcolor: "rgba(76,175,80,0.08)",
              borderLeft: "4px solid #4caf50",
              borderRadius: 2,
              color: "#2e2e2e",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            <Box component="span" sx={{ display: "block", mb: 1 }}>
              ✅ Vaša uplata je uspješno izvršena.
            </Box>

            {orderNumber && (
              <Box component="span" sx={{ display: "block", fontWeight: 600 }}>
                Broj narudžbe: {orderNumber}
              </Box>
            )}

            {formattedAmount && (
              <Box component="span" sx={{ display: "block", mt: 0.5 }}>
                Iznos: {formattedAmount}
              </Box>
            )}

            <Box component="span" sx={{ display: "block", mt: 1 }}>
              Potvrdu kupovine ćete uskoro dobiti putem e-maila.
            </Box>

            <Box component="span" sx={{ display: "block", mt: 1 }}>
              Pitanja?{" "}
              <Box
                component="a"
                href="mailto:info@svjetlostkomerc.ba"
                sx={{
                  color: "#1565c0",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                info@svjetlostkomerc.ba
              </Box>
            </Box>
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              mt: 2,
              px: 4,
              py: 1.2,
              borderRadius: 3,
              bgcolor: "#d62d00",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#b82400",
              },
            }}
          >
            Nazad na početnu
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
