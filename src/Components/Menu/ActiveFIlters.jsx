import React from "react";
import { Box, Chip, Typography, Divider } from "@mui/material";
import { alpha } from "@mui/material";

export default function ActiveFilters({ filters, onRemove, kategorije }) {
  const getCategoryColor = (categoryName) => {
    const cat = kategorije.find((k) => k.naziv === categoryName);
    return cat ? cat.boja : "#313131";
  };

  // Hide component if no filters are active
  if (!filters.mainCategory && !filters.subCategory && !filters.language && !filters.isNew && !filters.discount) {
    return null;
  }

  return (
    <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: { xs: 0.5, sm: 1 },
    mb: { xs: 1, sm: 2 },
    ml: { xs: 0.5, sm: 1 },
    alignItems: "center",
             // fixed height for reserved space
    overflowY: "auto",        // allow scroll if too many chips
    pr: 1,                    // small padding for scroll area
    transition: "all 0.3s ease-in-out",
  }}
>
      {/* Label */}
     <Typography
  sx={{
    fontSize: { xs: "0.65rem", sm: "0.75rem" },
    fontWeight: 500,
    color: "#f1f1f1",
    width: "100%",
    mb: 0.5,
    lineHeight: 1.2,   // 👈 reduce internal text spacing
    m: 0,              // 👈 removes browser default margins
  }}
>
  Filteri koji se primjenjuju:
</Typography>



      {/* Divider */}
      <Divider sx={{ width: "100%", mb: 1, borderColor: "#444" }} />

      {/* Main category */}
      {filters.mainCategory && (
        <Chip
          label={filters.mainCategory}
          variant="outlined"
          onDelete={() => onRemove("mainCategory")}
          size="small"
          sx={{
            borderColor: getCategoryColor(filters.mainCategory),
            color: getCategoryColor(filters.mainCategory),
            backgroundColor: alpha(getCategoryColor(filters.mainCategory), 0.15),
            fontWeight: 500,
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
            height: { xs: 22, sm: 26 },
            borderRadius: "14px",
            cursor: "default",
            "&:hover": {
              backgroundColor: alpha(getCategoryColor(filters.mainCategory), 0.25),
            },
            "& .MuiChip-deleteIcon": {
              fontSize: { xs: "0.6rem", sm: "0.7rem" },
              color: getCategoryColor(filters.mainCategory),
            },
          }}
        />
      )}

      {/* Subcategory */}
      {filters.subCategory && (
        <Chip
          label={filters.subCategory}
          variant="outlined"
          onDelete={() => onRemove("subCategory")}
          size="small"
          sx={{
            border:"1px dashed",
            borderColor: alpha(getCategoryColor(filters.mainCategory), 0.6),
            color: getCategoryColor(filters.mainCategory),
            backgroundColor: alpha(getCategoryColor(filters.mainCategory), 0.08),
            fontWeight: 500,
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
            height: { xs: 22, sm: 26 },
            borderRadius: "14px",
            "&:hover": {
              backgroundColor: alpha(getCategoryColor(filters.mainCategory), 0.18),
            },
            "& .MuiChip-deleteIcon": {
              fontSize: { xs: "0.6rem", sm: "0.7rem" },
              color: getCategoryColor(filters.mainCategory),
            },
          }}
        />
      )}

      {/* Language */}
      {filters.language && (
        <Chip
  label={filters.language}
  variant="outlined"
  onDelete={() => onRemove("language")}
  size="small"
  sx={{
    borderColor: "transparent",
    color: "#f0f0f0", // pick your new color here
    backgroundColor: alpha("#007e2aff", 0.15), // semi-transparent background alpha("#007e2aff", 0.15)
    fontWeight: 500,
    fontSize: { xs: "0.65rem", sm: "0.75rem" },
    height: { xs: 22, sm: 26 },
    borderRadius: "14px",
    "&:hover": { backgroundColor: alpha("#007e2aff", 0.25) },
    "& .MuiChip-deleteIcon": {
      fontSize: { xs: "0.6rem", sm: "0.7rem" },
      color: "#007e2aff", // match the text color
    },
  }}
/>

      )}

      {/* isNew */}
      {filters.isNew && (
        <Chip
          label="Novo"
          variant="outlined"
          onDelete={() => onRemove("isNew")}
          size="small"
          sx={{
            borderColor: "transparent",
            color: "#f0f0f0",
            backgroundColor: alpha("#ff6f61", 0.15),
            fontWeight: 500,
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
            height: { xs: 22, sm: 26 },
            borderRadius: "14px",
            "&:hover": { backgroundColor: alpha("#ff6f61", 0.25) },
            "& .MuiChip-deleteIcon": {
              fontSize: { xs: "0.6rem", sm: "0.7rem" },
              color: "#ff6f61",
            },
          }}
        />
      )}

      {/* Discount */}
      {filters.discount && (
        <Chip
          label="Popust"
          variant="outlined"
          onDelete={() => onRemove("discount")}
          size="small"
          sx={{
            borderColor: "transparent",
            color: "#f0f0f0",
            backgroundColor: alpha("#ffb703", 0.15),
            fontWeight: 500,
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
            height: { xs: 22, sm: 26 },
            borderRadius: "14px",
            "&:hover": { backgroundColor: alpha("#ffb703", 0.25) },
            "& .MuiChip-deleteIcon": {
              fontSize: { xs: "0.6rem", sm: "0.7rem" },
              color: "#ffb703",
            },
          }}
        />
      )}
    </Box>
  );
}
