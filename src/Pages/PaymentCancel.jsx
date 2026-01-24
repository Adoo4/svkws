import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

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
          <CancelOutlinedIcon
            sx={{
              fontSize: 84,
              color: "#d32f2f",
              mb: 2,
            }}
            aria-hidden
          />

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Plaćanje prekinuto
          </Typography>
<Typography
  sx={{
    mt: 2,
    mb: 3,
    px: { xs: 2, sm: 3 },
    py: { xs: 2, sm: 2.5 },
    bgcolor: "rgba(211,47,47,0.08)",
    borderLeft: "4px solid #d32f2f",
    borderRadius: 2,
    color: "#2e2e2e",
    lineHeight: 1.7,
    fontWeight: 500,
  }}
>
  <Box component="span" sx={{ display: "block", mb: 1 }}>
    ❌ Plaćanje nije završeno.
  </Box>

  <Box component="span" sx={{ display: "block" }}>
    Vaša kartica <strong>nije terećena</strong>.
  </Box>

  <Box component="span" sx={{ display: "block", mt: 1 }}>
    Možete pokušati ponovo ili se vratiti na .
  </Box>

  <Box component="span" sx={{ display: "block", mt: 1 }}>
    Za sve dodatne informacije obratite se na{" "}
    <Box
      component="a"
      href="mailto:info@svjetlostkomerc.ba"
      sx={{
        color: "#c62828",
        fontWeight: 600,
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      info@svjetlostkomerc.ba
    </Box>
  </Box>
</Typography>


          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/checkout")}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Nazad u bookstore
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{
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
              Početna
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
