import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import MobileMenu from "./MobileMenu";

import ShoppingCartOutlinedIcon  from '@mui/icons-material/ShoppingCartOutlined';
import LoginIcon from "@mui/icons-material/Login";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CircularProgress from '@mui/material/CircularProgress';
import useCart from "../Utils.js/useCart";

import { useWishlist } from "../Utils.js/useWishlist"; // your hook



export default function ButtonAppBar({ cart, setCartMenu, setDrawerOpen3 }) {
  const location = useLocation();
  const { wishlist, isLoading:isLoadingWishlist } = useWishlist();
  const { isLoading:isLoadingCart} = useCart();
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isShopOrCheckout =
    location.pathname === "/shop" ||
    location.pathname === "/checkout" ||
    location.pathname === "/Uslovikupovine" ||
    location.pathname === "/Privatnost" ||
    location.pathname === "/OpštiUsloviPoslovanja" ||
    location.pathname === "/PolitikaPovrataiReklamacije" ||
    location.pathname === "/Sigurnost" ||
    location.pathname === "/Politikekolačića" ||
    location.pathname === "/success";
  const backgroundColor =
    scrolled || isShopOrCheckout ? "#262626" : "transparent";

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 999 }}>
     <AppBar
  position="fixed"
  elevation={0}
  sx={{
    height: { xs: "3rem", sm: "4rem" },
    background: scrolled || isShopOrCheckout
  ? "rgba(38, 38, 38, 0.6)"
  : "transparent",

backdropFilter: scrolled || isShopOrCheckout
  ? "blur(10px)"
  : "none",

WebkitBackdropFilter: scrolled || isShopOrCheckout
  ? "blur(10px)"
  : "none", 
    transition: "background 0.3s ease",
  }}
>
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 2, sm: 4 },
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Mobile menu button */}
          <MobileMenu />

          {/* Logo */}
          <Box
  sx={{
    height: "100%",
    width: { xs: "8rem", md: "12vw" },
    minWidth: "8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Box
    component="img"
    src="\logo13.png"
    alt="logo"
    onClick={() => navigate("/home")}
    sx={{
      width: { xs: "10rem", md: "15rem" },
      cursor: "pointer",
      height: "auto",
      objectFit: "contain",
    }}
  />
</Box>


          {/* Nav links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "0rem", md: "1.5rem" },
              mr: { xs: 0, sm: 4 },
              fontSize: "0.80rem",
            }}
          >
            <Button
  sx={{
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.70rem",
    display: { xs: "none", md: "flex" },
    color: "#f9f9f9",
    backgroundColor: "transparent",
    borderRadius: 2,
    px: 2.5,
    py: 1.2,
    fontWeight: 600,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 4,
      left: "50%",
      width: "0%",
      height: "2px",
      background: "linear-gradient(90deg, #d62d00, #ff5722)",
      transition: "all 0.3s ease",
      transform: "translateX(-50%)",
      borderRadius: 2,
    },
    "&:hover": {
      color: "#d62d00",
      textShadow: "0 0 8px rgba(214,45,0,0.5)",
    },
    "&:hover::after": { width: "60%" },
    "&.Mui-selected": {
      color: "#d62d00",
      "&::after": { width: "60%" },
    },
  }}
  onClick={() => navigate("/home")}
  startIcon={<HomeOutlinedIcon />}
>
  <Box sx={{ display: { xs: "none", sm: "inline" } }}>POČETNA</Box>
</Button>

            <Button
  sx={{
    fontFamily: "'Inter', sans-serif", // ✅ clean accented letters
    fontSize: "0.70rem",
    display: { xs: "none", md: "flex" },
    color: "#f9f9f9",
    backgroundColor: "transparent",
    borderRadius: 2,
    px: 2.5,
    py: 1.2,
    fontWeight: 600,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 4,
      left: "50%",
      width: "0%",
      height: "2px",
      background: "linear-gradient(90deg, #d62d00, #ff5722)",
      transition: "all 0.3s ease",
      transform: "translateX(-50%)",
      borderRadius: 2,
    },
    "&:hover": {
      color: "#d62d00",
      textShadow: "0 0 8px rgba(214,45,0,0.5)",
    },
    "&:hover::after": {
      width: "60%",
    },
    "&.Mui-selected": {
      color: "#d62d00",
      "&::after": {
        width: "60%",
      },
    },
  }}
  onClick={() => navigate("/shop")}
  startIcon={<StoreMallDirectoryOutlinedIcon />}
>
  <Box sx={{ display: { xs: "none", sm: "inline" } }}>BOOKSTORE</Box>
</Button>


            {/* Cart */}

            <SignedIn>
             {setCartMenu && (
  <IconButton aria-label="cart" onClick={() => setCartMenu(true)}>
    {isLoadingCart ? (
      <CircularProgress size={20} sx={{ color: "#f9f9f9" }} />
    ) : (
      <Badge
  badgeContent={
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  }
  invisible={isLoadingCart}
  sx={{
    "& .MuiBadge-badge": {
      backgroundColor: "#d62d00",
      color: "#f9f9f9",
      fontWeight: "bold",
      minWidth: "18px",
      height: "18px",
    },
  }}
>
  <ShoppingCartOutlinedIcon
    sx={{
      fontSize: { xs: "1.3rem", sm: "1.5" },
      color: "#f9f9f9",
      transition: "color 0.3s ease",
      "&:hover": { color: "#d62d00" },
    }}
  />
</Badge>
    )}
  </IconButton>
)}


              {/*Wish list*/}
              <IconButton aria-label="wishlist" onClick={() => setDrawerOpen3(true)}>
  {isLoadingWishlist ? (
    <CircularProgress size={20} sx={{ color: "#f9f9f9" }} />
  ) : (
    <Badge
      badgeContent={wishlist.length}
      invisible={wishlist.length === 0}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#464646ff",
          color: "#f9f9f9",
          fontWeight: "bold",
          minWidth: "18px",
          height: "18px",
        },
      }}
    >
      {wishlist.length > 0 ? (
        <BookmarkIcon
          sx={{ color: "#f9f9f9", "&:hover": { color: "#d62d00" } }}
        />
      ) : (
        <BookmarkBorderIcon
          sx={{ color: "#f9f9f9", "&:hover": { color: "#d62d00" } }}
        />
      )}
    </Badge>
  )}
</IconButton>


              <Box sx={{ marginLeft: "0.5rem" }}>
                <UserButton />
              </Box>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  sx={(theme) => ({
                    height: { xs: "1.5rem", sm: "2.2rem", md: "2.4rem" },
                    borderRadius: "50px",
                    px: { xs: 1.5, sm: 3, md: 4 },
                    fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.8rem" },
                    fontWeight: 600,
                    minWidth: { xs: "70px", sm: "120px", md: "150px" },
                    color: "#fff",
                    backgroundColor: "transparent", // semi-transparent on transparent navbar
                                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    "& .MuiButton-startIcon": {
                      mr: { xs: 0.3, sm: 1 },
                      fontSize: { xs: "0.9rem", sm: "1.2rem" },
                    },
                    "& .MuiButton-startIcon .MuiSvgIcon-root": {
    fontSize: { xs: "1.5rem", md: "1.2rem" },
  },
                    "&:hover": {
                      backgroundColor: "#ff3c1a",
                      boxShadow: "0 4px 12px rgba(214,45,0,0.4)",
                    },
                    [theme.breakpoints.down("xs")]: {
                      minWidth: "60px",
                      px: 1,
                      fontSize: "0.6rem",
                      "& .MuiButton-startIcon": {
                        fontSize: "0.8rem",
                        mr: 0.2,
                      },
                    },
                  })}
                >
                  <Typography sx={{fontSize:"0.75rem", fontWeight:"bold", display:{xs:"none", md:"block"}}}>PRIJAVA</Typography>
                </Button>
              </SignInButton>
            </SignedOut>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
