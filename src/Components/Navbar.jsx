import React, { useState, useEffect, useCallback } from "react";
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
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LoginIcon from "@mui/icons-material/Login";
import MobileMenu from "./MobileMenu";
import useCart from "../Utils.js/useCart";
import { useWishlist } from "../Utils.js/useWishlist";

const NAV_LINKS = [
  {
    label: "POČETNA",
    path: "/home",
    icon: <HomeOutlinedIcon />,
  },
  {
    label: "BOOKSTORE",
    path: "/shop",
    icon: <StoreMallDirectoryOutlinedIcon />,
  },
];

const ADMIN_LINK = {
  label: "ADMIN",
  path: "/admin",
  icon: <GridViewOutlinedIcon />,
};

const shopRoutes = [
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

const ButtonAppBar = ({ cart, setCartMenu, setDrawerOpen3 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { wishlist, isLoading: isLoadingWishlist } = useWishlist();
  const { isLoading: isLoadingCart } = useCart();

  const [scrolled, setScrolled] = useState(false);

  // ---------------- PERFORMANCE: optimized scroll handler ----------------
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isShopOrCheckout = shopRoutes.includes(location.pathname);

  // ---------------- REUSABLE NAV BUTTON ----------------
  const NavButton = ({ label, path, icon, isSelected = false }) => (
    <Button
      startIcon={icon}
      onClick={() => navigate(path)}
      aria-current={isSelected ? "page" : undefined}
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
          width: isSelected ? "60%" : "0%",
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
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "inline" } }}>{label}</Box>
    </Button>
  );

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 1300 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: { xs: "3rem", sm: "4rem" },
          background:
            scrolled || isShopOrCheckout
              ? "rgba(38,38,38,0.6)"
              : "transparent",
          backdropFilter:
            scrolled || isShopOrCheckout ? "blur(10px)" : "none",
          WebkitBackdropFilter:
            scrolled || isShopOrCheckout ? "blur(10px)" : "none",
          transition: "background 0.3s ease",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 2, sm: 4 },
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Mobile menu */}
          <MobileMenu />

          {/* Logo */}
          <Box
            component="img"
            src="/logofinal.png"
            alt="logo"
            onClick={() => navigate("/home")}
            sx={{
              width: { xs: "12rem", md: "20rem" },
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />

          {/* Nav buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { md: 1.5 } }}>
            {isLoaded && user?.publicMetadata?.role === "admin" && (
              <NavButton
                {...ADMIN_LINK}
                isSelected={location.pathname === ADMIN_LINK.path}
              />
            )}

            {NAV_LINKS.map((link) => (
              <NavButton
                key={link.path}
                {...link}
                isSelected={location.pathname === link.path}
              />
            ))}

            {/* ----------------- SignedIn actions ----------------- */}
            <SignedIn>
              {/* Cart */}
              {setCartMenu && (
                <IconButton aria-label="cart" onClick={() => setCartMenu(true)}>
                  {isLoadingCart ? (
                    <CircularProgress size={20} sx={{ color: "#f9f9f9" }} />
                  ) : (
                    <Badge
                      badgeContent={
                        cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
                      }
                      invisible={isLoadingCart}
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
                      <ShoppingCartOutlinedIcon
                        sx={{
                          fontSize: { xs: "1.3rem", sm: "1.5rem" },
                          color: "#fff",
                          transition: "color 0.3s ease",
                          "&:hover": { color: "#d62d00" },
                        }}
                      />
                    </Badge>
                  )}
                </IconButton>
              )}

              {/* Wishlist */}
              <IconButton aria-label="wishlist" onClick={() => setDrawerOpen3(true)}>
                {isLoadingWishlist ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  <Badge
                    badgeContent={wishlist.length}
                    invisible={wishlist.length === 0}
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
                    {wishlist.length > 0 ? <BookmarkIcon sx={{ color: "#fff" }} /> : <BookmarkBorderIcon sx={{ color: "#fff" }} />}
                  </Badge>
                )}
              </IconButton>

              <Box sx={{ ml: 0.5 }}>
                <UserButton />
              </Box>
            </SignedIn>

            {/* ----------------- SignedOut actions ----------------- */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  startIcon={<LoginIcon />}
                  sx={{
                    borderRadius: "50px",
                    px: { xs: 1.5, sm: 3, md: 4 },
                    fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.8rem" },
                    fontWeight: 600,
                    color: "#fff",
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "#ff3c1a" },
                  }}
                >
                  <Typography sx={{ display: { xs: "none", md: "block" }, fontWeight: "bold", fontSize: "0.7rem" }}>
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
