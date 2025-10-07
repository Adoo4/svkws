import { Box, Typography, Link, Grid, Stack } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const navLinks = [
  { label: "Opšti Uslovi Poslovanja", path: "/OpštiUsloviPoslovanja" },
  { label: "Uslovi Kupovine", path: "/Uslovikupovine" },
  { label: "Politika Povrata i Reklamacije", path: "/PolitikaPovrataiReklamacije" },
  { label: "Sigurnost", path: "/Sigurnost" },
  { label: "Privatnost", path: "/Privatnost" },
  { label: "Politika kolačića", path: "/PolitikaKolačića" },
];

const SimpleFooter = () => {
  
  const location = useLocation();
   const isHome = location.pathname === "/home";
    const navigate = useNavigate(); // ovo omogućava navigate()

  return (
    <Box
  component="footer"
  sx={{
    backgroundColor: isHome ? "#000" : "#262626",
    color: "#f9f9f9",
    px: { xs: 2, md: 6 },
    py: { xs: 3, md: 6 },
    mt: "auto",
  }}
>
  {/* Decorative Header */}
  <Box
    sx={{
      height: { xs: "2rem", md: "3rem" },
      width: "100%",
      background: `repeating-linear-gradient(
        45deg,
        #131313,
        #131313 10px,
        transparent 10px,
        transparent 20px
      )`,
      borderRadius: "6px",
      mb: 3,
    }}
  />

  {/* Main Footer Content */}
  <Grid
  container
  spacing={4}
  sx={{
    alignItems: { xs: "center", md: "flex-start" },
    justifyContent: { xs: "center", md: "space-between" },
    flexDirection: { xs: "column", md: "row" },
  }}
>
    {/* Logo */}
    <Grid
    item
    xs={12}
    md={3}
    display="flex"
    justifyContent={{ xs: "center", md: "flex-start" }}
    textAlign={{ xs: "center", md: "left" }}
  >
       <Box
      component="img"
      src="/logotip_svjetlostkomerc.gif"
      alt="Svjetlostkomerc Logo"
      sx={{
        filter: "brightness(0) invert(1)",
        opacity: 0.7,
        width: { xs: "200px", md: "320px" },
        maxWidth: "100%",
      }}
    />
    </Grid>

    {/* Company Info */}
    <Grid
    item
    xs={12}
    md={5}
    display="flex"
    justifyContent={{ xs: "center", md: "flex-start" }}
    textAlign={{ xs: "center", md: "left" }}
  >
    <Stack
      spacing={1}
      alignItems={{ xs: "center", md: "flex-start" }}
      textAlign={{ xs: "center", md: "left" }}
    >
        <Typography
          variant="h6"
          sx={{
            color: "#f9f9f9",
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            opacity: 0.7,
            fontWeight: "bold",
            borderLeft: "4px solid #d62d00",
            pl: 1,
          }}
        >
          Svjetlostkomerc d.d. Sarajevo
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "#f9f9f9", opacity: 0.7 }}>
          Adresa: Bačići 5, 71000 Sarajevo
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "#f9f9f9", opacity: 0.7 }}>
          JIB: 4200177160001 | PDV: 200177160001
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "#f9f9f9", opacity: 0.7 }}>
          Žiro račun: Intesa SanPaolo 1540012000158885
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "#f9f9f9", opacity: 0.7 }}>
          Email:{" "}
          <Link href="mailto:info@svjetlostkomerc.ba" underline="hover" sx={{ color: "#d62d00", fontWeight: 500 }}>
            info@svjetlostkomerc.ba
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "#f9f9f9", opacity: 0.7 }}>
          Telefon:{" "}
          <Link href="tel:+38733200840" underline="hover" sx={{ color: "#d62d00", fontWeight: 500 }}>
            033/200-840
          </Link>
        </Typography>
      </Stack>
    </Grid>

    {/* Social Icons */}
    <Grid
      item
      xs={12}
      md={3}
      display="flex"
      flexDirection="column"
      alignItems={{ xs: "center", md: "flex-end" }}
      textAlign={{ xs: "center", md: "right" }}
      gap={2}
    >
      <Typography variant="body2" gutterBottom sx={{ color: "#f9f9f9", opacity: 0.7 }}>
        Pratite nas:
      </Typography>
      <Stack direction="row" spacing={2}>
        <Link
          href="https://www.facebook.com/knjizarasvjetlost/?locale=hr_HR"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
          sx={{
            color: "#f9f9f9",
            opacity: 0.7,
            transition: "all 0.3s",
            "&:hover": { color: "#4267B2", transform: "scale(1.2)" },
          }}
        >
          <Facebook fontSize="medium" />
        </Link>
        <Link
          href="https://www.instagram.com/svjetlostkomerc"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          sx={{
            color: "#f9f9f9",
            opacity: 0.7,
            transition: "all 0.3s",
            "&:hover": { color: "#E1306C", transform: "scale(1.2)" },
          }}
        >
          <Instagram fontSize="medium" />
        </Link>
      </Stack>
    </Grid>
  </Grid>

  {/* Bottom Legal Links Section */}
  <Box
    sx={{
      borderTop: "1px solid #444",
      mt: 4,
      pt: 3,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent={{ xs: "center", md: "flex-start" }}>
      {navLinks.map((link, index) => (
        <Button
          key={index}
          variant="text"
          sx={{
            color: "#f9f9f9",
            textTransform: "none",
            fontSize: { xs: "0.65rem", md: "0.75rem" },
            "&:hover": { color: "#d62d00" },
            minWidth: "fit-content",
          }}
          onClick={() => navigate(link.path)}
        >
          {link.label}
        </Button>
      ))}
    </Stack>

    <Typography
      variant="caption"
      sx={{ opacity: 0.7, fontSize: { xs: "0.65rem", md: "0.75rem" }, textAlign: { xs: "center", md: "right" } }}
    >
      © {new Date().getFullYear()} Svjetlostkomerc d.d. Sarajevo. Sva prava zadržana.
    </Typography>
  </Box>
</Box>



  );
};

export default SimpleFooter;
