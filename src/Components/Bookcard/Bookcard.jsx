// React
import React, { memo, useMemo, useCallback, lazy, Suspense } from "react";

// MUI components
import Card from "@mui/material/Card";

// Router
import { useNavigate } from "react-router-dom";

// Auth
import { useUser, useClerk } from "@clerk/clerk-react";

// Utilities
import { kategorijeMap } from "../../Utils.js/kategorijeMap";

// Local components/styles
import { cardStyle } from "./cardstyle";
import BookCardSkeleton from "./BookCardSkeleton";

const BookCardDesktop = lazy(() => import("./BookCardDesktop"));
const BookCardMobile = lazy(() => import("./BookcardMobile"));

const DesktopBookCardContent = ({ sharedProps }) => {
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  return (
    <BookCardDesktop
      {...sharedProps}
      isSignedIn={isSignedIn}
      addToCart={sharedProps.addToCartFromParent}
      isAdding={sharedProps.isAddingFromParent}
      isAddingBook={sharedProps.isAddingBookFromParent}
      clerk={clerk}
    />
  );
};

const BookCard = ({
  book,
  loading = false,
  toggleDrawer,
  setDrawerData,
  index,
  isMobile = false,
  inWishlistFromParent = false,
  onWishlistToggle,
  addToCartFromParent,
  isAddingFromParent = false,
  isAddingBookFromParent,
}) => {
  const navigate = useNavigate();
  const inWishlist = Boolean(inWishlistFromParent);

  const handleWishlistClick = useCallback(
    (e) => {
      e.stopPropagation();
      onWishlistToggle?.(book, inWishlist);
    },
    [onWishlistToggle, book, inWishlist],
  );

  const openDetails = useCallback(() => {
    navigate(`/books/${book.slug}${window.location.search}`, {
      state: { book, category: book.subCategory },
    });
  }, [book, navigate]);

  const hasDiscount = useMemo(
    () =>
      book.discount?.amount > 0 &&
      (!book.discount?.validUntil || new Date(book.discount.validUntil) > new Date()),
    [book.discount],
  );

  const categoryMatch =
    kategorijeMap[book.mainCategory?.toLowerCase()] ||
    kategorijeMap[book.subCategory?.toLowerCase()] ||
    null;

  const mainCategory = kategorijeMap[book.mainCategory?.toLowerCase()] || null;

  const sharedProps = {
    book,
    index,
    inWishlist,
    hasDiscount,
    categoryMatch,
    mainCategory,
    handleWishlistClick,
    openDetails,
    toggleDrawer,
    setDrawerData,
    isMobile,
    addToCartFromParent,
    isAddingFromParent,
    isAddingBookFromParent,
  };

  if (loading) return <BookCardSkeleton />;

  return (
    <Card elevation={0} sx={(theme) => cardStyle(inWishlist, theme)}>
      <Suspense fallback={<BookCardSkeleton />}>
        {isMobile ? (
          <BookCardMobile {...sharedProps} />
        ) : (
          <DesktopBookCardContent sharedProps={sharedProps} />
        )}
      </Suspense>
    </Card>
  );
};

export default memo(BookCard);
