import { CardContent, Typography, Box } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import kategorije from "../../Utils.js/kategorije";
import { Chip } from '@mui/material';

const BookCardContent = ({
  book,
  inWishlist,
  categoryMatch,
  mainCategory,
  finalPrice,
  hasDiscount,
  formatCategoryName,
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
          fontWeight: 600,
          color: inWishlist ? "#f1f1f1" : "#262626",
          mb: 0.6,
          lineHeight: { xs: 1.3, sm: 1.2 },
          fontSize: { xs: "0.88rem", sm: "0.88rem", md: "0.95rem" },

          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "1.7rem", // ⬅️ important for xs consistency bio je 2.2rem
        }}
      >
        {book?.title}
      </Typography>

      <Typography
        sx={{
          display: { xs: "block" },
          fontSize: {xs:"0.65rem", md:"0.75rem"},
          color: "#555",
          fontWeight: 500,
          mb: 0.4,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {book.author}
      </Typography>
      {/* Right: Gray Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // pushes content to edges
          alignItems: "center",
          width: "100%",
          mt: 0.5,
        }}
      >
        {/* Left side can be empty or categories */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {/* Put categories here if you want */}
        </Box>
      </Box>

      {/* Categories */}
      {/* Categories + Right-side Icons */}
      {/* Quantity message */}
<Box sx={{ mb: 0.5 }}>
  {book.quantity === 0 && (
    <Chip
      label="Nema na stanju"
      color="error"
      size="small"
      sx={{ fontSize: "0.65rem", height: 18, px: 0.5 }}
    />
  )}

  {book.quantity > 0 && book.quantity <= 5 && (
    <Chip
      label={`Samo ${book.quantity} na stanju`}
      color="warning"
      size="small"
      sx={{ fontSize: "0.65rem", height: 18, px: 0.5 }}
    />
  )}

  {book.quantity > 5 && (
    <Chip
      label="Ima na stanju"
      color="success"
      size="small"
      sx={{ fontSize: "0.65rem", height: 18, px: 0.5 }}
    />
  )}
</Box>

{/* Categories + Right-side Icons */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    gap: 0.5,
  }}
>
  {/* Left side: Categories */}
  <Box
    sx={{
      display: "flex",
      gap: 0.5,
      flexWrap: "wrap",
      alignItems: "center",
      maxWidth: { xs: "70%", sm: "80%", md: "85%" },
      overflow: "hidden",
    }}
  >
    {/* XS Compact Version */}
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        width: "fit-content",
        maxWidth: "100%",
        gap: 0.6,
        px: 1,
        py: 0.15,
        borderRadius: "999px",
        bgcolor: `${categoryMatch?.boja}20`,
        backdropFilter: "blur(4px)",
        border: `1px solid ${categoryMatch?.boja}50`,
        color: categoryMatch?.boja,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: { xs: "0.75rem", md: "0.85rem" },
          color: categoryMatch?.boja,
        }}
      >
        {kategorije.find(
          (k) =>
            k.naziv === book.mainCategory ||
            k.podkategorije?.includes(book.subCategory)
        )?.ikona || <ImportContactsIcon sx={{ fontSize: "0.85rem" }} />}
      </Box>

      {/* Subcategory text */}
      <Typography
        component="span"
        sx={{
          fontSize: "0.65rem",
          fontWeight: 300,
          color: "#262626",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 120,
        }}
      >
        {book.subCategory?.split(" ")[0]}
      </Typography>
    </Box>

    {/* SM+ Full Category Display */}
    {mainCategory && (
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 0.2,
          color: "white",
          flexWrap: "wrap",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            color: mainCategory.boja,
            display: "flex",
            alignItems: "center",
          }}
        >
          {mainCategory.ikona}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 0.25,
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
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
</Box>


      {/* Description */}
      <Typography
        sx={{
          color: inWishlist ? "#f1f1f1" : "#262626",
          fontWeight: "500",
          fontSize: { xs: "0.60rem", md: "0.75rem" },
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
    

{/* Price */}
<Box sx={{ mt: 1 }}>
  {hasDiscount ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: "error.main",
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
          }}
        >
          {/* Discounted price with fallback */}
          {(book.discountedPrice ?? (book.priceWithVAT ?? book.price * 1.17) ?? 0).toFixed(2)} KM
        </Typography>
        <Typography
          sx={{
            textDecoration: "line-through",
            color: "text.disabled",
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
          }}
        >
          {/* Original price with VAT fallback */}
          {(book.priceWithVAT ?? book.price * 1.17 ?? 0).toFixed(2)} KM
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
        *PDV uključen u cijenu
      </Typography>
    </Box>
  ) : (
    <Box>
      <Typography
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          fontSize: { xs: "0.8rem", sm: "1rem" },
        }}
      >
        {(book.priceWithVAT ?? book.price * 1.17 ?? 0).toFixed(2)} KM
      </Typography>
      <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
        *PDV uključen u cijenu
      </Typography>
    </Box>
  )}
</Box>


    </CardContent>
  );
};

export default BookCardContent;
