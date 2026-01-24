import { BorderTop } from "@mui/icons-material";

export const cardStyle = (inWishlist, theme) => ({
  minWidth: { xs: "175px", sm: "210px" },
  maxWidth: { xs: "29vw", sm: "220px", md: "260px" },
  flexGrow: 1,
  borderRadius: 4,
  cursor: "pointer",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  backgroundColor: inWishlist ? "rgb(58, 58, 58)" : "#fff",
  border: "0px solid transparent",
  transition: "background-color .3s, transform .3s, box-shadow .3s",
  boxShadow: 2,
  
  [theme.breakpoints.up("sm")]: {
    "&:hover": {
      boxShadow: "0 12px 36px rgba(0,0,0,0.25)"
    }
  },
  position: "relative",
  
});