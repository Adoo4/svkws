// React
import { memo } from 'react';

// React Router
import { useNavigate } from 'react-router-dom';

// MUI components/hooks (direct imports)
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Local
import '../Style/RelatedBooksSwiper.css';
import useRelatedBooks from '../Utils.js/useRelatedBooks';


// ----------------------
// Skeleton Loader Card
// ----------------------
const SkeletonCard = memo(() => (
  <Card sx={{ bgcolor: "#2a2a2a", borderRadius: 2, width: 230, mx: "auto" }}>
    <Skeleton variant="rectangular" width="100%" height={300} />
    <CardContent>
      <Skeleton variant="text" width="80%" height={24} />
      <Skeleton variant="text" width="60%" height={20} />
    </CardContent>
  </Card>
));

// ----------------------
// Single Book Card
// ----------------------
const RelatedBookCard = memo(({ book, onClick }) => (
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
    <CardMedia
      component="img"
      image={book.coverImage || "/fallback-cover.jpg"}
      alt={book.title || "Book cover"}
      height={300}
      loading="lazy"
      sx={{ objectFit: "contain" }}
    />
    <CardContent>
      <Typography variant="subtitle1" noWrap fontWeight="bold">
        {book.title}
      </Typography>
      <Typography variant="body2" noWrap color="#ccc">
        {book.author}
      </Typography>
    </CardContent>
  </Card>
));

// ----------------------
// Main Component
// ----------------------
export default function RelatedBooks({ book }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Fetch related books via React Query hook
  const { data: relatedBooks = [], isLoading, isError } = useRelatedBooks(book);

  // Determine if Swiper should be used
  const useSwiper = isBelowLg || (isLgUp && relatedBooks.length > 6);

  // ----------------------
  // Loading state
  // ----------------------
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: Math.min(relatedBooks.length, 5) || 3 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i} display="flex" justifyContent="center">
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  // ----------------------
  // Error or empty state
  // ----------------------
  if (isError || !relatedBooks.length) {
    return (
      <Typography sx={{ color: "#ccc", textAlign: "center", mt: 2 }}>
        No related books found.
      </Typography>
    );
  }

  // ----------------------
  // Render books
  // ----------------------
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
            <RelatedBookCard
              book={b}
              onClick={() => navigate(`/books/${b.slug}`, { state: { book: b, category: b.subCategory } })}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : (
    <Grid container spacing={2}>
      {relatedBooks.map((b) => (
        <Grid item xs={12} sm={6} md={2} key={b._id}>
          <RelatedBookCard
            book={b}
            onClick={() => navigate(`/books/${b.slug}`, { state: { book: b, category: b.subCategory } })}
          />
        </Grid>
      ))}
    </Grid>
  );
}
