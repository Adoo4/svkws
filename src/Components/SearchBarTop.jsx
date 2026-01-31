import { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "../Utils.js/useDebounce";
import { SignedIn } from "@clerk/clerk-react";
import useCart from "../Utils.js/useCart";

import BookSortBar from "./BookSortBar";

const SearchBarTop = ({ setDrawerData, toggleDrawer }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();



  const [sortBy, setSortBy] = useState("relevance");



  const fetchSuggestions = async (value) => {
    try {
      const res = await axios.get(
        "https://backendsvkwbshp.onrender.com/api/books/search",
        { params: { q: value } },
      );

      setSuggestions(res.data);
    } catch (err) {
      console.error("Search error full:", err);
    }
  };

  const debouncedFetch = useDebounce(fetchSuggestions, 400);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      debouncedFetch.cancel(); // cancel pending request
      return;
    }

    debouncedFetch(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        px: 2,
        mt: "4rem",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        
        style={{  width: "100%", maxWidth: "900px", display:"flex" }}
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
              "&:hover": { background: "rgba(255,255,255,1)" },
              "& fieldset": { border: "none" },
            },
            input: {
              padding: { xs: "5px 14px", md: "10px 14px" },
              fontSize: "0.90rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#313131", fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setQuery("");
                    setSuggestions([]);
                  }}
                >
                  <CloseIcon sx={{ fontSize: "1.1rem" }} />

                </IconButton>
                <BookSortBar sortBy={sortBy} setSortBy={setSortBy} />
              </InputAdornment>
            ),
            inputProps: {
              "aria-label": "Search books by title, author, or ISBN",
              "aria-autocomplete": "list",
              "aria-controls": suggestions.length
                ? "search-suggestion-list"
                : undefined,
              "aria-expanded": suggestions.length > 0,
            },
          }}
          
        />
        
        
      </Box>

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
          <List
            id="search-suggestion-list"
            role="listbox"
            sx={{ background: "#f9f9f9" }}
          >
            {suggestions.map((book) => (
              <ListItem
                button
                key={book._id || book.isbn}
                role="option"
                onClick={(e) => {
                  setDrawerData(book);
                  toggleDrawer(true)(e);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={book.coverImage || "/placeholder.png"}
                    variant="square"
                    sx={{ width: 40, height: "auto", objectFit: "contain" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={book.title}
                  secondary={`${book.author} • ${book.mpc ? `Cijena: ${book.mpc} KM` : ""}`}
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

                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1, md: 2 },
                    alignItems: "center",
                  }}
                >
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
                    onClick={() => {
                      navigate(`/books/${book.slug}${window.location.search}`, {
                        state: { book, category: book.subCategory },
                      });
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </Box>
                  <SignedIn>
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
                        e.stopPropagation();
                        addToCart(book);
                      }}
                    >
                      <AddShoppingCartIcon fontSize="small" />
                    </Box>
                  </SignedIn>
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
