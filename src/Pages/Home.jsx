
import { useEffect, lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import Iconlist from '../Components/Home Components/Iconlist';
import '@fontsource/anton';
import '@fontsource/playfair-display/400-italic.css';
import Loading from '../Components/Loading';

import Carousel from '../Components/Carousel/Carousel';




const Home = () => {

  useEffect(()=>{
    
     window.scrollTo(0, 0); // scroll to top
  })
  return(
    
    <Box sx={{ minHeight: "100lvh", background: "black" }}>
      <Carousel />
      <Iconlist />
    </Box>
  )
};

export default Home;
