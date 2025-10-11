import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';



export default function AnchorTemporaryDrawer({toggleDrawer, open, setOpen, drawerData}) {
 

  console.log('Image src:', drawerData?.coverImage);

 const list = () =>
  drawerData && (
    <Box
  sx={{
    maxWidth: { xs: 210, md: 350 },
    background: "linear-gradient(to bottom, #262626, #262626)",
    height:"100%",
    zIndex: 999999,
    color: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
     
  }}
  role="presentation"
  onKeyDown={toggleDrawer(false)}
>
  {/* Cover Image */}
  <Box
    sx={{
      width: "100%",
      position: "relative",
      overflow: "hidden",
      minHeight:"300px",
    }}
  >
    <img
      src={drawerData?.coverImage}
      alt={drawerData.title}
      style={{
        width: "100%",
        height: "100%",
        
        objectFit: "contain",
        objectPosition: "top",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(to top, rgba(38,38,38,0.9), transparent)",
      }}
    />
  </Box>

  {/* Book Info */}
  <Box sx={{ px: 2, py: 2, display:"flex", flexDirection:"column", gap:"1rem" }}>
    {/* Title */}
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: "#f9f9f9",
        mb: 0,
        lineHeight: 1.3,
      }}
    >
      {drawerData.title}
    </Typography>
    {/* Author */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <PersonIcon sx={{ color: "#f7f7f7f7", fontSize: 18, opacity: 0.8 }} />
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "bold", fontSize: {xs:"0.70rem", lg:"0.85rem"}, color: "#f7f7f7f7",  }}
      >
        Autor:
      </Typography>
      <Typography variant="body2" sx={{ fontSize: {xs:"0.70rem", lg:"0.85rem"}, color: "#f7f7f7f7" }}>
       {drawerData.author
  ?.split(" ")
  .map(word =>
    word
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : ""
  )
  .join(" ")}
      </Typography>
    </Box>

   {/* Description */}
<Typography
  variant="body1"
  sx={{
    fontSize: { xs: "0.70rem", sm: "0.8rem", md: "0.85rem" },
    color: "#f5f5f5",
    opacity: 0.9,
    mb: 2,
    lineHeight: 1.5,
    textAlign: "justify",
    overflowY: "auto",
    maxHeight: { xs: 400, md: 300 },
    pr: 1, // Adds space so scrollbar doesn’t overlap text
    whiteSpace: "pre-line", // Keeps line breaks from DB text
    scrollbarWidth: "thin", // Firefox
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "10px",
    },
  }}
>
  {drawerData.description || "No description available."}
</Typography>


    
  </Box>
</Box>


  );


  return (
    <div>
     
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
  {list()}
</Drawer>
    </div>
  );
}
