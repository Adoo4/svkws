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
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

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
  alert(e.target.value);
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
        border:"1px solid red"
      }}
    >
      <motion.div
  whileHover={{ scale: 1.01 }}
  style={{
    flexGrow: 1,
    maxWidth: "900px",
    width: "100%",
    zIndex: "99999999999",
  }}
>
  <Paper
    component="form"
    sx={{
      p: "2px 8px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: "50px",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      "&:hover": {
        background: "rgba(255,255,255,1)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      },
    }}
    onSubmit={(e) => e.preventDefault()}
  >
    <InputBase
      sx={{ ml: 1, flex: 1, fontSize: "0.95rem", p: "6px 8px" }}
      placeholder="Pretraži knjige, autore, ISBN..."
      inputProps={{ "aria-label": "search books" }}
      value={query}
      onChange={handleSearch}
    />
    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
      <SearchIcon sx={{ color: "#313131" }} />
    </IconButton>
  </Paper>
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
 <Box sx={{ display: "flex", gap: {xs:1, md:2}, alignItems: "center",  }}>
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

