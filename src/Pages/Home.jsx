
import  {  useEffect } from 'react';
import { Box } from '@mui/material';
import Carousel from '../Components/Carousel/Carousel'
import Iconlist from '../Components/Home Components/Iconlist';
import '@fontsource/anton';
import '@fontsource/playfair-display/400-italic.css';



const Home = () => {

  useEffect(()=>{
     window.scrollTo(0, 0); // scroll to top
  })
  return(
    <Box sx={{ minHeight:"100lvh", display:"flex", flexDirection:"column", gap:"0rem", background:"black"}}>
    <Carousel/>
    <Iconlist/>

    

  </Box>
  )
};

export default Home;
