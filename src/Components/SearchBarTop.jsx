// React
import React, { useState, useCallback, useMemo } from 'react';

// MUI components (direct imports)
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

// MUI icons (direct imports)
import Close from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';

// React Router
import { useNavigate } from 'react-router-dom';

// Other libraries/hooks
import axios from 'axios';
import { useDebounce } from '../Utils.js/useDebounce';
import { SignedIn } from '@clerk/clerk-react';
import { getImageUrl } from '../Utils.js/imageUrl';


const ICON_BOX_SX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 1,
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const SuggestionItem = React.memo(({ book, setDrawerData, toggleDrawer, navigate, addToCart }) => {
  const thumbSrc = getImageUrl(book.coverImage, { width: 80 });
  const handleNavigate = () => {
    navigate(`/books/${book.slug}${window.location.search}`, {
      state: { book, category: book.subCategory },
    });
  };

  const handleDrawer = (e) => {
    setDrawerData(book);
    toggleDrawer(true)(e);
  };

  return (
    <ListItem button key={book._id || book.isbn} role="option" onClick={handleDrawer}>
      <ListItemAvatar>
        <Avatar
          src={thumbSrc || "/placeholder.png"}
          variant="square"
          sx={{ width: 40, height: 56, objectFit: "contain" }}
          imgProps={{ loading: "lazy", width: 40, height: 56, decoding: "async" }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={book.title}
        secondary={`${book.author} • ${book.mpc ? `Cijena: ${book.mpc} KM` : ""}`}
        primaryTypographyProps={{ noWrap: true, fontSize: "0.9rem", fontWeight: 500 }}
        secondaryTypographyProps={{ noWrap: true, fontSize: "0.75rem", color: "text.secondary" }}
      />
      <Box sx={{ display: "flex", gap: { xs: 1, md: 2 }, alignItems: "center" }}>
        <Box
          sx={{ ...ICON_BOX_SX, "&:hover": { backgroundColor: "#ffe5e0", transform: "scale(1.2)", color: "#d62d00" } }}
          onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
        >
          <Visibility fontSize="small" />
        </Box>
        <SignedIn>
          <Box
            sx={{ ...ICON_BOX_SX, "&:hover": { backgroundColor: "#fff3e0", transform: "scale(1.2)", color: "#ff9800" } }}
            onClick={(e) => { e.stopPropagation(); addToCart(book); }}
          >
            <AddShoppingCart fontSize="small" />
          </Box>
        </SignedIn>
      </Box>
    </ListItem>
  );
});

const SearchBarTop = ({ setDrawerData, toggleDrawer, setCart }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // ------------------- API call -------------------
  const fetchSuggestions = useCallback(async (value) => {
    try {
      const res = await axios.get("https://backendsvkwbshp.onrender.com/api/books/search", { params: { q: value } });
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  const debouncedFetch = useDebounce(fetchSuggestions, 400);

  // ------------------- Handlers -------------------
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setSuggestions([]);
      debouncedFetch.cancel();
      return;
    }
    debouncedFetch(value);
  }, [debouncedFetch]);

  const clearQuery = useCallback(() => {
    setQuery("");
    setSuggestions([]);
  }, []);

  // ------------------- Memoized suggestions list -------------------
  const suggestionsList = useMemo(() => suggestions.map((book) => (
    <SuggestionItem
      key={book._id || book.isbn}
      book={book}
      setDrawerData={setDrawerData}
      toggleDrawer={toggleDrawer}
      navigate={navigate}
      addToCart={setCart}
    />
  )), [suggestions, setDrawerData, toggleDrawer, navigate, setCart]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", px: 2, mt: "4rem", flexDirection: "column", position: "relative" }}>
      <Box sx={{ width: "100%", maxWidth: "900px", display: "flex" }}>
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
            input: { padding: { xs: "5px 14px", md: "10px 14px" }, fontSize: "0.9rem" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#313131", fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearQuery}>
                  <Close sx={{ fontSize: "1.1rem" }} />
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              "aria-label": "Search books by title, author, or ISBN",
              "aria-autocomplete": "list",
              "aria-controls": suggestions.length ? "search-suggestion-list" : undefined,
              "aria-expanded": suggestions.length > 0,
            },
          }}
        />
      </Box>

      {suggestions.length > 0 && (
        <Paper elevation={4} sx={{ mt: 1, maxWidth: "900px", width: "100%", borderRadius: 2, overflow: "hidden", position: "absolute", top: "100%", zIndex: 10 }}>
          <List id="search-suggestion-list" role="listbox" sx={{ background: "#f9f9f9" }}>
            {suggestionsList}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBarTop;
