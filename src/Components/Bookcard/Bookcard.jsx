import { Card, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUser, useClerk } from "@clerk/clerk-react";

import { useWishlist } from "../../Utils.js/useWishlist";
import useCart from "../../Utils.js/useCart";
import kategorije from "../../Utils.js/kategorije";
import { cardStyle } from "./cardstyle";

import BookCardDesktop from "./BookCardDesktop";
import BookCardMobile from "./BookcardMobile";

const BookCard = ({ book, setDrawerData, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isSignedIn } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const { isAdding, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const clerk = useClerk();
  const navigate = useNavigate();

  const inWishlist = useMemo(() => wishlist.some(item => item._id === book._id), [wishlist, book._id]);


  /* ---------------- Handlers ---------------- */
  const handleWishlistClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (inWishlist) {
        removeFromWishlist(book._id);
        enqueueSnackbar(`${book.title} uklonjena iz liste želja.`, { variant: "info" });
      } else {
        addToWishlist(book);
        enqueueSnackbar(`${book.title} dodana u listu želja!`, { variant: "success" });
      }
    },
    [inWishlist, book, addToWishlist, removeFromWishlist, enqueueSnackbar]
  );

  const openDetails = useCallback(() => {
   navigate(`/books/${book.slug}${window.location.search}`, {
  state: { book, category: book.subCategory },
});
  }, [book, navigate]);

  /* ---------------- Derived state ---------------- */
  const hasDiscount = useMemo(() => {
  return (
    book.discount?.amount > 0 &&
    (!book.discount?.validUntil || new Date(book.discount.validUntil) > new Date())
  );
}, [book.discount]);

  const categoryMatch = useMemo(
    () =>
      kategorije.find(
        (k) =>
          k.naziv === book.mainCategory ||
          k.podkategorije?.includes(book.subCategory)
      ),
    [book.mainCategory, book.subCategory]
  );

  const mainCategory = useMemo(
    () =>
      kategorije.find(
        (k) => k.naziv.toLowerCase() === book.mainCategory?.toLowerCase()
      ),
    [book.mainCategory]
  );

  /* ---------------- Shared props ---------------- */
 const sharedProps = useMemo(() => ({
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
}), [
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
  clerk
]);

  return (
    <Card elevation={0} sx={(theme) => cardStyle(inWishlist, theme)}>
      {isMobile ? (
        <BookCardMobile {...sharedProps} />
      ) : (
        <BookCardDesktop {...sharedProps} />
      )}
    </Card>
  );
};

export default memo(BookCard);
