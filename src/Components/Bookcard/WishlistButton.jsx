import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { SignedIn } from "@clerk/clerk-react";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { motion } from "framer-motion";



const WishlistButton = ({
  inWishlist,
  handleWishlistClick,
  openDetails,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
       
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        alignItems: "center",
      }}
    >
      {/* Wishlist Icon - only if signed in */}
     <SignedIn>
  <Tooltip
    title={inWishlist ? "Ukloni iz liste želja" : "Dodaj u listu želja"}
  >
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <IconButton
        onClick={handleWishlistClick}
        size="small"
        sx={{
          p: 0.5,
        }}
      >
        {inWishlist ? (
          <Bookmark sx={{ fontSize: "1.6rem" }} color="error" />
        ) : (
          <BookmarkBorder sx={{ fontSize: "1.6rem", color: "#262626" }} />
        )}
      </IconButton>
    </motion.div>
  </Tooltip>
</SignedIn>


      {/* Search / Details Icon - always visible */}
      
    </Box>
  );
};

export default WishlistButton;
