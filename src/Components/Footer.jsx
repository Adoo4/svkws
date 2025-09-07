import { Box, Typography, Link, Grid, Stack } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { useLocation } from "react-router-dom";

const SimpleFooter = () => {
  
  const location = useLocation();
   const isHome = location.pathname === "/home";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isHome ? "#000000" : "#262626", // black on /home
        color: "#f9f9f9",
        px: { xs: 0, md: 6 },
        py: { xs: 0, md: 6 },
        mt: "auto",
      }}
    >
      <Box
          sx={{
            height: { xs: "2rem", md: "3rem" },
            width: "100%",
            background: `repeating-linear-gradient(
              45deg,
             #131313ff,
              #131313ff 10px,
              transparent 10px,
              transparent 20px
            )`,
            borderRadius: "6px",
            marginBottom:"3rem"
          }}
        />
<Grid
  container
  spacing={2}
  alignItems="center"
  sx={{
    justifyContent: {
      xs: "center",
      md: "space-between",
    },
  }}
>
    {/* Left Section - Logos */}
    <Grid
      item
      xs={12}
      md={4}
      display="flex"
      flexDirection="column"
      alignItems={{ xs: "center", md: "flex-start" }}
      textAlign={{ xs: "center", md: "left" }}
      gap={2}
    >
      {/* Company Logo + Divider */}
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <img
          src="/logotip_svjetlostkomerc.gif"
          alt="Svjetlostkomerc Logo"
          style={{
            filter: "brightness(0) invert(1)",
            opacity: 0.7,
            width: "320px",
            maxWidth: "100%",
          }}
        />

        {/* Divider with text inside */}
       
      </Box>

      {/* Holding Logo */}
  

    </Grid>

    {/* Middle Section - Company Info */}
    <Grid item xs={12} md={5}>
      <Stack
        spacing={1}
        textAlign={{ xs: "center", md: "left" }}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#f9f9f9", fontSize: {xs:"0.8rem", md:"0.9rem"}, opacity: 0.7, fontWeight: "bold", borderLeft: "4px solid #d62d00", pl: 1 }}
        >
          Svjetlostkomerc d.d. Sarajevo
        </Typography>
        <Typography variant="body2" sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"}, color: "#f9f9f9", opacity: 0.7, }}>
          Adresa: Bačići 5, 71000 Sarajevo
        </Typography>
        <Typography variant="body2" sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"}, color: "#f9f9f9", opacity: 0.7, }}>
          JIB: 4200177160001 | PDV: 200177160001
        </Typography>
        <Typography variant="body2" sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"}, color: "#f9f9f9", opacity: 0.7, }}>
          Žiro račun: Intesa SanPaolo 1540012000158885
        </Typography>
        <Typography variant="body2" sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"}, color: "#f9f9f9", opacity: 0.7, }}>
          Email:{" "}
          <Link
            href="mailto:info@svjetlostkomerc.ba"
            underline="hover"
            sx={{ color: "#d62d00", fontWeight: "500" }}
          >
            info@svjetlostkomerc.ba
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"}, color: "#f9f9f9", opacity: 0.7, }}>
          Telefon:{" "}
          <Link
            href="tel:+38733200840"
            underline="hover"
            sx={{ color: "#d62d00", fontWeight: "500" }}
          >
            033/200-840
          </Link>
        </Typography>
      </Stack>
    </Grid>

    {/* Right Section - Social + Copyright */}
    <Grid
      item
      xs={12}
      md={3}
      textAlign={{ xs: "center", md: "right" }}
      display="flex"
      flexDirection="column"
      alignItems={{ xs: "center", md: "flex-end" }}
      gap={2}
    >
      <Typography variant="body2" gutterBottom sx={{ color: "#f9f9f9", opacity: 0.7 }}>
        Pratite nas:
      </Typography>
      <Stack direction="row" spacing={2}>
        <Link
          href="https://www.facebook.com/svjetlostkomerc"
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

      <Typography
        variant="caption"
        sx={{ mt: 2, opacity: 0.7, fontSize: {xs:"0.7rem", md:"0.8rem"}, color: "#f9f9f9" }}
      >
        © {new Date().getFullYear()} Svjetlostkomerc d.d. Sarajevo. Sva prava
        zadržana.
      </Typography>
    </Grid>
  </Grid>
</Box>


  );
};

export default SimpleFooter;
