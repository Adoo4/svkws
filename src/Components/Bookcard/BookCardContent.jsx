import { CardContent, Typography, Box } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import  kategorije  from "../../Utils.js/kategorije";





const BookCardContent = ({
  book,
  inWishlist,
  categoryMatch,
  mainCategory,
  finalPrice,
  hasDiscount,
  formatCategoryName
}) => {
  return (
    <CardContent
      sx={{
        p: 0,
        minHeight: { xs: "5rem", sm: "7rem" },
        alignItems: "space-between",
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 500,
          color: inWishlist ? "#f1f1f1" : "#262626",
          mb: 0.5,
          lineHeight: 1.2,
          fontSize: { xs: "0.80rem", sm: "0.88rem", md: "0.95rem" },
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          minHeight: "1.8rem",
        }}
      >
        {book?.title}
      </Typography>

      {/* Categories */}
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          mb: 1,
          flexWrap: "nowrap",
          overflow: "hidden",
        }}
      >
        {/* XS Compact Version */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            width: "100%",
            gap: 0.2,
            px: 1,
            py: 0.2,
            borderRadius: "16px",
            bgcolor: categoryMatch?.boja,
            color: categoryMatch?.boja,
            fontSize: "0.65rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {/* Icon */}
          {(() => {
            const kat = kategorije.find(
              (k) =>
                k.naziv === book.mainCategory ||
                k.podkategorije?.includes(book.subCategory)
            );
            return kat?.ikona ? (
              <Box sx={{ display: "flex", alignItems: "center", fontSize: "1rem" }}>
                {kat.ikona}
              </Box>
            ) : (
              <ImportContactsIcon sx={{ fontSize: "1rem" }} />
            );
          })()}

          {/* Subcategory text */}
          <Typography
            component="span"
            sx={{
              ml: 0.5,
              color: inWishlist ? "#f1f1f1" : "#262626",
              fontWeight: 600,
              lineHeight: 1.2,
              fontSize: "0.65rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {book.subCategory}
          </Typography>
        </Box>

        {/* SM+ Full Category Display */}
        {mainCategory && (
          <Box
            sx={{
              display: { xs: "none", md: "inline-flex" },
              alignItems: "center",
              gap: "0.2rem",
              color: "white",
            }}
          >
            {/* Icon */}
            <Box
              sx={{ color: mainCategory.boja, display: "flex", alignItems: "center" }}
            >
              {mainCategory.ikona}
            </Box>

            <Box sx={{ display: "flex" }}>
              {/* Main Category */}
              <Typography
                component="span"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: inWishlist ? "#f1f1f1" : "#262626",
                }}
              >
                {formatCategoryName(book.mainCategory)}
              </Typography>

              {/* Slash */}
              {book.subCategory && (
                <Typography
                  component="span"
                  sx={{
                    mx: 0.5,
                    fontWeight: 400,
                    fontSize: "0.6rem",
                    opacity: 0.6,
                    color: "#313131",
                  }}
                >
                  /
                </Typography>
              )}

              {/* Sub Category */}
              {book.subCategory && (
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 400,
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: inWishlist ? "#f1f1f1" : "#262626",
                  }}
                >
                  {book.subCategory}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Description */}
      <Typography
        sx={{
          color: inWishlist ? "#f1f1f1" : "#262626",
          fontWeight: "500",
          fontSize: { xs: "0.60rem", md: "0.8rem" },
          fontStyle: "italic",
          lineHeight: 1.3,
          display: { xs: "none", md: "-webkit-box" },
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word",
        }}
      >
        {book.description}
      </Typography>

      {/* Price */}
      <Box sx={{ mt: 1 }}>
        {hasDiscount ? (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#f33600",
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
            >
              {finalPrice.toFixed(2)} KM
            </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#999",
                fontSize: { xs: "0.65rem", sm: "0.8rem" },
              }}
            >
              {book.price.toFixed(2)} KM
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontWeight: "bold",
              color: inWishlist ? "#f1f1f1" : "#262626",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            {book.price.toFixed(2)} KM
          </Typography>
        )}
      </Box>
    </CardContent>
  );
};

export default BookCardContent;
