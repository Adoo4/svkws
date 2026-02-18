
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Iconlist from '../Components/Home Components/Iconlist';
import '@fontsource/anton';
import '@fontsource/playfair-display/400-italic.css';


import Carousel from '../Components/Carousel/Carousel';
import SEO from "../Utils.js/SEO";




const Home = () => {
  const canonicalUrl = `${window.location.origin}/home`;
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "BookStore",
    name: "Bookstore.ba",
    url: "https://www.bookstore.ba/",
    logo: "https://www.bookstore.ba/logofinal.svg",
    email: "info@svjetlostkomerc.ba",
    telephone: "+38733200840",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bacici 5",
      addressLocality: "Sarajevo",
      postalCode: "71000",
      addressCountry: "BA",
    },
  };

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
        jsonLd={organizationJsonLd}
      />
      <Box sx={{ minHeight: "100lvh", background: "black" }}>
        <Carousel />
        <Iconlist />
      </Box>
    </>
  )
};

export default Home;
