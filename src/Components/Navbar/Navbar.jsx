import React, { useState, useEffect, useMemo, useCallback } from "react";
// MUI components (direct imports for tree-shaking)
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Clerk
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// MUI icons (direct imports)
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import StoreMallDirectoryOutlined from '@mui/icons-material/StoreMallDirectoryOutlined';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Login from '@mui/icons-material/Login';

// Local components/hooks
import MobileMenu from '../Menu/MobileMenu';

// ------------------------ Constants ------------------------
const NAV_LINKS = [
  { label: "POČETNA", path: "/home", icon: <HomeOutlined /> },
  { label: "BOOKSTORE", path: "/shop", icon: <StoreMallDirectoryOutlined /> },
];
const ADMIN_LINK = { label: "ADMIN", path: "/admin", icon: <GridViewOutlined /> };
const SHOP_ROUTES = [
  "/shop",
  "/checkout",
  "/Uslovikupovine",
  "/Privatnost",
  "/OpštiUsloviPoslovanja",
  "/PolitikaPovrataiReklamacije",
  "/Sigurnost",
  "/Politikekolačića",
  "/success",
  "/admin",
];

// ------------------------ NavButton (memoized) ------------------------
const NavButton = React.memo(({ label, path, icon, isSelected, onClick }) => {
  const baseSx = {
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
      width: isSelected ? "60%" : "0%",
      height: "2px",
      background: "linear-gradient(90deg, #d62d00, #ff5722)",
      transform: "translateX(-50%)",
      borderRadius: 2,
      transition: "all 0.3s ease",
    },
    "&:hover": { color: "#d62d00", textShadow: "0 0 8px rgba(214,45,0,0.5)" },
    "&:hover::after": { width: "60%" },
  };

  return (
    <Button startIcon={icon} onClick={onClick} aria-current={isSelected ? "page" : undefined} sx={baseSx}>
      <Box sx={{ display: { xs: "none", sm: "inline" } }}>{label}</Box>
    </Button>
  );
});

// ------------------------ Main Component ------------------------
const ButtonAppBar = ({
  cart,
  wishlist = [],
  loadingCart = false,
  loadingWishlist = false,
  setCartMenu,
  setWishlistOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [scrolled, setScrolled] = useState(false);

  // ------------------------ Scroll listener ------------------------
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ------------------------ Memoized values ------------------------
  const cartItemCount = useMemo(() => cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0, [cart?.items]);
  const isShopOrCheckout = useMemo(() => SHOP_ROUTES.includes(location.pathname), [location.pathname]);

  // ------------------------ Handlers ------------------------
  const handleNav = useCallback((path) => navigate(path), [navigate]);
  const toggleCart = useCallback(() => { setWishlistOpen(false); setCartMenu((prev) => !prev); }, [setCartMenu, setWishlistOpen]);
  const toggleWishlist = useCallback(() => { setCartMenu(false); setWishlistOpen((prev) => !prev); }, [setCartMenu, setWishlistOpen]);

  // ------------------------ Styles ------------------------
  const appBarSx = {
    height: { xs: "3rem", sm: "4rem" },
    background: scrolled || isShopOrCheckout ? "rgba(38,38,38,0.6)" : "transparent",
    backdropFilter: scrolled || isShopOrCheckout ? "blur(10px)" : "none",
    WebkitBackdropFilter: scrolled || isShopOrCheckout ? "blur(10px)" : "none",
    transition: "background 0.3s ease",
  };

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 1300, height: 80 }}>
      <AppBar position="fixed" elevation={0} sx={appBarSx}>
        <Toolbar disableGutters sx={{ px: { xs: 2, sm: 4 }, height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          <MobileMenu />

          {/* Logo */}
          <Box
            component="img"
            src="/logofinal.svg"
            alt="logo"
            onClick={() => navigate("/home")}
            sx={{ width: { xs: "10rem", md: "13rem" }, height: "auto", objectFit: "contain", cursor: "pointer" }}
          />

          {/* Nav buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { md: 1.5 } }}>
            {isLoaded && user?.publicMetadata?.role === "admin" && (
              <NavButton {...ADMIN_LINK} isSelected={location.pathname === ADMIN_LINK.path} onClick={() => handleNav(ADMIN_LINK.path)} />
            )}
            {NAV_LINKS.map((link) => (
              <NavButton key={link.path} {...link} isSelected={location.pathname === link.path} onClick={() => handleNav(link.path)} />
            ))}

            <SignedIn>
  {/* Cart */}
  {setCartMenu && (
    <IconButton
      aria-label="cart"
      onClick={toggleCart}
      sx={{ width: 40, height: 40 }} // reserve space
    >
      <Badge
        badgeContent={cartItemCount || 0} // always reserve space
        invisible={false} // never remove badge, just show 0
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#d62d00",
            color: "#fff",
            fontWeight: "bold",
            minWidth: 18,
            height: 18,
          },
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loadingCart ? (
            <CircularProgress size={20} sx={{ color: "#f9f9f9" }} />
          ) : (
            <ShoppingCartOutlined
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                color: "#fff",
                "&:hover": { color: "#d62d00" },
              }}
            />
          )}
        </Box>
      </Badge>
    </IconButton>
  )}

  {/* Wishlist */}
  <IconButton aria-label="wishlist" onClick={toggleWishlist} sx={{ width: 40, height: 40 }}>
    <Badge
      badgeContent={wishlist.length || 0} // reserve space
      invisible={false} // never remove badge
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#464646",
          color: "#fff",
          fontWeight: "bold",
          minWidth: 18,
          height: 18,
        },
      }}
    >
      <Box sx={{ position: "relative", width: 24, height: 24 }}>
        <Bookmark
          sx={{
            fontSize: { xs: "1.3rem", sm: "1.5rem" },
            color: "#fff",
            visibility: wishlist.length > 0 ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            "&:hover": { color: "#d62d00" },
          }}
        />
        <BookmarkBorder
          sx={{
            fontSize: { xs: "1.3rem", sm: "1.5rem" },
            color: "#fff",
            visibility: wishlist.length === 0 ? "visible" : "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            "&:hover": { color: "#d62d00" },
          }}
        />
        {loadingWishlist && (
          <CircularProgress
            size={20}
            sx={{
              color: "#fff",
              position: "absolute",
              top: 2,
              left: 2,
            }}
          />
        )}
      </Box>
    </Badge>
  </IconButton>

  {/* User */}
  <Box sx={{ ml: 0.5, width: 40, minWidth: 40 }}>
    <UserButton />
  </Box>
</SignedIn>

<SignedOut>
  <SignInButton mode="modal">
    <Button
      startIcon={<Login />}
      sx={{
        borderRadius: "50px",
        px: { xs: 1.5, sm: 3 },
        fontSize: { xs: "0.65rem", sm: "0.7rem" },
        fontWeight: 600,
        color: "#fff",
        backgroundColor: "transparent",
        "&:hover": { backgroundColor: "#ff3c1a" },
      }}
    >
      <Typography
        sx={{ display: { xs: "none", md: "block" }, fontWeight: "bold", fontSize: "0.7rem" }}
      >
        PRIJAVA
      </Typography>
    </Button>
  </SignInButton>
</SignedOut>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
