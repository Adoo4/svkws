import  { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";

const SearchBarTop = ({ booksCopy, setBooks, books, setCart }) => {
  console.log("SearchBarTop booksCopy:", booksCopy);

  const [query, setQuery] = useState("");
  const [fuse, setFuse] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
   const navigate = useNavigate();
console.log("booksCopy:", booksCopy);
useEffect(() => {
  if (!Array.isArray(booksCopy) || booksCopy.length === 0) {
    console.log("No booksCopy data yet");
    return;
  }

  const fuseInstance = new Fuse(
    booksCopy.map((b) => ({
      ...b,
      isbn: String(b.isbn || ""),
    })),
    { keys: ["title", "author", "isbn", "publisher"], threshold: 0.3 }
  );

  console.log("Fuse instance created with items:", fuseInstance);
  setFuse(fuseInstance);
}, [booksCopy]);

const handleSearch = (e) => {
  console.log(e.target.value);
  const value = e.target.value;
  setQuery(value);
  console.log("Search query:", value);

  if (value.trim() === "") {
    setSuggestions([]);
    setBooks(booksCopy);
    return;
  }

  if (fuse) {
  const results = fuse.search(value).map((res) => res.item);
  setSuggestions(results.slice(0, 6));
} else {
  console.log("Fuse not ready yet");
}
};

  const handleSelect = (book) => {
  setQuery(book.title);
  setBooks([book]); // now update the main books state
  setSuggestions([]); // close dropdown
};

   function addToCart(product) {
  setCart((prevCart) => {
    const existing = prevCart.find((item) => item._id === product._id);

    // check if discount is still valid
    const hasValidDiscount =
      product.discount &&
      new Date(product.discount.validUntil) > new Date();

    if (existing) {
      return prevCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
              discount: hasValidDiscount ? product.discount : null,
            }
          : item
      );
    } else {
      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
          discount: hasValidDiscount ? product.discount : null,
        },
      ];
    }
  });
}

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        px: 2,
        mt: "5rem",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        style={{
          flexGrow: 1,
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <TextField
          size="small"
          value={query}
          onChange={handleSearch}
          placeholder="Pretraži knjige, autore, ISBN..."
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                background: "rgba(255,255,255,1)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(49,49,49,0.2)",
              },
              "& fieldset": {
                border: "none",
              },
            },
            input: {
              padding: "10px 14px",
              fontSize: "0.95rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#313131", fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
        />
      </motion.div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            mt: 1,
            maxWidth: "900px",
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
            position: "absolute",
            top: "100%",
            zIndex: 10,
          }}
        >
          <List sx={{background: "#f9f9f9"}}> 
            {suggestions.map((book) => (
              <ListItem
  button
  key={book._id || book.isbn || Math.random()}
  onClick={() => handleSelect(book)}
>
  <ListItemAvatar>
    <Avatar
      src={book.coverImage || "/placeholder.png"} // fallback
      variant="square"
      sx={{ width: 40, height: 60 }}
    />
  </ListItemAvatar>
                <ListItemText
                  primary={book.title}
                  secondary={book.author}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: "0.75rem",
                    color: "text.secondary",
                  }}
                />
 <Box sx={{ display: "flex", gap: {xs:1, md:2}, alignItems: "center" }}>
      {/* View Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#ffe5e0",
            transform: "scale(1.2)",
            color: "#d62d00",
          },
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent ListItem click
          navigate(`/${book._id}`, {
            state: {
              book, // full book object
              category: book.subCategory, // optional: category for related books
            },
          });
        }}
      >
        <VisibilityIcon fontSize="small" />
      </Box>

      {/* Add to Cart Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#fff3e0",
            transform: "scale(1.2)",
            color: "#ff9800",
          },
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent ListItem click
          addToCart(book);
        }}
      >
        <AddShoppingCartIcon fontSize="small" />
      </Box>
    </Box>


              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBarTop;

