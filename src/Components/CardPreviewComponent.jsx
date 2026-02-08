// MUI components (direct imports)
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

// MUI icons (direct imports)
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

// React Router
import { useNavigate } from 'react-router-dom';



export default function AnchorTemporaryDrawer({ toggleDrawer, open, drawerData }) {

   const navigate = useNavigate()
  if (!drawerData) return null;

 

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      TransitionComponent={Slide}
      SlideProps={{
        direction: "left",
        timeout: { enter: 250, exit: 200 },
      }}
      ModalProps={{ keepMounted: true }}
      transitionDuration={{ enter: 250, exit: 200 }}
      PaperProps={{
        sx: {
          width: { xs: 230, sm: 250, md: 300 },
          height: "100%",
          background: "linear-gradient(to bottom, #262626, #262626)",
          color: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          overflow: "auto", // make the whole drawer scrollable
          paddingTop: { xs: "3rem", md: "4rem" },
        },
      }}
    >
      {/* Cover Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: {xs:350, sm:370, md: 450, lg:450},
          height:"100%",
          maxHeight: 500, // optional: limit huge images
          overflow: "hidden",
        }}
      >
        <img
          src={drawerData.coverImage || "/fallback-cover.jpg"}
          alt={drawerData.title || "Book Cover"}
          width="300"
          height="450"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(38,38,38,0.9), transparent)",
          }}
        />
      </Box>

      {/* Book Info */}
      <Box
        sx={{
          px: 1,
          py: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Title & Badges */}
        <Typography variant="h7" sx={{ fontWeight: "bold", lineHeight: 1.3 }}>
          {drawerData.title}
          {(drawerData.isNew || (drawerData.discountAmount > 0)) && (
            <Grid item xs={12} display="flex" gap={1} mt={0.5}>
              {drawerData.isNew && (
                <Chip label="Novo" size="small" color="success" sx={{ fontSize: "0.7rem" }} />
              )}
              {drawerData.discountAmount > 0 && (
                <Chip
                  label={`${drawerData.discountAmount}% Popust`}
                  size="small"
                  color="error"
                  sx={{ fontSize: "0.7rem" }}
                />
              )}
            </Grid>
          )}
        </Typography>

        {/* Key Info Grid */}
        <Grid container spacing={0} alignItems="center">
          {/* Author */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={0.5}>
            <PersonIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#f7f7f7f7" }}>
              {drawerData.author
                ?.split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(" ")}
            </Typography>
          </Grid>

          {/* Language */}
          <Grid item xs={6} sm={6} display="flex" alignItems="center" gap={0.5}>
            <LanguageIcon sx={{ fontSize: 16, opacity: 0.8 }} />
            <Typography sx={{ fontSize: { xs: "0.70rem", md: "0.75rem" }, color: "#f7f7f7f7" }}>
              {drawerData.language}
            </Typography>
          </Grid>

          {/* Pages */}
          <Grid item xs={6} sm={6} display="flex" alignItems="center" gap={0.5}>
            <MenuBookIcon sx={{ fontSize: 16, opacity: 0.8 }} />
            <Typography sx={{ fontSize: { xs: "0.70rem", md: "0.75rem" }, color: "#f7f7f7f7" }}>
              {drawerData.pages} stranica
            </Typography>
          </Grid>

          {/* Publisher */}
          <Grid item xs={6} sm={6} display="flex" alignItems="center" gap={0.5}>
            <CorporateFareIcon sx={{ fontSize: 16, opacity: 0.8 }} />
            <Typography sx={{ fontSize: { xs: "0.70rem", md: "0.75rem" }, color: "#f7f7f7f7" }}>
              {drawerData.publisher}
            </Typography>
          </Grid>

          {/* Publication Year */}
          <Grid item xs={6} sm={6} display="flex" alignItems="center" gap={0.5}>
            <CalendarMonthIcon sx={{ fontSize: 16, opacity: 0.8 }} />
            <Typography sx={{ fontSize: { xs: "0.70rem", md: "0.75rem" }, color: "#f7f7f7f7" }}>
              {drawerData.publicationYear}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.92)",
            mt: 1,
            pr: 1.5,
          }}
        >
          {drawerData.description || "No description available."}
        </Typography>
        <Button
  onClick={() => {
    navigate(`/books/${drawerData.slug}${window.location.search}`, {
      state: { drawerData, category: drawerData.subCategory },
    });
  }}
  fullWidth
  sx={{
    mt: 2,
    textTransform: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.4px",
    color: "#f9f9f9",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    py: 0.8,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
    backdropFilter: "blur(6px)",
    transition: "all 0.25s ease",
    "&:hover": {
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
      borderColor: "rgba(255,255,255,0.5)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  }}
>
  Još Detalja
</Button>

      </Box>
    </Drawer>
  );
}
