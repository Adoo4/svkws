import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "@clerk/clerk-react";



export default function FixedBottomNavigation({ toggleDrawer2, leftDrawerOpen, setLeftDrawerOpen, setCartMenu, CartMenu, toggleDrawer }) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [hidden, setHidden] = React.useState(false);
  const scrollPos = React.useRef(0);
  const scrollTimeout = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);
  React.useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollPos.current) {
      // scrolling down → hide
      setHidden(true);
    }

    scrollPos.current = currentScroll;

    // clear old timeout
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    // after 0.5s of no scroll → show
    scrollTimeout.current = setTimeout(() => {
      setHidden(false);
    }, 500);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
  };
}, []);

  return (
    <Box sx={{ pb: 3, zIndex: "9999", display: { xs: "flex", md: "none" } }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{
          position: "fixed",
          bottom: hidden ? "-60px" : 0, // slide off-screen when hidden
          left: 0,
          right: 0,
          height: 50,
          transition: "bottom 0.4s ease", // smooth hide/show
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#222",
            "& .MuiBottomNavigationAction-root": {
              color: "#f7f7f7",
              minWidth: 0,
              padding: "4px 6px",
            },
            "& .Mui-selected": {
              color: "white",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "0.70rem",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.0rem",
            },
          }}
        >
         <BottomNavigationAction
  label="Kategorije"
  onClick={(event) => toggleDrawer2(!leftDrawerOpen)(event)} // toggle instead of always true
  icon={<MenuIcon sx={{ color: "#f9f9f9" }} />}
  sx={{ "& .MuiBottomNavigationAction-label": { fontSize: "0.75rem" } }}
/>
         <BottomNavigationAction
      label="Početna"
      icon={<HomeIcon sx={{ color: "#f9f9f9" }} />}
      sx={{
        "& .MuiBottomNavigationAction-label": { fontSize: "0.75rem" },
      }}
      onClick={() => navigate("/home")}
    />
    {isSignedIn && (
<BottomNavigationAction
  label="Korpa"
  icon={<ShoppingCartIcon sx={{ color: "#f9f9f9" }} />}
  sx={{ "& .MuiBottomNavigationAction-label": { fontSize: "0.75rem" } }}
  onClick={() => {
    setCartMenu((prev) => !prev); // toggles cart menu
    toggleDrawer(true);           // ensures drawer opens
  }}
/>
)}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
