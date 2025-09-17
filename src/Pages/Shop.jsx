import { useState } from "react";
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

let CategoryMenu = ({
  cart,
  setCart,
  cartMenu,
  setCartMenu,
  wishlist,
  setWishlist,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerData, setDrawerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
const [filter, setFilter] = useState({
  mainCategory: "",   // <- matches DB
  subCategory: "",    // <- matches DB
  language: "",
  isNew: false,
  discount: false,
});


  const [page, setPage] = useState(1);
const { books, isLoading, totalPages } = useBooks(filter, page, 15);

  //const [bo = useState([]);
  const [booksCopy] = useState([]);
  

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setOpen(open);
  };

  const toggleDrawer2 = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setLeftDrawerOpen(open);
  };

  return (
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
          height: "15lvh",
          background: "#262626",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchBarTop booksCopy={booksCopy} setCart={setCart} />
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
            
            minHeight: "106lvh",
          }}
        >
          <Menu
  setFilter={setFilter}
  filter={filter}
  booksCopy={booksCopy}
  books={books}
  allBooks={booksCopy}
  page={page}          // ✅ added
  setPage={setPage}    // ✅ added
/>
        </Box>

        <ProductGallery
          books={books}
          loading={isLoading}
          totalPages={totalPages}
          toggleDrawer={toggleDrawer}
          drawerData={drawerData}
          setDrawerData={setDrawerData}
          isSmallScreen={isSmallScreen}
          cart={cart}
          setCart={setCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
          currentPage={page}
          setPage={setPage}
        />
      </Box>

      <LeftDrawerMenu
        open={leftDrawerOpen}
        setOpen={setLeftDrawerOpen}
        setFilter={setFilter}
        filter={filter}
        booksCopy={booksCopy}
        books={books}
        allBooks={booksCopy}
         page={page}        // pass the current page
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
        setCart={setCart}
        cartMenu={cartMenu}
        setCartMenu={setCartMenu}
      />
      <BottomNavigationMenu
        leftDrawerOpen={leftDrawerOpen}
        setLeftDrawerOpen={setLeftDrawerOpen}
        toggleDrawer2={toggleDrawer2}
        setCartMenu={setCartMenu}
      />
    </Box>
  );
};

export default CategoryMenu;
