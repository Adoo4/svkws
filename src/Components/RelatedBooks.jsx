import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Style/RelatedBooksSwiper.css";

export default function RelatedBooks({ book }) {
  const navigate = useNavigate();
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isBelowLg = useMediaQuery(theme.breakpoints.down("lg")); // xs, sm, md
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));     // lg & xl

  // ✅ FINAL DECISION LOGIC
  const useSwiper = isBelowLg || (isLgUp && relatedBooks.length > 6);

  useEffect(() => {
    if (!book) return;

    axios
      .get(
        `https://backendsvkwbshp.onrender.com/api/books/related/${book._id}?category=${encodeURIComponent(
          book.mainCategory
        )}`
      )
      .then((res) => {
        setRelatedBooks(res.data);
        setLoading(false);
      })
      .catch((err) =>
        console.error("Related books fetch error:", err.response || err)
      );
  }, [book]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
            <Card sx={{ bgcolor: "#2a2a2a", borderRadius: 2, width: 230 }}>
              <Skeleton variant="rectangular" width="100%" height={300} />
              <CardContent>
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="60%" height={20} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!relatedBooks.length) {
    return <Typography sx={{ color: "#ccc" }}>No related books found.</Typography>;
  }

  // ✅ USE useSwiper HERE
  return useSwiper ? (
    <Box className="related-swiper" sx={{ width: "100%" }}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1.5}
        breakpoints={{
          400: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          900: { slidesPerView: 5 },
          1200: { slidesPerView: 5 },
          1536: { slidesPerView: 7 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {relatedBooks.map((b) => (
          <SwiperSlide key={b._id}>
            <Card
              sx={{
                bgcolor: "#313131",
                color: "#fff",
                borderRadius: 2,
                cursor: "pointer",
                maxWidth: 260,
                mx: "auto",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                },
              }}
              onClick={() =>
                navigate(`/${b._id}`, { state: { book: b, category: b.subCategory } })
              }
            >
              <CardMedia
                component="img"
                image={b.coverImage}
                alt={b.title}
                height={300}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap fontWeight="bold">
                  {b.title}
                </Typography>
                <Typography variant="body2" noWrap color="#ccc">
                  {b.author}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : (
    <Grid container spacing={1}>
      {relatedBooks.map((b) => (
        <Grid item xs={12} sm={6} md={2} key={b._id}>
          <Card
            sx={{
              bgcolor: "#313131",
              color: "#fff",
              borderRadius: 2,
              cursor: "pointer",
              maxWidth: 260,
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              },
            }}
            onClick={() =>
              navigate(`/${b._id}`, { state: { book: b, category: b.subCategory } })
            }
          >
            <CardMedia
              component="img"
              image={b.coverImage}
              alt={b.title}
              height={300}
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="subtitle1" noWrap fontWeight="bold">
                {b.title}
              </Typography>
              <Typography variant="body2" noWrap color="#ccc">
                {b.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
