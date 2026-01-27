import { Box, Chip, Typography, Button } from "@mui/material";
import CardImage from "../Bookcard/Image";
import WishlistButton from "./WishlistButton";

import Battery0BarOutlinedIcon from "@mui/icons-material/Battery0BarOutlined";
import Battery3BarOutlinedIcon from "@mui/icons-material/Battery3BarOutlined";

import Battery5BarOutlinedIcon from "@mui/icons-material/Battery5BarOutlined";
import { alpha } from "@mui/material/styles";

const BookCardMobile = ({
  book,
  inWishlist,
  hasDiscount,
  categoryMatch,
  handleWishlistClick,
  openDetails,
  setDrawerData,
  toggleDrawer,
}) => {
  const finalPrice = hasDiscount
    ? book.discountedPrice
    : book.mpc;


  return (
    <>
      {/* Badges */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          flexDirection: "column",
          alignItems:"flex-end",
          gap: 0.5,
          zIndex: 2,

        }}
      >
        {book.isNew && (
          <Chip
            label="Novo"
            color="success"
            size="small"
            sx={{
              fontSize: "0.6rem",
              fontWeight: 600,
              height: 20,
            }}
          />
        )}

        {hasDiscount && (
          <Chip
            label={`-${book.discount.amount}%`}
            color="error"
            size="small"
            sx={{
              fontSize: "0.6rem",
              fontWeight: 700,
              height: 20,
            }}
          />
        )}

        
      </Box>

    

      {/* Cover */}
      <CardImage
        book={book}
        toggleDrawer={toggleDrawer}
        setDrawerData={setDrawerData}
      />

      {/* Content */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ px: 1, py: 0.8, flexGrow: 8 }}>
          
          {/*Title and Wishlist*/}
          {/* Title */}
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.85rem",
              lineHeight: 1.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 0.4,
            }}
          >
            {book.title}
          </Typography>
            {/* Wishlist button */}
      <WishlistButton
        inWishlist={inWishlist}
        handleWishlistClick={handleWishlistClick}
        openDetails={openDetails}
      />
      </Box>

          {/* Author */}
         <Typography
  sx={{
    fontSize: { xs: "0.75rem", sm: "0.85rem" }, // responsive font size
    color: "text.secondary",
    mb: 0.6,
    lineHeight: 1.2,
    display: "-webkit-box",       // for line clamp
    WebkitLineClamp: 1,          // limits to 1 line
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",               // ensures proper ellipsis
    whiteSpace: "normal",        // allows wrapping if needed
  }}
  title={book.author}             // shows full text on hover
>
  {book.author}
</Typography>



 <Typography
  sx={{
    fontSize: { xs: "0.7rem", sm: "0.8rem" }, // responsive font size
    color: categoryMatch?.boja,
    mb: 0.6,
    fontWeight:600,
    lineHeight: 1.2,
    display: "-webkit-box",       // for line clamp
    WebkitLineClamp: 1,          // limits to 1 line
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",               // ensures proper ellipsis
    whiteSpace: "normal",        // allows wrapping if needed
  }}
  title={book.subCategory}             // shows full text on hover
>
  {book.subCategory}
</Typography>

         <Typography
  sx={{
    fontSize: { xs: "0.7rem", sm: "0.8rem" }, // responsive font size
    color: "text.secondary",
    mb: 0.6,
    lineHeight: 1.1,
    display: "-webkit-box",       // for line clamp
    WebkitLineClamp: 3,          // limits to 1 line
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",               // ensures proper ellipsis
    whiteSpace: "normal",        // allows wrapping if needed
  }}
  title={book.description}             // shows full text on hover
>
  {book.description}
</Typography>


          {/* Price + stock */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.6,
            }}
          >
            {/* Price */}
<Box>
  {hasDiscount ? (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "error.main",
        }}
      >
        {finalPrice.toFixed(2)} KM
      </Typography>
      <Typography
        sx={{
          fontSize: "0.65rem",
          textDecoration: "line-through",
          color: "text.disabled",
        }}
      >
        {book.mpc.toFixed(2)} KM
      </Typography>
    </>
  ) : (
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "0.95rem",
      }}
    >
      {finalPrice.toFixed(2)} KM
    </Typography>
  )}

  {/* Always show this */}
  <Typography sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
    *sa PDV-om
  </Typography>
</Box>

               <Chip
  label={
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Typography sx={{ fontSize: "0.65rem", fontWeight: 500 }}>
        Zalihe:
      </Typography>

      {book.quantity <= 0 ? (
        <Battery0BarOutlinedIcon sx={{ fontSize: 18, transform:"rotate(-90deg)" }} />
      ) : book.quantity <= 5 ? (
        <Battery3BarOutlinedIcon sx={{ fontSize: 18, transform:"rotate(-90deg)" }} />
      ) : (
        <Battery5BarOutlinedIcon sx={{ fontSize: 18, transform:"rotate(-90deg)" }} />
      )}
    </Box>
  }
  size="small"
  sx={{
    height: 22,
    px: 0.5,
    fontSize: "0.65rem",
    fontWeight: 600,
    color: (theme) => {
      if (book.quantity <= 0) return theme.palette.error.contrastText;
      if (book.quantity <= 5) return theme.palette.warning.contrastText;
      return theme.palette.success.contrastText;
    },
    bgcolor: (theme) => {
  if (book.quantity <= 0)
    return alpha(theme.palette.error.main, 0.75);
  if (book.quantity <= 5)
    return alpha(theme.palette.warning.main, 0.75);
  return alpha(theme.palette.success.main, 0.75);
},
  }}
/>



          </Box>
        </Box>
        <Box>
    

        </Box>
        
      </Box>
       
      
      <Box sx={{display:"flex", gap:1}}>
         <Button
          variant="contained"
          size="small"
          fullWidth
          sx={{ mt: 0, backgroundColor:"#262626", fontSize:"0.65rem", p:0.5 }}
          onClick={openDetails}
        >
          Detalji
        </Button>
         
      </Box>
    </>
  );
};

export default BookCardMobile;
