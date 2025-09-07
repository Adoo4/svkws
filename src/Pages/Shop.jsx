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

let CategoryMenu = ({ cart, setCart, cartMenu, setCartMenu, wishlist, setWishlist }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerData, setDrawerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [filter, setFilter] = useState({
    bookCategory: "",
    bookSubCategory: "",
    bookLanguage: "",
    newBook: false,
    bookDiscount: false,
  });

  const { filteredBooks, isLoading, allBooks: fetchedBooks } = useBooks(filter);

  const [books, setBooks] = useState([]);
  const [booksCopy, setBooksCopy] = useState([]);

  useEffect(() => {
    if (fetchedBooks.length > 0) {
      setBooks(fetchedBooks);
      setBooksCopy(fetchedBooks);
    }
  }, [fetchedBooks]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setOpen(open);
  };

  const toggleDrawer2 = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setLeftDrawerOpen(open);
  };

  return (
    <Box sx={{ minHeight: "100lvh", display: "flex", flexDirection: "column", justifyContent: "center", background: "#262626", alignItems: "center" }}>
      <Box sx={{ width: "100%", height: "15lvh", background: "#262626", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SearchBarTop
          booksCopy={booksCopy}
          setBooks={setBooks}
          books={books}
          setCart={setCart}
        />
      </Box>

      <Box sx={{ marginTop: "1rem", marginBottom: "1rem", width: "100%", display: "flex", gap: "0.25rem", flexDirection: "row", justifyContent: "center", alignItems: "start" }}>
        <Box sx={{ width: { xs: "25%", md: "30%", lg: "23%" }, minWidth: { xs: 350, lg: 350 }, borderRight: "1px solid #262626", paddingBottom: "1rem", display: { xs: "none", lg: "flex" }, background: "#262626", boxShadow: "1px 0 10px rgba(0,0,0,0.1)", minHeight: "106lvh" }}>
          <Menu setFilter={setFilter} filter={filter} setBooks={setBooks} booksCopy={booksCopy} books={books} allBooks={booksCopy} />
        </Box>

        <ProductGallery
          books={filteredBooks}
          loading={isLoading}
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

      <LeftDrawerMenu open={leftDrawerOpen} setOpen={setLeftDrawerOpen} setFilter={setFilter} filter={filter} setBooks={setBooks} booksCopy={booksCopy} books={books} allBooks={booksCopy} />
      <AnchorTemporaryDrawer open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} drawerData={drawerData} />
      <CartMenu open={cartMenu} cart={cart} setCart={setCart} cartMenu={cartMenu} setCartMenu={setCartMenu} />
      <BottomNavigationMenu leftDrawerOpen={leftDrawerOpen} setLeftDrawerOpen={setLeftDrawerOpen} toggleDrawer2={toggleDrawer2} setCartMenu={setCartMenu} />
    </Box>
  );
};

export default CategoryMenu;
