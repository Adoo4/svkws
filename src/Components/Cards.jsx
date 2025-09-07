
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Rating,
    Chip,
    IconButton,
    TextField
  } from "@mui/material";
  import AddIcon from '@mui/icons-material/Add';
  import RemoveIcon from '@mui/icons-material/Remove';
  import { useState } from "react";;

export default function ImgMediaCard() {

    const [quantity, setQuantity] = useState(1);


    const product = {
        name: "Premium Ballpoint Pens - Pack of 10",
        image: "https://www.callows.com.au/images/ProductImages/500/522625.jpg",
        description: "Smooth ink flow, long-lasting, ideal for everyday writing.",
        originalPrice: 9.99,
        discountPrice: 6.99,
        rating: 4.5,
        reviews: 48,
        offer: "Back to School Sale!"
      };

      const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
      };

  return (
    <Card sx={{ maxWidth: 300, position: 'relative', m: 0 }}>
      {/* Special Offer Badge */}
      <Chip
        label={product.offer}
        color="secondary"
        size="small"
        sx={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}
      />

      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
      />

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1" color="error" fontWeight="bold">
            ${product.discountPrice.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            ${product.originalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <Rating value={product.rating} readOnly precision={0.5} size="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({product.reviews} reviews)
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        {/* Quantity Control */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => handleQuantityChange(-1)} size="small">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <TextField
            value={quantity}
            size="small"
            sx={{ width: 40, mx: 1 }}
            inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
          />
          <IconButton onClick={() => handleQuantityChange(1)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box>
          <Button size="small" variant="outlined">Add to Cart</Button>
          <Button size="small">Details</Button>
        </Box>
      </CardActions>
    </Card>
  );
}