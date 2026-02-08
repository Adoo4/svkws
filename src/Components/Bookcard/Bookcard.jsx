// React
import React, { memo, useMemo, useCallback, lazy, Suspense } from "react";

// MUI components
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Router
import { useNavigate } from "react-router-dom";

// Notifications
import { useSnackbar } from "notistack";

// Auth
import { useUser, useClerk } from "@clerk/clerk-react";

// Utilities
import { kategorijeMap } from "../../Utils.js/kategorijeMap";
import { useWishlist } from "../../Utils.js/useWishlist";
import useCart from "../../Utils.js/useCart";

// Local components/styles
import { cardStyle } from "./cardstyle";
import BookCardSkeleton from "./BookCardSkeleton";

const BookCardDesktop = lazy(() => import("./BookCardDesktop"));
const BookCardMobile = lazy(() => import("./BookcardMobile"));

const BookCard = ({ book, loading = false, toggleDrawer, setDrawerData, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isSignedIn } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const { isAdding, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const clerk = useClerk();
  const navigate = useNavigate();

  // Check if the book is in the wishlist
  const inWishlist = useMemo(() => wishlist.some((item) => item._id === book._id), [
    wishlist,
    book._id,
  ]);

  // Wishlist handler
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

  // Navigate to book details
  const openDetails = useCallback(() => {
    navigate(`/books/${book.slug}${window.location.search}`, {
      state: { book, category: book.subCategory },
    });
  }, [book, navigate]);

  // Discount check
  const hasDiscount = useMemo(
    () =>
      book.discount?.amount > 0 &&
      (!book.discount?.validUntil || new Date(book.discount.validUntil) > new Date()),
    [book.discount]
  );

  // Category mapping
  const categoryMatch =
    kategorijeMap[book.mainCategory?.toLowerCase()] ||
    kategorijeMap[book.subCategory?.toLowerCase()] ||
    null;

  const mainCategory = kategorijeMap[book.mainCategory?.toLowerCase()] || null;

  // Shared props for Desktop/Mobile
  const sharedProps = {
    book,
    index,
    inWishlist,
    hasDiscount,
    categoryMatch,
    mainCategory,
    handleWishlistClick,
    openDetails,
    isSignedIn,
    addToCart,
    isAdding,
    clerk,
    toggleDrawer, 
    setDrawerData
  };

  // Render skeleton if loading
  if (loading) return <BookCardSkeleton />;

  return (
    <Card elevation={0} sx={(theme) => cardStyle(inWishlist, theme)}>
      <Suspense fallback={<BookCardSkeleton />}>
        {isMobile ? <BookCardMobile {...sharedProps} /> : <BookCardDesktop {...sharedProps} />}
      </Suspense>
    </Card>
  );
};

export default memo(BookCard);
