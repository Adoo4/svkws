// React
import React, { useState, useCallback, useMemo } from 'react';

// MUI components
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
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

// MUI icons
import Close from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import ArrowForward from '@mui/icons-material/ArrowForward';

// React Router
import { useNavigate } from 'react-router-dom';

// Other
import axios from 'axios';
import { useDebounce } from '../Utils.js/useDebounce';
import { SignedIn } from '@clerk/clerk-react';
import { getImageUrl } from '../Utils.js/imageUrl';

// ── Suggestion item ────────────────────────────────────────────────────────
const SuggestionItem = React.memo(({ book, index, setDrawerData, toggleDrawer, navigate, addToCart }) => {
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
    <>
      {index > 0 && <Divider sx={{ mx: 2, borderColor: "rgba(0,0,0,0.05)" }} />}
      <ListItem
        button
        role="option"
        onClick={handleDrawer}
        sx={{
          px: { xs: 2, md: 3 },
          py: 1.5,
          gap: 2,
          transition: "background 0.15s ease",
          "&:hover": { background: "rgba(0,0,0,0.025)" },
        }}
      >
        {/* Cover */}
        <ListItemAvatar sx={{ minWidth: "auto" }}>
          <Avatar
            src={thumbSrc || "/placeholder.png"}
            variant="rounded"
            sx={{
              width: 44,
              height: 60,
              objectFit: "cover",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              flexShrink: 0,
            }}
            imgProps={{ loading: "lazy", decoding: "async" }}
          />
        </ListItemAvatar>

        {/* Text */}
        <ListItemText
          primary={book.title}
          secondary={book.author}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: { xs: "0.85rem", md: "0.9rem" },
            fontWeight: 600,
            color: "#111",
          }}
          secondaryTypographyProps={{
            noWrap: true,
            fontSize: "0.75rem",
            color: "text.secondary",
            fontStyle: "italic",
          }}
          sx={{ my: 0, flex: 1, minWidth: 0 }}
        />

        {/* Price */}
        {book.mpc && (
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#111",
              flexShrink: 0,
              display: { xs: "none", sm: "block" },
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {book.mpc} <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "#888" }}>KM</span>
          </Typography>
        )}

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", flexShrink: 0 }}>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
            sx={{
              color: "#666",
              transition: "all 0.2s",
              "&:hover": { color: "#d62d00", background: "#ffe5e0" },
            }}
          >
            <Visibility sx={{ fontSize: "1.1rem" }} />
          </IconButton>
          <SignedIn>
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); addToCart(book); }}
              sx={{
                color: "#666",
                transition: "all 0.2s",
                "&:hover": { color: "#e65100", background: "#fff3e0" },
              }}
            >
              <AddShoppingCart sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </SignedIn>
        </Box>
      </ListItem>
    </>
  );
});

// ── Main component ─────────────────────────────────────────────────────────
const SearchBarTop = ({ setDrawerData, toggleDrawer, setCart }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = useCallback(async (value) => {
    try {
      const res = await axios.get("https://backendsvkwbshp.onrender.com/api/books/search", {
        params: { q: value },
      });
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  const debouncedFetch = useDebounce(fetchSuggestions, 400);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setSuggestions([]);
      debouncedFetch.cancel?.();
      return;
    }
    debouncedFetch(value);
  }, [debouncedFetch]);

  const clearQuery = useCallback(() => {
    setQuery("");
    setSuggestions([]);
  }, []);

  const suggestionsList = useMemo(() => suggestions.map((book, i) => (
    <SuggestionItem
      key={book._id || book.isbn}
      book={book}
      index={i}
      setDrawerData={setDrawerData}
      toggleDrawer={toggleDrawer}
      navigate={navigate}
      addToCart={setCart}
    />
  )), [suggestions, setDrawerData, toggleDrawer, navigate, setCart]);

  const showDropdown = suggestions.length > 0 && (focused || query);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        px: { xs: 2, md: 4 },
        pt: { xs: "4rem", md: "5rem" },
        pb: 2,
      }}
    >
      {/* ── Optional eyebrow label for lg+ ── */}
      <Typography
        sx={{
          display: { xs: "none", lg: "block" },
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          mb: 2,
        }}
      >
        Pretraži katalog
      </Typography>

      {/* ── Search field container ── */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: "700px", lg: "860px", xl: "960px" },
          position: "relative",
        }}
      >
        <TextField
          size="medium"
          value={query}
          onChange={handleSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Pretraži knjige, autore, ISBN..."
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              background: focused
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0.88)",
              backdropFilter: "blur(12px)",
              boxShadow: focused
                ? "0 8px 32px rgba(0,0,0,0.18)"
                : "0 2px 12px rgba(0,0,0,0.10)",
              transition: "all 0.25s ease",
              "&:hover": { background: "rgba(255,255,255,0.96)" },
              "& fieldset": { border: "none" },
            },
            "& .MuiInputBase-input": {
              padding: { xs: "12px 4px", md: "14px 4px" },
              fontSize: { xs: "0.9rem", md: "0.95rem", lg: "1rem" },
              "&::placeholder": { color: "#999", opacity: 1 },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ ml: 1 }}>
                <Search sx={{ color: query ? "#111" : "#aaa", fontSize: "1.3rem", transition: "color 0.2s" }} />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end" sx={{ mr: 0.5 }}>
                <IconButton size="small" onClick={clearQuery} sx={{ color: "#999", "&:hover": { color: "#111" } }}>
                  <Close sx={{ fontSize: "1rem" }} />
                </IconButton>
              </InputAdornment>
            ) : null,
            inputProps: {
              "aria-label": "Pretraži knjige po naslovu, autoru ili ISBN-u",
              "aria-autocomplete": "list",
              "aria-controls": suggestions.length ? "search-suggestion-list" : undefined,
              "aria-expanded": suggestions.length > 0,
            },
          }}
        />

        {/* ── Dropdown ── */}
        {showDropdown && (
          <Paper
            elevation={0}
            id="search-suggestion-list"
            role="listbox"
            sx={{
              mt: 1,
              width: "100%",
              borderRadius: "14px",
              overflow: "hidden",
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 100,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
              background: "#fff",
            }}
          >
            {/* Dropdown header */}
            <Box
              sx={{
                px: 3,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                background: "#fafafa",
              }}
            >
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999" }}>
                {suggestions.length} {suggestions.length === 1 ? "rezultat" : "rezultata"}
              </Typography>
              <Chip
                label="Prikaži sve →"
                size="small"
                clickable
                onClick={() => navigate(`/pretraga?q=${encodeURIComponent(query)}`)}
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  height: 24,
                  background: "#111",
                  color: "#fff",
                  borderRadius: "6px",
                  "& .MuiChip-label": { px: 1.5 },
                  "&:hover": { background: "#333" },
                }}
              />
            </Box>

            <List sx={{ py: 0.5, maxHeight: { xs: 320, md: 420 }, overflowY: "auto" }}>
              {suggestionsList}
            </List>
          </Paper>
        )}
      </Box>

      {/* ── Hint text for lg+ ── */}
      {!query && (
        <Typography
          sx={{
            display: { xs: "none", lg: "block" },
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.3)",
            mt: 1.5,
            letterSpacing: "0.02em",
          }}
        >
          Pritisnite Enter za pretragu ili odaberite prijedlog
        </Typography>
      )}
    </Box>
  );
};

export default SearchBarTop;