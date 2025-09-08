
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut,  SignInButton, UserButton } from '@clerk/clerk-react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import Badge from '@mui/material/Badge';
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MobileMenu from "./MobileMenu"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';







const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid white`,
    padding: '0 4px',
  },
}));

export default function ButtonAppBar({cart, setCartMenu, wishlist, setDrawerOpen3}) {
 const location = useLocation();

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

const isShopOrCheckout = location.pathname === "/shop" || location.pathname === "/checkout";
const backgroundColor = scrolled || isShopOrCheckout ? "#262626" : "transparent";

  return (
   <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 999,  }}>
  <AppBar
    position="fixed"
    elevation={0}   // 🔥 disables default shadow
    sx={{
      height: { xs: "3rem", sm: "4rem" },
      backgroundColor: backgroundColor, // dark base background
      transition: "background-color 0.3s ease",
     
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
          width: { xs: "8rem", sm: "12vw" },
          minWidth: "8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/svklogo.svg"
          alt="logo"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
            filter: "drop-shadow(0px 0px 3px rgba(249,249,249,0.4))",
          }}
        />
      </Box>

      {/* Nav links */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {xs:"0rem", md:"1.5rem"},
          mr: { xs: 0, sm: 4 },
          fontSize: "0.85rem",
        }}
      >
        <Button
          sx={{
            fontSize: "inherit",
            display: { xs: "none", md: "flex" },
            color: "#f9f9f9",
            "&:hover": {
              color: "#d62d00",
            },
          }}
          onClick={() => navigate("/home")}
          startIcon={<HomeIcon />}
        >
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>POČETNA</Box>
        </Button>

        <Button
          sx={{
            fontSize: "inherit",
            display: { xs: "none", md: "flex" },
            color: "#f9f9f9",
            "&:hover": {
              color: "#d62d00",
            },
          }}
          onClick={() => navigate("/shop")}
          startIcon={<StoreIcon />}
        >
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>BOOKSTORE</Box>
        </Button>
        

        {/* Cart */}
        
          <SignedIn>
            {setCartMenu && (
              <IconButton aria-label="cart" onClick={() => setCartMenu(true)}>
                <StyledBadge
                  badgeContent={
                    cart?.reduce((sum, item) => sum + item.quantity, 0) || 0
                  }
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#d62d00",
                      color: "#f9f9f9",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <ShoppingCartIcon
                    sx={{
                      fontSize:{xs:"1.3rem", sm:"1.5"},
                      color: "#f9f9f9",
                      transition: "color 0.3s ease",
                      "&:hover": { color: "#d62d00" },
                    }}
                  />
                </StyledBadge>
              </IconButton>
            )}



            {/*Wish list*/ }
      <IconButton aria-label="wishlist" onClick={() => setDrawerOpen3(true)}>
  {wishlist.length > 0 ? (
    <BookmarkIcon sx={{ color: "#f9f9f9", "&:hover": { color: "#d62d00" } }} />
  ) : (
    <BookmarkBorderIcon sx={{ color: "#f9f9f9", "&:hover": { color: "#d62d00" } }} />
  )}
</IconButton>
           <Box sx={{marginLeft:"0.5rem"}}>
            <UserButton/>
            </Box> 
          </SignedIn>

      

          <SignedOut>
  <SignInButton mode="modal">
   <Button
  variant="contained"
  startIcon={<LoginIcon />}
  sx={(theme) => ({
    height: "100%",
    textTransform: "none",
    background:"transparent",
    border:"1px solid #d62d00",
    borderRadius:"10rem",
    px: { xs: 0, sm: 3, md: 4 }, // responsive padding
    fontSize: { xs: "0.70rem", sm: "0.9rem", md: "1rem" }, // responsive font size
    minWidth: { xs: "90px", sm: "120px", md: "150px" }, // button width scales
    "& .MuiButton-startIcon": {
      margin: { xs: 0, sm: "0 8px 0 0" }, // hide spacing on small screens
    },
    "&:hover": {
      bgcolor: "#d62d00",
    },
    [theme.breakpoints.down("sm")]: {
      startIcon: false, // hides icon on extra small screens
    },
  })}
>
  Prijava
</Button>
  </SignInButton>
</SignedOut>
        
      </Box>
    </Toolbar>
  </AppBar>
</Box>

  );
}
