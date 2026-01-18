 import {
   CardMedia,
   Box,

 } from "@mui/material";

 import {
   SearchOutlined as SearchOutlinedIcon,

 
 } from "@mui/icons-material";
 
 export default  function cardImage({book,toggleDrawer,setDrawerData}) {
    return (<Box sx={{ position: "relative" }}   >
    <CardMedia
      component="img"
      image={book?.coverImage}
      alt={book.title}
      loading="lazy"
      sx={{
        height: { xs: 250, sm: 200, md: 290 },
        objectFit: "contain",
        width: "100%",
        aspectRatio: "3 / 4",
      }}
    
    />

    {/* Hover Overlay with Magnifier */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.3s ease",
        "&:hover": {
          opacity: 1,
        },
        
      }}
      onClick={(e)=>{setDrawerData(book)
      toggleDrawer(true)(e)}}
      
    >
      <SearchOutlinedIcon
        sx={{
          fontSize: "4rem",
          color: "white",
        }}
        
      />
    </Box>
  </Box>)
 }