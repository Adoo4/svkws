import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the main book
    axios
      .get(`http://192.168.0.15:5000/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        // After fetching the main book, fetch related books
        fetchRelatedBooks(res.data._id, res.data.mainCategory);
      })
      .catch((err) => console.error("Book fetch error:", err));
  }, [id]);

  const fetchRelatedBooks = (id, category) => {
    axios
      .get(
        `http://192.168.0.15:5000/api/books/related/${id}?category=${encodeURIComponent(
          category
        )}`
      )
      .then((res) => {
        setRelatedBooks(res.data);
        console.log(res.data); // ovdje odmah vidiš podatke iz odgovora
        setLoadingRelated(false);
      })
      .catch((err) => console.error("Related books fetch error:", err));
  };

  if (!book) return <Typography>Loading book...</Typography>;

  return (
    <Box
      mt={0}
      
      sx={{width:{xs:"100%", md:"75%", lg:"50%"}, background: "#262626", padding: "1rem", justifyContent: "center" }}
    >
      <Grid container spacing={2} justifyContent="center">
        {loadingRelated ? (
          // 🔹 Skeleton placeholders dok se fetchaju
          <Grid container spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={index}
                display="flex"
                justifyContent="center"
              >
                <Card
                  sx={{
                    bgcolor: "#2a2a2a",
                    borderRadius: "16px",
                    width: "230px",
                    maxWidth: 280,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      bgcolor: "#444",
                    }}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={24}
                      sx={{ bgcolor: "#555" }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={20}
                      sx={{ bgcolor: "#555" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : relatedBooks.length > 0 ? (
          relatedBooks.length > 2 ? (
            // 🔹 Swiper kad ima više od 2 knjige
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={2}
              slidesPerView={"auto"} // 👈 makes slides adapt to their width
              centeredSlides={true} // 👈 keeps the active slide centered
              initialSlide={Math.floor(relatedBooks.length / 2)}
              breakpoints={{
                300: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                900: { slidesPerView: 3 },
              }}
              navigation
              pagination={{ clickable: true }}
              style={{ padding: "1rem 0", width: "100%" }}
            >
              {relatedBooks.map((book) => (
                <SwiperSlide key={book._id}>
                  <Card
                    sx={{
    bgcolor: "#313131",
    border: "1px solid black",
    color: "#f9f9f9",
    borderRadius: "16px",
    cursor: "pointer",
    width: "100%",
    maxWidth: 260,   // 👈 keeps card from being too wide
    mx: "auto",      // 👈 centers card inside the grid/swiper cell
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    },
  }}
                    onClick={() =>
                      navigate(`/${book._id}`, {
                        state: { book, category: book.subCategory },
                      })
                    }
                  >
                    <CardMedia
                      component="img"
                      image={book.coverImage}
                      alt={book.title}
                      height={300}
                      sx={{
                        objectFit: "contain",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{ fontWeight: "bold", mb: 0.5 }}
                      >
                        {book.title}
                      </Typography>
                      <Typography variant="body2" noWrap sx={{ color: "#ccc" }}>
                        {book.author}
                      </Typography>
                      <Typography variant="body2" noWrap sx={{ color: "#ccc" }}>
                        {book?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // 🔹 Grid kad ima 2 ili manje knjige
            relatedBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book._id}>
                <Card
                  sx={{
                    bgcolor: "#313131",
                    border: "1px solid black",
                    color: "#f9f9f9",
                    borderRadius: "16px",
                    cursor: "pointer",
                    maxWidth: "300px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                    },
                  }}
                  onClick={() =>
                    navigate(`/${book._id}`, {
                      state: { book, category: book.subCategory },
                    })
                  }
                >
                  <CardMedia
                    component="img"
                    image={book.coverImage}
                    alt={book.title}
                    height={300}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      {book.title}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ color: "#ccc" }}>
                      {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )
        ) : (
          <Typography sx={{ color: "#ccc", ml: 2 }}>
            Nema sličnih knjiga za prikaz.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
