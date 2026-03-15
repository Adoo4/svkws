
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export default function LanguageSelect({ filter, setFilter, setPage }) {
 const handleChange = (event) => {
    const value = event.target.value;
    setFilter((prev) => ({
      ...prev,
      language: value === "Svi" ? "" : value, // "" means no filter
    }));
   
     setPage(1);
  };

  return (
    <Box sx={{ minWidth: 250, width: "100%" }}>
      <FormControl
        fullWidth
        sx={{ borderRadius: 2, backgroundColor: "#262626" }}
      >
        <InputLabel
          id="language-select-label"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#f7f7f7",
            "&.Mui-focused": { color: "#f7f7f7", fontSize: "1rem" },
          }}
        >
          <LanguageIcon sx={{ fontSize: "1rem", color: "#007e2aff" }} />
          <Typography sx={{ fontSize: "0.75rem" }}>Jezik</Typography>
        </InputLabel>

        <Select
          labelId="language-select-label"
          id="language-select"
            value={filter.language || "Svi"} 
          onChange={handleChange}
          sx={{
            color: "#f7f7f7",
            backgroundColor: "#313131",
            borderRadius: 2,
            height: "2.5rem",
            fontSize: "0.75rem",
            "& .MuiSelect-select": {
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiSelect-icon": { color: "#007e2aff" },
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
          <MenuItem sx={{ fontSize: "0.75rem" }} value={"Svi"}>
            Svi
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.75rem" }} value={"Engleski"}>
            Engleski
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.75rem" }} value={"Bosanski"}>
            Bosanski
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.75rem" }} value={"Njemački"}>
            Njemački
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
