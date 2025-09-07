// src/components/LoadingDevice.jsx

import "../Style/Loading.css"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";





const LoadingDevice = ({ imageUrl }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If user has visited before, skip loading
    if (sessionStorage.getItem("hasVisitedBefore")) {
      setLoading(false);
      navigate("/home");
      return;
    }

    if (!imageUrl) {
      setIsImageLoaded(true); // no image to load, treat as loaded
      return;
    }

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setIsImageLoaded(true);
      sessionStorage.setItem("hasVisitedBefore", "true");
    };

    img.onerror = () => {
      setIsImageLoaded(true); // mark as loaded even if error, so loader stops
    };
  }, [imageUrl, navigate]);

  useEffect(() => {
    if (!isImageLoaded) return;

    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 6000); // optional delay

    return () => clearTimeout(timer);
  }, [isImageLoaded, navigate]);

  if (!loading) return null;

  return (
    <div className="LoaderWrapper">
      {/* Your animated device */}
      <div className="device">
        <div className="device__a">
          <div className="device__a-1"></div>
          <div className="device__a-2"></div>
        </div>
        <div className="device__b"></div>
        <div className="device__c"></div>
        <div className="device__d"></div>
        <div className="device__e"></div>
        <div className="device__f"></div>
        <div className="device__g"></div>
      </div>

      {/* Logo + Footer */}
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.8, ease: "easeIn" }}
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
    </div>
  );
};

export default LoadingDevice;
