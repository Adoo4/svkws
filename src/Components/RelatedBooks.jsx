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
   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // xs & sm

  useEffect(() => {
    console.log("RelatedBooks received book:", book);
  if (!book) return;

    // 🔹 Use book.subCategory but send as 'category' to backend
    axios.get(
  `https://backendsvkwbshp.onrender.com/api/books/related/${book._id}?category=${encodeURIComponent(book.mainCategory)}`
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
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <Card sx={{ bgcolor: "#2a2a2a", borderRadius: 2, width: 230 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ bgcolor: "#444" }}
              />
              <CardContent>
                <Skeleton variant="text" width="80%" height={24} sx={{ bgcolor: "#555" }} />
                <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: "#555" }} />
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

  // Render Swiper on small screens, Grid on medium+
  return isSmallScreen ? (
    <Box className="related-swiper" sx={{ position: "relative", width: "100%" }}>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={1.5}
      centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
      style={{ padding: "1rem 0" }}
    >
      {relatedBooks.map((b) => (
        <SwiperSlide key={b._id}>
          <Card
            sx={{
              bgcolor: "#313131",
              color: "#f9f9f9",
              borderRadius: 2,
              cursor: "pointer",
              maxWidth: 260,
              mx: "auto",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" },
            }}
            onClick={() => navigate(`/${b._id}`, { state: { book: b, category: b.subCategory } })}
          >
            <CardMedia
              component="img"
              image={b.coverImage}
              alt={b.title}
              height={300}
              sx={{ objectFit: "contain", borderRadius: 2 }}
            />
            <CardContent>
              <Typography variant="subtitle1" noWrap sx={{ fontWeight: "bold", mb: 0.5 }}>
                {b.title}
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: "#ccc" }}>
                {b.author}
              </Typography>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
    </Box>
  ) : (
    <Grid container spacing={2}>
      {relatedBooks.map((b) => (
        <Grid item xs={12} sm={6} md={4} key={b._id}>
          <Card
            sx={{
              bgcolor: "#313131",
              border: "1px solid black",
              color: "#f9f9f9",
              borderRadius: 2,
              cursor: "pointer",
              maxWidth: 300,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" },
            }}
            onClick={() => navigate(`/${b._id}`, { state: { book: b, category: b.subCategory } })}
          >
            <CardMedia
              component="img"
              image={b.coverImage}
              alt={b.title}
              width={"auto"}
              height={400}
              sx={{ objectFit: "contain", borderRadius: 2 }}
            />
            <CardContent>
              <Typography variant="subtitle1" noWrap sx={{ fontWeight: "bold", mb: 0.5 }}>
                {b.title}
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: "#ccc" }}>
                {b.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
