import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ProductGallery from "../Components/ProductGallery";
import Menu from "../Components/Menu/Menu";
import SearchBarTop from "../Components/SearchBarTop";
import LeftDrawerMenu from "../Components/LeftDrawerMenu";
import AnchorTemporaryDrawer from "../Components/CardPreviewComponent";
import CartMenu from "../Components/CartMenu";
import BottomNavigationMenu from "../Components/BottomNavigationMenu";
import useBooks from "../Utils.js/useBooks";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../Utils.js/SEO";
import BookSortBar from "../Components/BookSortBar";

let CategoryMenu = ({
  cart,
  cartMenu,
  setCartMenu,
  wishlist,
  addToCart,
  updateCartItem,
  removeCartItem,
  addToWishlist,
  removeFromWishlist,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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

useEffect(() => {
  const params = new URLSearchParams();

  if (filter.mainCategory) params.set("mainCategory", filter.mainCategory);
  if (filter.subCategory) params.set("subCategory", filter.subCategory);
  if (filter.language) params.set("language", filter.language);
  if (filter.isNew) params.set("isNew", "true");
  if (filter.discount) params.set("discount", "true");
  params.set("page", page.toString());

  if (params.toString() !== searchParams.toString()) {
    setSearchParams(params, { replace: true });
  }
}, [filter, page, searchParams, setSearchParams]);
  const { books, isLoading, totalPages } = useBooks(filter, page, 20, sort, order);



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
      ) {
        return;
      }
      setLeftDrawerOpen(open);
    },
    [], // empty dependency array if setLeftDrawerOpen is stable (from useState)
  );

  const handleSetDrawerData = useCallback(
    (data) => setDrawerData(data),
    [], // no dependencies because setDrawerData is stable
  );
  return (
    <>
      


<SEO
  title={
    filter.mainCategory || filter.subCategory
      ? `${filter.mainCategory ? filter.mainCategory + " - " : ""}${
          filter.subCategory || ""
        } | Bookstore.ba`
      : "Bookstore.ba"
  }
  description={`Pronađite najbolje knjige iz ${filter.mainCategory || "raznih kategorija"}${
    filter.subCategory ? `, posebno ${filter.subCategory}` : ""
  }. Novi naslovi, popusti i popularne knjige.`}
  url={window.location.href}
  ogImage="/og-image.png"
/>


      <Box
        sx={{
          minHeight: "100lvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#262626",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
           
            background: "#262626",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection:{xs:"column", lg:"row"}
          }}
        >
          
          <SearchBarTop
            booksCopy={books}
            setCart={addToCart}
            toggleDrawer={toggleDrawer}
            setDrawerData={setDrawerData}
            
          />
        
        <BookSortBar sort={sort} setSort={setSort} order ={order} setOrder={setOrder} />
        
</Box>
        <Box
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            width: "100%",
            display: "flex",
            gap: "0.25rem",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              width: { xs: "25%", md: "30%", lg: "23%" },
              minWidth: { xs: 350, lg: 350 },
              borderRight: "1px solid #262626",
              paddingBottom: "1rem",
              display: { xs: "none", lg: "flex" },
              background: "#262626",

              minHeight: "100lvh",
            }}
          >
            <Menu
              setFilter={setFilter}
              filter={filter}
              
              books={books}
             
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
            filter={filter}
          />
        </Box>

        <LeftDrawerMenu
          open={leftDrawerOpen}
          setOpen={setLeftDrawerOpen}
          setFilter={setFilter}
          filter={filter}
          
          books={books}

          page={page}
          setPage={setPage}
        />
        <AnchorTemporaryDrawer
          open={open}
          setOpen={setOpen}
          toggleDrawer={toggleDrawer}
          drawerData={drawerData}
        />
        <CartMenu
          open={cartMenu}
          cart={cart}
          setCart={addToCart}
          updateCartItem={updateCartItem}
          cartMenu={cartMenu}
          setCartMenu={setCartMenu}
          removeCartItem={removeCartItem}
        />
        <BottomNavigationMenu
          leftDrawerOpen={leftDrawerOpen}
          setLeftDrawerOpen={setLeftDrawerOpen}
          toggleDrawer2={toggleDrawer2}
          setCartMenu={setCartMenu}
        />
      </Box>
    </>
  );
};

export default CategoryMenu;
