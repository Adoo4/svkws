import { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ProductGallery from "../Components/ProductGallery";
import Menu from "../Components/Menu/Menu";
import SearchBarTop from "../Components/SearchBarTop";
import AnchorTemporaryDrawer from "../Components/CardPreviewComponent";
import BookSortBar from "../Components/BookSortBar";
import useBooks from "../Utils.js/useBooks";
import SEO from "../Utils.js/SEO";
import useMediaQuery from "@mui/material/useMediaQuery";
import { lazy, Suspense } from "react";
import LeftDrawerMenu from "../Components/LeftDrawerMenu";

/* =========================
   SX OBJECTS (OUTSIDE)
   ========================= */

const rootBoxSx = {
  minHeight: "100lvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: "#262626",
  alignItems: "center",
};

const topBarSx = {
  width: "100%",
  background: "#262626",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: { xs: "column", lg: "row" },
};

const contentWrapperSx = {
  marginTop: "1rem",
  marginBottom: "1rem",
  width: "100%",
  display: "flex",
  gap: "0.25rem",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "start",
};

const sideMenuSx = {
  width: { xs: "25%", md: "30%", lg: "23%" },
  minWidth: { xs: 350, lg: 350 },
  borderRight: "1px solid #262626",
  paddingBottom: "1rem",
  display: { xs: "none", lg: "flex" },
  background: "#262626",
  minHeight: "100lvh",
};

/* =========================
   COMPONENT
   ========================= */

const CategoryMenu = ({
  setCartMenu,
  wishlist,
  addToCart,
  isAdding,
  addToWishlist,
  removeFromWishlist,
}) => {
  const theme = useTheme();
  const {
    books,
    isLoading,
    totalPages,
    filters,
    setFilters,
    sort,
    setSort,
    order,
    setOrder,
    page,
    setPage,
  } = useBooks(); // no args unless you want initialFilters or limit

  const [drawerData, setDrawerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  // URL sync handled inside useBooks

  /* =========================
     DATA
     ========================= */

  // const BottomNavigationMenu = lazy(() =>import("../Components/BottomNavigationMenu"))

  const FloatingMenuButton = lazy(
    () => import("../Components/FloatingMenuButton"),
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setLeftDrawerOpen(false);
    }
  }, [isMobile]);

  /* =========================
     SEO (MEMOIZED)
     ========================= */

  const seoData = useMemo(() => {
    const title =
      filters.mainCategory || filters.subCategory
        ? `${filters.mainCategory ? filters.mainCategory + " - " : ""}${
            filters.subCategory || ""
          } | Bookstore.ba`
        : "Bookstore.ba";

    const description = `Pronađite najbolje knjige iz ${
      filters.mainCategory || "raznih kategorija"
    }${filters.subCategory ? `, posebno ${filters.subCategory}` : ""}.`;

    return {
      title,
      description,
      url: window.location.href,
      ogImage: "/og-image.png",
    };
  }, [filters.mainCategory, filters.subCategory]);

  /* =========================
     CALLBACKS
     ========================= */

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      )
        return;
      setOpen(open);
    },
    [],
  );

  const toggleDrawer2 = useCallback(
    (open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      )
        return;
      setLeftDrawerOpen(open);
    },
    [],
  );

  const handleSetDrawerData = useCallback((data) => {
    setDrawerData(data);
  }, []);

  /* =========================
     RENDER
     ========================= */

  return (
    <>
      <SEO {...seoData} />

      <Box sx={rootBoxSx}>
        <Box sx={topBarSx}>
          <SearchBarTop
            booksCopy={books}
            setCart={addToCart}
            toggleDrawer={toggleDrawer}
            setDrawerData={setDrawerData}
          />

          <BookSortBar
            sort={sort}
            setSort={setSort}
            order={order}
            setOrder={setOrder}
          />
        </Box>

        <Box sx={contentWrapperSx}>
          <Box sx={sideMenuSx}>
            <Menu
              filter={filters} // from useBooks
              setFilter={setFilters} // from useBoo
              page={page}
              setPage={setPage}
            />
          </Box>

          <ProductGallery
            books={books}
            loading={isLoading}
            totalPages={totalPages}
            toggleDrawer={toggleDrawer}
            setDrawerData={handleSetDrawerData}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            currentPage={page}
            setPage={setPage}
            addToCart={addToCart}
            isAdding={isAdding}
          />
        </Box>

        {/* =========================
            CONDITIONAL OVERLAYS
           ========================= */}

        <LeftDrawerMenu
          open={leftDrawerOpen}
          setOpen={setLeftDrawerOpen}
          setFilter={setFilters}
          filter={filters}
          page={page}
          setPage={setPage}
        />

        <AnchorTemporaryDrawer
          open={open}
          setOpen={setOpen}
          toggleDrawer={toggleDrawer}
          drawerData={drawerData}
        />

        {isMobile && (
          <Suspense fallback={null}>
            <FloatingMenuButton
              leftDrawerOpen={leftDrawerOpen}
              setLeftDrawerOpen={setLeftDrawerOpen}
              toggleDrawer2={toggleDrawer2}
              setCartMenu={setCartMenu}
            />
          </Suspense>
        )}

        {/*       {isMobile && (
  <Suspense fallback={null}>
    <BottomNavigationMenu
      leftDrawerOpen={leftDrawerOpen}
      setLeftDrawerOpen={setLeftDrawerOpen}
      toggleDrawer2={toggleDrawer2}
      setCartMenu={setCartMenu}
    />
  </Suspense>
)}*/}
      </Box>
    </>
  );
};

export default CategoryMenu;
