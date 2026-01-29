import { useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Box, Typography, Button, Stack, Link } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DotButton, useDotButton } from "./Carousel-accessory";
import "./Carousel-style.css";

const AUTOPLAY_DELAY = 5000;
const autoplayPlugin = Autoplay({
  delay: AUTOPLAY_DELAY,
  stopOnInteraction: false,
  playOnInit: false,
});

const slideTexts = [
  {
    title: "Klik do knjige",
    subtitle:
      "Brzo i jednostavno pronađi svoje omiljene knjige. Pretražuj i uživaj u najboljim ponudama za najtraženije naslove.",
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

const Home = () => {
  const videoRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin,
  ]);
  const isXsScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const containerHeight = useMemo(
    () => (isXsScreen ? "100lvh" : "100lvh"),
    [isXsScreen],
  ); // keep if you plan to change later

  // Safe, stable callback invoked from DotButton or other nav UI
  const onNavButtonClick = useCallback((embla) => {
    const autoplay = embla?.plugins?.().autoplay;
    if (!autoplay) return;

    const action =
      autoplay.options?.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;
    if (typeof action === "function") action.call(autoplay);
  }, []);

  // Hook for dots: useDotButton expects stable emblaApi and callback
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  // Manage video <-> embla autoplay behaviour
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins?.().autoplay;
    if (!autoplay) return;

    const video = videoRef.current;
    if (!video) return;

    // Ensure autoplay is stopped while video playing
    autoplay.stop();

    const handleEnded = () => {
      // resume embla autoplay and move to next slide once video finished
      autoplay.play();
      try {
        emblaApi.scrollNext();
      } catch (e) {
        /* ignore */
      }
    };

    const handleCanPlay = async () => {
      // Attempt to play video; if autoplay is blocked, do nothing
      try {
        await video.play();
      } catch (err) {
        // play may be blocked by browser policy; keep embla paused
      }
      autoplay.stop();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [emblaApi]);

  // Ensure autoplay stops when user interacts with embla manually
  useEffect(() => {
    if (!emblaApi) return;
    const onUserScroll = () => {
      const autoplay = emblaApi.plugins?.().autoplay;
      if (autoplay) autoplay.stop();
    };
    emblaApi.on && emblaApi.on("pointerDown", onUserScroll);
    return () => {
      emblaApi.off && emblaApi.off("pointerDown", onUserScroll);
    };
  }, [emblaApi]);

  return (
    <Box sx={{ position: "relative" }}>
      <div className="embla" ref={emblaRef}>
  <div className="embla__container" style={{ height: containerHeight }}>

    {/* Slide 1 — VIDEO (not LCP) */}
    <div className="embla__slide">
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-label="Promotional video"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/final_landing_video_high.webm" type="video/webm" />
      </video>
    </div>

    {/* Slide 2 — LCP IMAGE (IMPORTANT) */}
    <div className="embla__slide">
      <img
        src="/internationalDay-1280.webp"
        srcSet="
          /internationalDay-768px.webp 768w,
          /internationalDay-1280px.webp 1280w,
          /internationalDay-1920px.webp 1920w
        "
        sizes="100vw"
        width="1920"
        height="940"
        alt="Educational illustration with books and characters"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>

    {/* Slide 3 — NON-LCP IMAGE */}
    <div className="embla__slide">
      <img
        src="/hot-air-balloons-dotting-sky-mountain-range-converted-from-jpg.webp"
        loading="lazy"
        decoding="async"
        width="1920"
        height="940"
        alt="Hot air balloons over mountains"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>

  </div>
</div>


      {/* Social links: repositioned for better accessibility & predictable layout */}
      <Stack
        direction="column"
        sx={{
          position: "absolute",
          top: "30%",
          left: 0,
          zIndex: 2,
          color: "white",
          p: 1,
          borderRadius: "0 15px 15px 0",
          backgroundColor: "#111",
        }}
        spacing={2}
      >
        <Link
          href="https://www.facebook.com/knjizarasvjetlost"
          target="_blank"
          rel="noopener"
          color="inherit"
          aria-label="Facebook"
        >
          <Facebook />
        </Link>
        <Link
          href="https://www.instagram.com/knjizaresvjetlost/"
          target="_blank"
          rel="noopener"
          color="inherit"
          aria-label="Instagram"
        >
          <Instagram />
        </Link>
      </Stack>

      {/* Centered overlay text */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          color: "#f9f9f9",
          width: "100%",
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          className="fadeInDown"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "4rem" },
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          {slideTexts[selectedIndex]?.title}
        </Typography>

        <Typography
          variant="h5"
          className="fadeInUp"
          sx={{
            mt: 1,
            fontSize: { xs: "1rem", md: "1.5rem" },
            textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {slideTexts[selectedIndex]?.subtitle}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#f9f9f9",
              color: "#f9f9f9",
            }}
            onClick={() => navigate("/shop")}
            aria-label="Open bookstore"
          >
            BOOKSTORE
          </Button>
        </Box>
      </Box>

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 3,
        }}
      >
        {scrollSnaps.map((_, idx) => (
          <DotButton
            key={idx}
            onClick={() => onDotButtonClick(idx)}
            className={
              idx === selectedIndex
                ? "embla__dot embla__dot--selected"
                : "embla__dot"
            }
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
