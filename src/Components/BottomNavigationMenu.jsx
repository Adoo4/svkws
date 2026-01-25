import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "@clerk/clerk-react";
import TuneIcon from '@mui/icons-material/Tune';
import Badge from '@mui/material/Badge';



export default function FixedBottomNavigation({ toggleDrawer2, leftDrawerOpen, setLeftDrawerOpen, setCartMenu, CartMenu, toggleDrawer, cart }) {
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
    <Box sx={{ pb: 3, zIndex: "99", display: { xs: "flex", lg: "none" } }} ref={ref}>
      <CssBaseline />

    <Paper
  sx={{
    position: "fixed",
    bottom: hidden ? "-60px" : 0,
    left: 0,
    right: 0,
    height: 50,
    transition: "bottom 0.4s ease",
    background: "transparent",     // 🔥 let glass effect show through
    boxShadow: "none",             // remove default shadow
    backdropFilter: "none",        // Paper should not blur (BottomNav will)
  }}
  elevation={0}
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
    justifyContent: "space-around",
    background: "rgba(30, 30, 30, 0.55)",  // 🔥 glass effect base
    boxShadow: "0 -2px 8px rgba(0,0,0,0.4)",
    backdropFilter: "blur(12px)",          // stronger glass
    WebkitBackdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(255,255,255,0.08)", // subtle glass border
    transition: "background 0.3s ease",

    "& .MuiBottomNavigationAction-root": {
      color: "#bdbdbd",
      minWidth: "60px",
      padding: "6px 8px",
      transition: "all 0.3s ease",
      "&:hover": {
        color: "#ffffff",
        transform: "scale(1.05)",
      },
    },

    "& .Mui-selected": {
      color: "#ffffff",
    },

    "& .MuiBottomNavigationAction-label": {
      fontSize: "0.7rem",
      fontWeight: 500,
      letterSpacing: "0.5px",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "1.3rem",
    },
  }}
>

  <BottomNavigationAction
    label="FILTRIRAJ"
    onClick={(event) => toggleDrawer2(!leftDrawerOpen)(event)}
    icon={<TuneIcon />}
     sx={{
    "& .MuiBottomNavigationAction-label": {
      fontSize: "0.6rem", // adjust as needed
    },
  }}
  />

  <BottomNavigationAction
    label="POČETNA"
    icon={<HomeIcon />}
    onClick={() => navigate("/home")}
     sx={{
    "& .MuiBottomNavigationAction-label": {
      fontSize: "0.6rem", // adjust as needed
    },
  }}
  />

  {isSignedIn && (
   <BottomNavigationAction
    label="KORPA"
    onClick={() => setCartMenu(true)}
     sx={{
    "& .MuiBottomNavigationAction-label": {
      fontSize: "0.6rem", // adjust as needed
    },
  }}
    icon={
      <Badge
        badgeContent={cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
        color="error"
        overlap="circular"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "0.65rem",
            fontWeight: "bold",
            minWidth: "18px",
            height: "18px",
            borderRadius: "50%",
          },
        }}
      >
        <ShoppingCartIcon />
      </Badge>
    }
  />
  )}
</BottomNavigation>

      </Paper>
    </Box>
  );
}
