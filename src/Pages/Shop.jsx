import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {  useState} from "react";

import AnchorTemporaryDrawer from "../Components/CardPreviewComponent";
import LeftDrawerMenu from "../Components/LeftDrawerMenu";
import Menu from "../Components/Menu/Menu";
import ProductGallery from "../Components/ProductGallery";
import "swiper/css";
import CartMenu from "../Components/CartMenu";
import BottomNavigationMenu from "../Components/BottomNavigationMenu";
import SearchBarTop from "../Components/SearchBarTop";
import useBooks from "../Utils.js/useBooks";

let CategoryMenu = ({
  cart,
  setCart,
  cartMenu,
  setCartMenu,
  wishlist,
  setWishlist,
}) => {
 const [books, setBooks] = useState([]);
const [booksCopy] = useState([]);
const [allBooks] = useState([]);


  const theme = useTheme();

  const [drawerData, setDrawerData] = useState(null);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

  const [filter, setFilter] = useState({
    bookCategory: "",
    bookSubCategory: "",
    bookLanguage: "",
    newBook: false,
    bookDiscount: false,
  });

  const { filteredBooks, isLoading } = useBooks(filter); // ✅ here

  



  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const toggleDrawer2 = (leftDrawerOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLeftDrawerOpen(leftDrawerOpen);
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
        border: "none",
        outline: "none",
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
        <SearchBarTop
          booksCopy={allBooks}
          setBooks={setBooks}
          books={books}
          filter={filter}
          setCart={setCart}
        />
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
        {/* Only show FAB if drawer is not open */}

        <Box
          sx={{
            width: { xs: "25%", md: "30%", lg: "23%" },
            minWidth: { xs: "350", lg: "350" },
            borderRight: "1px solid  #262626",
            paddingBottom: "1rem",
            display: { xs: "none", lg: "flex" },
            background: "#262626",
            boxShadow: "1px 0 10px rgba(0, 0, 0, 0.1)",
            minHeight: "106lvh",
          }}
        >
          <Menu
            setFilter={setFilter}
            filter={filter} // <-- This must be defined!
            setBooks={setBooks}
            booksCopy={booksCopy}
            books={books}
            allBooks={allBooks}
          />
        </Box>

        <ProductGallery
          books={filteredBooks} // filtered books from hook
          loading={isLoading} // loading from hook
          toggleDrawer={toggleDrawer}
          drawerData={drawerData}
          setDrawerData={setDrawerData}
          isSmallScreen={isSmallScreen}
          cart={cart}
          setCart={setCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      </Box>
      <LeftDrawerMenu
        open={leftDrawerOpen}
        setOpen={setLeftDrawerOpen}
        setFilter={setFilter}
        filter={filter} // <-- This must be defined!
        setBooks={setBooks}
        booksCopy={booksCopy}
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
      />{" "}
      {/*nastaviti ovdje napraviti side menu za cart*/}
      <BottomNavigationMenu
        leftDrawerOpen={leftDrawerOpen}
        setLeftDrawerOpen={setLeftDrawerOpen}
        toggleDrawer2={toggleDrawer2}
        setCartMenu={setCartMenu}
        CartMenu={CartMenu}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  );
};

export default CategoryMenu;

