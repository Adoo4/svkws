import { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import ProductGallery from "../Components/ProductGallery";
import Menu from "../Components/Menu/Menu";
import SearchBarTop from "../Components/SearchBarTop";
import AnchorTemporaryDrawer from "../Components/CardPreviewComponent";
import BookSortBar from "../Components/BookSortBar";
import useBooks from "../Utils.js/useBooks";
import SEO from "../Utils.js/SEO";
import useMediaQuery from "@mui/material/useMediaQuery";
import { lazy, Suspense } from "react";
import LeftDrawerMenu from "../Components/LeftDrawerMenu"

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
  cart,
  setCartMenu,
  wishlist,
  addToCart,
  updateCartItem,
  removeCartItem,
  addToWishlist,
  removeFromWishlist,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  const [drawerData, setDrawerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    mainCategory: searchParams.get("mainCategory") || "",
    subCategory: searchParams.get("subCategory") || "",
    language: searchParams.get("language") || "",
    isNew: searchParams.get("isNew") === "true",
    discount: searchParams.get("discount") === "true",
  });

  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  /* =========================
     URL SYNC
     ========================= */

  useEffect(() => {
  const params = new URLSearchParams(searchParams); // start from current
  let changed = false;

  if (filter.mainCategory && params.get("mainCategory") !== filter.mainCategory) {
    params.set("mainCategory", filter.mainCategory);
    changed = true;
  } else if (!filter.mainCategory && params.has("mainCategory")) {
    params.delete("mainCategory");
    changed = true;
  }

  if (filter.subCategory && params.get("subCategory") !== filter.subCategory) {
    params.set("subCategory", filter.subCategory);
    changed = true;
  } else if (!filter.subCategory && params.has("subCategory")) {
    params.delete("subCategory");
    changed = true;
  }

  // repeat for language, isNew, discount, page...
  if (filter.isNew.toString() !== params.get("isNew")) {
    if (filter.isNew) params.set("isNew", "true");
    else params.delete("isNew");
    changed = true;
  }

  if (filter.discount.toString() !== params.get("discount")) {
    if (filter.discount) params.set("discount", "true");
    else params.delete("discount");
    changed = true;
  }

  if (page.toString() !== params.get("page")) {
    params.set("page", page.toString());
    changed = true;
  }

  if (changed) {
    setSearchParams(params, { replace: true });
  }
}, [filter, page, searchParams, setSearchParams]);


  /* =========================
     DATA
     ========================= */

  const { books, isLoading, totalPages } = useBooks(
    filter,
    page,
    20,
    sort,
    order
  );


  // const BottomNavigationMenu = lazy(() =>import("../Components/BottomNavigationMenu"))

const FloatingMenuButton = lazy(()=> import("../Components/FloatingMenuButton"))

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
      filter.mainCategory || filter.subCategory
        ? `${filter.mainCategory ? filter.mainCategory + " - " : ""}${
            filter.subCategory || ""
          } | Bookstore.ba`
        : "Bookstore.ba";

    const description = `Pronađite najbolje knjige iz ${
      filter.mainCategory || "raznih kategorija"
    }${filter.subCategory ? `, posebno ${filter.subCategory}` : ""}.`;

    return {
      title,
      description,
      url: window.location.href,
      ogImage: "/og-image.png",
    };
  }, [filter.mainCategory, filter.subCategory]);

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
    []
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
    []
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
              setFilter={setFilter}
              filter={filter}
              page={page}
              setPage={setPage}
            />
          </Box>


          

          <ProductGallery
            books={books}
            loading={isLoading}
            totalPages={totalPages}
            toggleDrawer={toggleDrawer}
            drawerData={drawerData}
            setDrawerData={handleSetDrawerData}
            isSmallScreen={isSmallScreen}
            cart={cart}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            currentPage={page}
            setPage={setPage}
            addToCart={addToCart}
            updateCartItem={updateCartItem}
            removeCartItem={removeCartItem}
          />
        </Box>

        {/* =========================
            CONDITIONAL OVERLAYS
           ========================= */}

     
    <LeftDrawerMenu
      open={leftDrawerOpen}
      setOpen={setLeftDrawerOpen}
       setFilter={setFilter}
              filter={filter}
              page={page}
              setPage={setPage}
    />
 



        {open && (
          <AnchorTemporaryDrawer
            open={open}
            setOpen={setOpen}
            toggleDrawer={toggleDrawer}
            drawerData={drawerData}
          />
        )}

       {isMobile && (
  <Suspense fallback={null}>
    <FloatingMenuButton
      leftDrawerOpen={leftDrawerOpen}
      setLeftDrawerOpen={setLeftDrawerOpen}
      toggleDrawer2={toggleDrawer2}
      setCartMenu={setCartMenu}
    />
  </Suspense>)}

     

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
