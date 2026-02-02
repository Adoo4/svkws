import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  StoreMallDirectoryOutlined,
  GridViewOutlined,
  ShoppingCartOutlined,
  Bookmark,
  BookmarkBorder,
  Login,
} from "@mui/icons-material";
import MobileMenu from "../Menu/MobileMenu";
import useCart from "../../Utils.js/useCart";
import { useWishlist } from "../../Utils.js/useWishlist";

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
const ButtonAppBar = ({ cart, setCartMenu, setWishlistOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { wishlist, isLoading: loadingWishlist } = useWishlist();
  const { isLoading: loadingCart } = useCart();
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
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 1300 }}>
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
                <IconButton aria-label="cart" onClick={toggleCart}>
                  {loadingCart ? <CircularProgress size={20} sx={{ color: "#f9f9f9" }} /> :
                    <Badge badgeContent={cartItemCount} invisible={loadingCart} sx={{ "& .MuiBadge-badge": { backgroundColor: "#d62d00", color: "#fff", fontWeight: "bold", minWidth: 18, height: 18 } }}>
                      <ShoppingCartOutlined sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" }, color: "#fff", "&:hover": { color: "#d62d00" } }} />
                    </Badge>
                  }
                </IconButton>
              )}

              {/* Wishlist */}
              <IconButton aria-label="wishlist" onClick={toggleWishlist}>
                {loadingWishlist ? <CircularProgress size={20} sx={{ color: "#fff" }} /> :
                  <Badge badgeContent={wishlist.length} invisible={wishlist.length === 0} sx={{ "& .MuiBadge-badge": { backgroundColor: "#464646", color: "#fff", fontWeight: "bold", minWidth: 18, height: 18 } }}>
                    {wishlist.length > 0 ? <Bookmark sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" }, color: "#fff", "&:hover": { color: "#d62d00" } }} /> :
                      <BookmarkBorder sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" }, color: "#fff", "&:hover": { color: "#d62d00" } }} />}
                  </Badge>
                }
              </IconButton>

              <Box sx={{ ml: 0.5 }}>
                <UserButton />
              </Box>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button startIcon={<Login />} sx={{ borderRadius: "50px", px: { xs: 1.5, sm: 3 }, fontSize: { xs: "0.65rem", sm: "0.7rem" }, fontWeight: 600, color: "#fff", backgroundColor: "transparent", "&:hover": { backgroundColor: "#ff3c1a" } }}>
                  <Typography sx={{ display: { xs: "none", md: "block" }, fontWeight: "bold", fontSize: "0.7rem" }}>PRIJAVA</Typography>
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
