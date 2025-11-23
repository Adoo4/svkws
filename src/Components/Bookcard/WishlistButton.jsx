import { Box, IconButton, Tooltip } from "@mui/material";
import { SignedIn } from "@clerk/clerk-react";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { motion } from "framer-motion";

const WishlistButton = ({
  inWishlist,
  handleWishlistClick,
  openDetails,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
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
              aria-label={
                inWishlist ? "Ukloni iz liste želja" : "Dodaj u listu želja"
              }
              sx={{
                bgcolor: inWishlist ? "#ca1f1f" : "rgba(255,255,255,0.9)",
                p: 0.7,
                transition: "all 0.25s ease",
                boxShadow: inWishlist ? "0 2px 6px rgba(0,0,0,0.25)" : "none",
                "&:hover": {
                  bgcolor: inWishlist ? "#b71b1b" : "rgba(255,255,255,1)",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                },
              }}
            >
              {inWishlist ? (
                <Bookmark sx={{ fontSize: "1.6rem", color: "white" }} />
              ) : (
                <BookmarkBorder sx={{ fontSize: "1.6rem", color: "#262626" }} />
              )}
            </IconButton>
          </motion.div>
        </Tooltip>
      </SignedIn>

      {/* Search / Details Icon - always visible */}
      <IconButton
        onClick={openDetails}
        sx={{
          display: { md: "none" },
          bgcolor: "#262626",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          p: 0.5,
        }}
      >
        <SearchOutlinedIcon sx={{ fontSize: "1.5rem", color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default WishlistButton;
