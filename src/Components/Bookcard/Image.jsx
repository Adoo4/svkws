import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import { SearchOutlined as SearchOutlinedIcon } from "@mui/icons-material";
import { getImageUrl, getImageSrcSet } from "../../Utils.js/imageUrl";

export default function CardImage({
  book,
  toggleDrawer,
  setDrawerData,
  index = 0,
  isMobile = false,
}) {
  const eagerCount = isMobile ? 1 : 2;
  const isEager = index < eagerCount;
  const coverSrc = getImageUrl(book?.coverImage, { width: isMobile ? 320 : 420 });
  const coverSrcSet = getImageSrcSet(book?.coverImage);

  const handleOpenPreview = (e) => {
    setDrawerData(book);
    toggleDrawer(true)(e);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        image={coverSrc || "/fallback-cover.jpg"}
        srcSet={coverSrcSet}
        sizes="(max-width: 600px) 42vw, (max-width: 1200px) 220px, 260px"
        alt={book.title}
        loading={isEager ? "eager" : "lazy"}
        fetchpriority={isEager ? "high" : "auto"}
        decoding="async"
        imgProps={{
          width: isMobile ? 175 : 260,
          height: isMobile ? 250 : 346,
        }}
        sx={{
          height: { xs: 250, sm: 200, md: 290 },
          objectFit: "contain",
          width: "100%",
          aspectRatio: "3 / 4",
        }}
        onClick={isMobile ? handleOpenPreview : undefined}
      />

      {/* Hover Overlay with Magnifier */}
      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
            willChange: "opacity",
          }}
          onClick={handleOpenPreview}
        >
          <SearchOutlinedIcon
            sx={{
              fontSize: "4rem",
              color: "white",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
