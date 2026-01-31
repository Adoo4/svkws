import { Box, Chip, Typography, Divider } from "@mui/material";
import { alpha } from "@mui/material";
import React, {useMemo} from 'react'

export default function ActiveFilters({ filters, onRemove, kategorije }) {
  // Helper to get category color
  const categoryColors = React.useMemo(() => {
  const map = {};
  kategorije.forEach((k) => (map[k.naziv] = k.boja));
  return map;
}, [kategorije]);

const getCategoryColor = (category) =>
  categoryColors[category] || "#888"; // fallback color
  

  // -----------------------
  // Reusable Chip Styles
  // -----------------------
  const chipStyle = (color, bgAlpha = 0.15, hoverAlpha = 0.25) => ({
    borderColor: "transparent",
    color: color,
    backgroundColor: alpha(color, bgAlpha),
    fontWeight: 500,
    fontSize: { xs: "0.65rem", sm: "0.75rem" },
    height: { xs: 22, sm: 26 },
    borderRadius: "14px",
    cursor: "default",
    "&:hover": {
      backgroundColor: alpha(color, hoverAlpha),
    },
    "& .MuiChip-deleteIcon": {
      fontSize: { xs: "0.6rem", sm: "0.7rem" },
      color: color,
    },
  });

  // -----------------------
  // Filters to display
  // -----------------------
const activeChips = useMemo(() => [
  filters.mainCategory && {
    label: filters.mainCategory,
    sx: chipStyle(getCategoryColor(filters.mainCategory)),
    onDelete: () => onRemove("mainCategory"),
  },
  filters.subCategory && {
    label: filters.subCategory,
    sx: chipStyle(getCategoryColor(filters.mainCategory), 0.08, 0.18),
    onDelete: () => onRemove("subCategory"),
  },
  filters.language && {
    label: filters.language,
    sx: chipStyle("#007e2aff"),
    onDelete: () => onRemove("language"),
  },
  filters.isNew && {
    label: "Novo",
    sx: chipStyle("#ff6f61"),
    onDelete: () => onRemove("isNew"),
  },
  filters.discount && {
    label: "Popust",
    sx: chipStyle("#ffb703"),
    onDelete: () => onRemove("discount"),
  },
].filter(Boolean), [filters, categoryColors, onRemove]);


  return (
   <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    background: "#1c1c1c",
    p: { xs: 1, sm: 2 },
    mb: { xs: 1, sm: 2 },
    maxHeight: "10rem",
    height: {xs:"9rem", md:"10rem"},
    overflowY: "auto",
    transition: "all 0.3s ease-in-out",
    gap: 1,

    // Subtle thin scrollbar
    "&::-webkit-scrollbar": {
      width: "4px", // tiny vertical scrollbar
      height: "4px", // tiny horizontal scrollbar (if needed)
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.3)", // subtle color
      borderRadius: "2px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },

    // Firefox
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.3) transparent",
  }}
>
      {/* Header */}
      <Typography
        sx={{
          fontSize: { xs: "0.65rem", sm: "0.75rem" },
          fontWeight: 500,
          color: "#f1f1f1",
        }}
      >
        Filteri koji se primjenjuju:
      </Typography>

      <Divider sx={{ borderColor: "#444" }} />

      {/* Chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 0.5, sm: 1 },
          mt: 1,
        }}
      >
        {activeChips.map((chip, index) => (
          <Chip key={index} {...chip} variant="outlined" size="small" />
        ))}
      </Box>
    </Box>
  );
}
