import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Grid, Chip } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function AnchorTemporaryDrawer({ toggleDrawer, open, drawerData }) {
  if (!drawerData) return null;

 const finalPrice = drawerData.discountedPrice?.toFixed(2) || drawerData.priceWithVAT?.toFixed(2) || drawerData.price.toFixed(2);


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: { xs: 250, sm: 320, md: 360 },
          background: "linear-gradient(to bottom, #262626, #262626)",
          color: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          paddingTop:{xs:"3rem", md:"4rem"}
        },
      }}
    >
      {/* Cover Image */}
      <Box sx={{ position: "relative", width: "100%", minHeight: 300, overflow: "hidden" }}>
        <img
          src={drawerData.coverImage || "/fallback-cover.jpg"}
          alt={drawerData.title || "Book Cover"}
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top" }}
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
      <Box sx={{ px: 2, py: 2, display: "flex", flexDirection: "column", gap: 2, flexGrow: 1, overflowY: "auto" }}>
        {/* Title */}
        <Typography variant="h7" sx={{ fontWeight: "bold", lineHeight: 1.3 }}>
          {drawerData.title}          {/* Badges */}
        {(drawerData.isNew || (drawerData.discount && drawerData.discount.amount > 0)) && (
  <Grid item xs={12} display="flex" gap={1} mt={0.5}>
    {drawerData.isNew && (
      <Chip label="Novo" size="small" color="success" sx={{ fontSize: "0.7rem" }} />
    )}
   {drawerData.discountAmount > 0 && (
  <Chip label={`${drawerData.discountAmount}% Popust`} size="small" color="error" sx={{ fontSize: "0.7rem" }} />
)}
  </Grid>
)}
        </Typography>
        

        {/* Key Info Grid */}
        <Grid container spacing={1} alignItems="center">
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

          {/* Price */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={0.5}>
            <LocalOfferIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7f7" }}>{finalPrice} KM</Typography>
          </Grid>

          {/* Language */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={0.5}>
            <LanguageIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7f7" }}>{drawerData.language}</Typography>
          </Grid>

          {/* Pages */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={0.5}>
            <MenuBookIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7f7" }}>{drawerData.pages} stranica</Typography>
          </Grid>

          {/* Publisher */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={0.5}>
            <CorporateFareIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7f7" }}>{drawerData.publisher}</Typography>
          </Grid>

          {/* Publication Year */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={0.5}>
            <AttachMoneyIcon sx={{ fontSize: 18, opacity: 0.8, visibility: "hidden" }} /> {/* spacer */}
            <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7f7" }}>{drawerData.publicationYear}</Typography>
          </Grid>

          {/* Stock / Quantity */}
          <Grid item xs={12} display="flex" alignItems="center" gap={0.5}>
            <Inventory2Icon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7f7" }}>
              {drawerData.quantity > 0 ? `${drawerData.quantity} na stanju` : "Nema na stanju"}
            </Typography>
          </Grid>

 

        </Grid>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
            lineHeight: { xs: 1.6, md: 1.7 },
            color: "rgba(245,245,245,0.88)",
            textAlign: { xs: "left", sm: "justify" },
            whiteSpace: "pre-line",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            maxHeight: { xs: 250, md: 300 },
            overflowY: "auto",
            pr: 1.5,
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: "8px" },
          }}
        >
          {drawerData.description || "No description available."}
        </Typography>
      </Box>
    </Drawer>
  );
}
