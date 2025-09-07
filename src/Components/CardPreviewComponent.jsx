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
     marginBottom:{xs:"3rem", sm:"0"}
  }}
  role="presentation"
  onKeyDown={toggleDrawer(false)}
>
  {/* Cover Image */}
  <Box
    sx={{
      width: "100%",
      minHeight: "auto",
      position: "relative",
      overflow: "hidden",
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
        sx={{ fontWeight: "bold", fontSize: "0.70rem", color: "#f7f7f7f7",  }}
      >
        Autor:
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "0.70rem", color: "#f7f7f7f7" }}>
        {drawerData.author}
      </Typography>
    </Box>

    {/* Description */}
    <Typography
      variant="body2"
      sx={{
        fontSize: {xs:"0.60rem", md:"0.8rem"},
        color: "#f7f7f7f7",
        opacity: 0.85,
        mb: 2,
        lineHeight: 1.5,
      }}
    >
      {drawerData.description}
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
