import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "../Style/IntroLoader.css";
import { motion } from "framer-motion";

export default function LoadingScreen({ onFinish }  ) {
  
  const navigate = useNavigate();

 useEffect(() => {
  const timer = setTimeout(() => {
    onFinish();          // hide loader
    navigate("/home", { replace: true }); // redirect
  }, 2500);

  return () => clearTimeout(timer);
}, [navigate, onFinish]);

  return (
    <Box sx={{ minHeight: "100vh", width:"100%", bgcolor: "#262626", display:"flex", justifyContent:"center", alignItems:"center" }}>
      {/* Your animated loader */}
      <section className="container">
        <div className="square"></div>
        <div className="infinite-scroll"></div>
      </section>

      {/* Logo + Footer text pinned to bottom */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 1,
          background: "transparent",
        }}
      >
         <Box
      component={motion.img}
      src="/svklogo.svg"
      alt="SVjetlostkomerc Logo"
      initial={{ opacity: 0, y: -10 }} // start hidden & slightly up
      animate={{ opacity: 1, y: 0 }}   // fade in & slide down
      transition={{ delay: 1.5, duration: 1.8, ease: "easeIn" }} // starts 1s later
      sx={{
        height: { xs: 20, sm: 30, md: 30 },
        width: "auto",
        objectFit: "contain",
        mb: 0.5,
        opacity: 0.7,
      }}
    />
        <Typography
          variant="subtitle1"
          sx={{
            color: "#505050ff",
            fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          © {new Date().getFullYear()} Svjetlostkomerc d.d. Sarajevo.
        </Typography>
      </Box>
    </Box>
  );
}
