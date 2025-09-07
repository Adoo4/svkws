import * as React from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";

export default function LanguageSelect({ filter, setFilter }) {
  const handleChange = (event) => {
    setFilter((prev) => ({
      ...prev,
      bookLanguage: event.target.value, // ✅ must be bookLanguage
    }));
  };

  return (
    <Box sx={{ minWidth: 250, width: "100%" }}>
      <FormControl fullWidth sx={{ borderRadius: 2, backgroundColor: "#262626" }}>
        <InputLabel
          id="language-select-label"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#f7f7f7",
            "&.Mui-focused": { color: "#f7f7f7", fontSize: "1rem" },
          }}
        >
          <Typography sx={{ fontSize: "0.75rem" }}>Jezik</Typography>
        </InputLabel>

        <Select
          labelId="language-select-label"
          id="language-select"
          value={filter.bookLanguage || ""}  // ✅ fixed here
          onChange={handleChange}
         sx={{
    color: "#f7f7f7",
    backgroundColor: "#313131",
    borderRadius: 2,
    height: "3rem",
    fontSize: "0.75rem", // 👈 fixes displayed value
    "& .MuiSelect-select": {
      fontSize: "0.75rem", // 👈 ensures text inside select is smaller
      display: "flex",
      alignItems: "center",
    },
    "& .MuiSelect-icon": { color: "#d62d00" },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#313131",
      borderRadius: 2,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#313131" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#313131" },
  }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#313131",
                color: "#f7f7f7",
                "& .MuiMenuItem-root": {
                  color: "#f7f7f7",
                  "&:hover": { backgroundColor: "#262626", color: "#d62d00" },
                },
              },
            },
            anchorOrigin: { vertical: "top", horizontal: "left" },
            transformOrigin: { vertical: "bottom", horizontal: "left" },
          }}
        >
          <MenuItem sx={{ fontSize: "0.75rem" }} value={""} >
            Svi
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.75rem" }} value={"English"}>
            Engleski
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.75rem" }} value={"Bosnian"}>
            B/H/S
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
