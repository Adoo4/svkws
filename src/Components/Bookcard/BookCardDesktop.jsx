// React
import React, { memo } from "react";

// MUI components (direct imports)
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// Local components
import CardImage from "../Bookcard/Image";
import BookCardContent from "../Bookcard/BookCardContent";
import BookCardActionsBottom from "./BookcardActionButtons";



const BookCardDesktop = React.memo(({
  book,
  inWishlist,
  hasDiscount,
  categoryMatch,
  mainCategory,
  handleWishlistClick,
  openDetails,
  setDrawerData,
  toggleDrawer,
  isSignedIn,
  addToCart,
  isAdding,
  clerk,
}) => {


  return (
    <>
      {/* Badges */}
      {book.isNew && (
        <Chip label="Novo" color="success" size="small" sx={{ position: "absolute", top: 8, left: 8, zIndex:2 }} />
      )}

      {hasDiscount && (
        <Chip
          label={`-${book.discount.amount}%`}
          color="error"
          size="small"
          sx={{ position: "absolute", top: book.isNew ? 36 : 8, left: 8, zIndex:2 }}
        />
      )}

     

      <CardImage book={book} toggleDrawer={toggleDrawer} setDrawerData={setDrawerData} />

      <Box sx={{ px: 1, py: 1, flexGrow: 1 }}>
        <BookCardContent
          book={book}
          inWishlist={inWishlist}
          categoryMatch={categoryMatch}
          mainCategory={mainCategory}
          hasDiscount={hasDiscount}
          handleWishlistClick={handleWishlistClick}
          openDetails={openDetails}
  
        />

        <BookCardActionsBottom
          book={book}
          inWishlist={inWishlist}
          isSignedIn={isSignedIn}
          addToCart={addToCart}
          isAdding={isAdding}
          clerk={clerk}
        />
      </Box>
    </>
  );
})

export default memo(BookCardDesktop);
