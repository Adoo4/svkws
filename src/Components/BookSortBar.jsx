import {
  Stack,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";


import { alpha } from "@mui/material/styles";



const chipBg = alpha("#ffffff", 0.08);
const chipHover = alpha("#ffffff", 0.15);

const selectSx = {
  minWidth: 120,
  borderRadius: "14px",
  fontSize: "0.75rem",
  backgroundColor: chipBg,
  color: "#fff",
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: chipHover,
    transform: "translateY(-1px)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid transparent",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f33600",
  },
  "& svg": {
    color: "#fff",
  },
};




const BooksSortBar = ({ sort, setSort, order, setOrder }) => {
  

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        background: "#313131",
        px: 2,
        py: 0.5,
        borderRadius: "16px",
        mt: {xs:1,lg:"4rem"},
        mr:"1rem"
      }}
    >
      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#f7f7f7",
          fontWeight: 400,
        }}
      >
        Sortiraj:
      </Typography>

      {/* SORT FIELD */}
      <FormControl size="small">
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          displayEmpty
          sx={selectSx}
            MenuProps={{
    disableScrollLock: true,
  }}

        >
          <MenuItem value="" sx={{fontSize:"0.8rem"}}>Bez sortiranja</MenuItem>
          <MenuItem value="title" sx={{fontSize:"0.8rem"}}>Naziv</MenuItem>
          <MenuItem value="price" sx={{fontSize:"0.8rem"}}>Cijena</MenuItem>
        </Select>
      </FormControl>

      {/* ORDER FIELD */}
      {sort !== "" && (
        <FormControl size="small">
          <Select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            displayEmpty
            sx={selectSx}
              MenuProps={{
    disableScrollLock: true,
  }}

          >
            <MenuItem value="" sx={{fontSize:"0.8rem"}}>Bez sortiranja</MenuItem>
            <MenuItem value="asc" sx={{fontSize:"0.8rem"}}>Uzlazno</MenuItem>
            <MenuItem value="desc" sx={{fontSize:"0.8rem"}}>Silazno</MenuItem>
          </Select>
        </FormControl>
      )}
    </Stack>
  );
};

export default BooksSortBar;
