import React, { useCallback } from 'react';
import { DotButton, useDotButton } from './Carousel-accessory';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Typography, Button } from '@mui/material';
import { useMediaQuery } from "@mui/material";
import './Carousel-style.css';
import { Link,  Stack } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Home = () => {
 

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const isXsScreen = useMediaQuery("(max-width:600px)");
  const containerHeight = isXsScreen ? "100lvh" : "100lvh";
  let navigate = useNavigate();
  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );


  const slideTexts = [
  {
    title: "Klik do knjige",
    subtitle: " Brzo i jednostavno pronađi svoje omiljene knjige. Pretražuj i uživaj u najboljim ponudama za najtraženije naslove.",
  },
  {
    title: "Znanje Počinje sa Pravom Knjigom",
    subtitle: "Pronađi inspiraciju na svakoj stranici",
  },
  {
    title: "Najbolje Ponude za Najtraženije Naslove",
    subtitle: "Knjige koje želiš, po cijenama koje voliš",
  },
];

  return (
    <Box sx={{ position: 'relative' }}>
    {/* Embla Carousel */}
    <div className="embla" ref={emblaRef}>
      <div className="embla__container" style={{ height: containerHeight }}>

        
        <div className="embla__slide" >
          <img
           loading="eager"
            src="https://i.postimg.cc/T38Bvycw/funny-image-with-kid.jpg"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
           loading="lazy"
            src="https://i.postimg.cc/nhtqv85J/international-day-education-cartoon-style.jpg"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
           loading="lazy"
            src="https://i.postimg.cc/j5jQ1LvG/hot-air-balloons-dotting-sky-mountain-range.jpg"
            alt=""
          />
        </div>
        
      </div>
    </div>

    <Stack direction="column" sx={{
        position: 'absolute',
        top: '30%', // Adjust as needed for positioning
        left: '1.2rem',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 2,
        color: 'white',
        padding: '1rem',
        width: '3rem',
        borderRadius:"0px 15px 15px 0px",
        backgroundColor:"#111",
    
        display:"flex",
        flexDirection:"column",
        
      }} spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
            <Link
              href="https://www.facebook.com/svjetlostkomerc"
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="Facebook"
              sx={{ transition: 'color 0.3s', '&:hover': { color: '#4267B2' } }}
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/svjetlostkomerc"
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="Instagram"
              sx={{ transition: 'color 0.3s', '&:hover': { color: '#E1306C' } }}
            >
              <Instagram />
            </Link>
          </Stack>
  
    {/* Text and Icons positioned on top of the carousel */}
    <Box
      sx={{
        position: 'absolute',
        top: '50%', // Adjust as needed for positioning
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 2,
        color: 'white',
        padding: '1rem',
        width: '100%',
    
        display:"flex",
        flexDirection:"column",
        
      }}
    >
       
<Typography
      variant="h2"
      sx={{
        fontWeight: 'bold',
        fontSize: { xs: '2rem', md: '4rem', lg: '5rem' },
        color: '#f9f9f9',
        textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
        animation: 'fadeInDown 1s ease forwards',
        '@keyframes fadeInDown': {
          '0%': { opacity: 0, transform: 'translateY(-50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {slideTexts[selectedIndex]?.title}
    </Typography>

    <Typography
      variant="h5"
      sx={{
        color: '#f9f9f9',
        fontSize: { xs: '1rem', md: '1.5rem', lg: '2rem' },
        textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
        animation: 'fadeInUp 1.2s ease forwards',
        
        '@keyframes fadeInUp': {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {slideTexts[selectedIndex]?.subtitle}
    </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          color: 'white',
          mt: '1rem',
          justifyContent: 'center',
        }}
      >
         <Button variant="outlined"
  sx={{ borderRadius: "12px", textTransform: "none", flex: { xs: 1, sm: "unset" }, borderColor: "#f9f9f9", color: "#f9f9f9", fontSize: { xs: "0.8rem", sm: "1rem" }, "&:hover": { borderColor: "#f33600", color: "#f33600" } }}
  onClick={()=>navigate("/shop")}
>
  BOOKSTORE
</Button>
        
      </Box>
     
      
    </Box>
    <Box
  sx={{
    position: 'absolute',
    bottom: '1rem',
    left: '10%',
    transform: 'translateX(-10%)',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 3,
  }}
>
  {scrollSnaps.map((_, index) => (
    <DotButton
      key={index}
      onClick={() => onDotButtonClick(index)}
      className={index === selectedIndex ? 'embla__dot embla__dot--selected' : 'embla__dot'}
    />
  ))}
</Box>
  </Box>
  );
};

export default Home;
