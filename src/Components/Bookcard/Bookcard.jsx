import { Card, Box, Chip } from "@mui/material";

import { useUser, useClerk } from "@clerk/clerk-react";
import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useWishlist } from "../../Utils.js/useWishlist"; // your hook
import useCart from "../../Utils.js/useCart";
import { motion } from "framer-motion";
import kategorije from "../../Utils.js/kategorije";
import { cardStyle } from "./cardstyle";
import CardImage from "../Bookcard/Image";
import BookCardContent from "../Bookcard/BookCardContent";
import WishlistButton from "./WishlistButton";
import BookCardActionsBottom from "./BookcardActionButtons";

const BookCard = ({ book, setDrawerData, toggleDrawer }) => {
  const { isSignedIn } = useUser();
  const isNew = book.isNew;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isAdding, addToCart } = useCart();
  const clerk = useClerk();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  // state to control heart icon
  // local state for heart icon
  const [inWishlist, setInWishlist] = useState(false);

  // sync with wishlist
  useEffect(() => {
    setInWishlist(wishlist.some((item) => item._id === book._id));
  }, [wishlist, book._id]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(book._id);
      enqueueSnackbar(`${book.title} uklonjena iz liste želja.`, {
        variant: "info",
        autoHideDuration: 2000,
      });
    } else {
      addToWishlist(book);
      enqueueSnackbar(`${book.title} dodana u listu želja!`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  const categoryMatch = useMemo(() => {
    return kategorije.find(
      (k) =>
        k.naziv === book.mainCategory ||
        k.podkategorije?.includes(book.subCategory)
    );
  }, [book.mainCategory, book.subCategory]);

  const openDetails = useCallback(() => {
    navigate(`/${book._id}${window.location.search}`, {
      state: { book, category: book.subCategory },
    });
  }, [book, navigate]);

  const hasDiscount =
    book.discount &&
    book.discount.amount > 0 &&
    (!book.discount.validUntil ||
      new Date(book.discount.validUntil) > new Date());

  const finalPrice = hasDiscount
    ? (book.price * (100 - book.discount.amount)) / 100
    : book.price;

  // Then when rendering cart, compute price:
  const formatCategoryName = (name) => {
    if (!name) return "";
    const lower = name.toLowerCase();
    if (lower === "ekonomija i biznis") return "Ekonomija";
    if (lower === "naučna i stručna literatura") return "Stručna literatura";
    if (lower === "literatura za djecu i mlade") return "Literatura za mlade";
    return name;
  };

  const mainCategory = useMemo(() => {
    return kategorije.find(
      (k) => k.naziv.toLowerCase() === book.mainCategory?.toLowerCase()
    );
  }, [book.mainCategory]);



  const contentBoxSx = useMemo(
  () => ({
    px: { xs: 1, sm: 1 },
    py: 1,
    flexGrow: 1,
  }),
  []
);

const newBadgeSx = useMemo(
  () => ({
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 5,
    fontWeight: "bold",
    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
  }),
  []
);

const discountBadgeSx = useMemo(
  () => ({
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 5,
    fontWeight: "bold",
    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
  }),
  []
);

const discountBadgeTop = isNew ? 36 : 8;


  return (
    
      <Card elevation={0} sx={(theme) => cardStyle(inWishlist, theme)}>
        {/* Badges */}
       {isNew && (
  <Chip
    label="Novo"
    color="success"
    size="small"
    sx={newBadgeSx}
  />
)}

{hasDiscount && (
  <Chip
    label={`-${book.discount.amount}%`}
    color="error"
    size="small"
    sx={{ ...discountBadgeSx, top: discountBadgeTop }}
  />
)}

        {/* Wishlist Icon */}
        <WishlistButton
          inWishlist={inWishlist}
          handleWishlistClick={handleWishlistClick}
          openDetails={openDetails}
        />

        {/* Image */}
        <CardImage
          book={book}
          toggleDrawer={toggleDrawer}
          setDrawerData={setDrawerData}
        />
       <Box sx={contentBoxSx}>
          {/* Card Content */}
          <BookCardContent
            book={book}
            inWishlist={inWishlist}
            categoryMatch={categoryMatch}
            mainCategory={mainCategory}
            finalPrice={finalPrice}
            hasDiscount={hasDiscount}
            formatCategoryName={formatCategoryName}
          />
          {/* Actions */}
          <BookCardActionsBottom
            book={book}
            inWishlist={inWishlist}
            isSignedIn={isSignedIn}
            addToCart={addToCart}
            isAdding={isAdding}
            clerk={clerk}
          />
        </Box>
      </Card>
    
  );
};

export default memo(BookCard);
