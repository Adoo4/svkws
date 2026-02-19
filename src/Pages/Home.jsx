
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Iconlist from '../Components/Home Components/Iconlist';
import '@fontsource/anton';
import '@fontsource/playfair-display/400-italic.css';


import Carousel from '../Components/Carousel/Carousel';
import SEO from "../Utils.js/SEO";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "../Utils.js/seoBusinessData";




const Home = () => {
  const canonicalUrl = `${window.location.origin}/home`;

  useEffect(()=>{
    
     window.scrollTo(0, 0); // scroll to top
  }, [])
  return(
    <>
      <SEO
        title="Bookstore.ba | Online knjizara u Bosni i Hercegovini"
        description="Bookstore.ba je online knjizara u BiH sa sirokim izborom knjiga: beletristika, djecije knjige, strucna literatura i bestseleri."
        url={canonicalUrl}
        ogImage="/og-image.png"
        keywords="online knjizara BiH, knjige Sarajevo, knjige Bosna i Hercegovina, bookstore.ba"
        jsonLd={[websiteJsonLd, organizationJsonLd, localBusinessJsonLd]}
      />
      <Box sx={{ minHeight: "100lvh", background: "black" }}>
        <Carousel />
        <Iconlist />
      </Box>
    </>
  )
};

export default Home;
