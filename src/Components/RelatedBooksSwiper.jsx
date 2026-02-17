import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../Style/RelatedBooksSwiper.css";
import { getImageUrl, getImageSrcSet } from "../Utils.js/imageUrl";

const RelatedBookCard = memo(({ book, onClick }) => {
  const image = getImageUrl(book.coverImage, { width: 300 });
  const srcSet = getImageSrcSet(book.coverImage, [160, 240, 320, 480]);

  return (
    <Card
    sx={{
      bgcolor: "#313131",
      color: "#fff",
      borderRadius: 2,
      cursor: "pointer",
      maxWidth: 260,
      mx: "auto",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
      },
      "&:focus": {
        outline: "2px solid #90caf9",
        outlineOffset: 2,
      },
    }}
    onClick={onClick}
    tabIndex={0}
    aria-label={`Open details for ${book.title}`}
  >
    <Box sx={{ width: "100%", aspectRatio: "3 / 4" }}>
      <CardMedia
        component="img"
        image={image || "/fallback-cover.jpg"}
        srcSet={srcSet}
        sizes="(max-width: 600px) 44vw, (max-width: 1200px) 220px, 260px"
        alt={book.title || "Book cover"}
        loading="lazy"
        imgProps={{ width: 260, height: 346, decoding: "async" }}
        sx={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Box>
    <CardContent>
      <Typography variant="subtitle1" noWrap fontWeight="bold">
        {book.title}
      </Typography>
      <Typography variant="body2" noWrap color="#ccc">
        {book.author}
      </Typography>
    </CardContent>
  </Card>
  );
});

const RelatedBooksSwiper = ({ books }) => {
  const navigate = useNavigate();

  return (
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
        {books.map((b) => (
          <SwiperSlide key={b._id}>
            <RelatedBookCard
              book={b}
              onClick={() =>
                navigate(`/books/${b.slug}`, {
                  state: { book: b, category: b.subCategory },
                })
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RelatedBooksSwiper;
