import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import Paper from "@mui/material/Paper";

const FloatingFilterButton = ({ toggleDrawer2, leftDrawerOpen }) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);   // ✅ persistent scroll position
  const scrollTimeout = useRef();  // ✅ persistent timeout

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current) {
        setHidden(true); // scrolling down → hide
      }

      lastScrollY.current = currentScroll;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setHidden(false); // stop scrolling → show
      }, 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: hidden ? "-80px" : "20px",
        right: "20px",
        zIndex: 9999,
        transition: "bottom 0.35s ease",
        display: { xs: "block", lg: "none" }, // mobile only
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: "50%",
          background: "rgba(30, 30, 30, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <IconButton
          onClick={(event) => toggleDrawer2(!leftDrawerOpen)(event)}
          sx={{
            width: 56,
            height: 56,
            color: "#fff",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "rgba(255,255,255,0.1)",
              transform: "scale(1.08)",
            },
          }}
        >
          <TuneIcon sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default FloatingFilterButton;
