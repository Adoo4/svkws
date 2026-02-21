import React, { useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";
import AdjustIcon from "@mui/icons-material/Adjust";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Language from "./LanguageSelect";
import IsNewSwitch from "./IsNewSwitch";
import DiscountSwitch from "./DiscountSwitch";
import ActiveFilters from "./ActiveFIlters";
import kategorije from "../../Utils.js/kategorije.js";

// ----------------------------
// Styles
// ----------------------------
const scrollBoxSx = {
  flex: "1 1 auto",
  overflowY: { xs: "auto", sm: "auto", md: "auto", lg: "visible" },
  pr: "0.5rem",
  pb: "10rem",
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "2px",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(255,255,255,0.3) transparent",
};

const headerSx = {
  fontWeight: 400,
  fontSize: "0.80rem",
  bgcolor: "inherit",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#f7f7f7f7",
};

const resetButtonSx = {
  display: "inline-flex",
  transition: "color 0.3s ease",
  "&:hover": { color: "#f33600", cursor: "pointer" },
};

const chipHoverBg = (color, opacity) => alpha(color, opacity);

// ----------------------------
// Memoized Subcategory Item
// ----------------------------
const SubcategoryItem = React.memo(
  ({ pod, idx, kategorija, selectedIndex, handleClick }) => {
    const sx = {
      px: 1.5,
      py: 0.5,
      gap: "0.6rem",
      borderRadius: "14px",
      fontSize: { xs: "0.65rem", sm: "0.75rem" },
      fontWeight: 500,
      color: "white",
      backgroundColor: chipHoverBg(kategorija.boja, 0.25),
      border: "1px solid transparent",
      transition: "all 0.25s ease",
      "&:hover": {
        backgroundColor: chipHoverBg(kategorija.boja, 0.25),
        borderColor: kategorija.boja,
        transform: "translateX(3px)",
      },
      "&.Mui-selected": {
        backgroundColor: chipHoverBg(kategorija.boja, 0.25),
        borderColor: kategorija.boja,
        color: "#fff",
      },
    };

    const textSx = {
      fontSize: { xs: "0.62rem", sm: "0.7rem" },
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };

    return (
      <Grid item xs={6} >
        <ListItemButton sx={sx} selected={selectedIndex === idx} onClick={handleClick}>
          <ListItemText
            primary={<Typography sx={textSx}>{pod}</Typography>}
          />
        </ListItemButton>
      </Grid>
    );
  }
);

const SelectedListItem = ({ filter, setFilter, setPage }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  // ----------------------------
  // Callbacks
  // ----------------------------
  const handleCategoryClick = useCallback(
  (kategorija) => {
    if (kategorija.naziv.toLowerCase() === "sve kategorije") {
      setFilter((prev) => ({ ...prev, mainCategory: "", subCategory: "" }));
      setSelectedIndex(null);
      setOpenCategory(null);
      setPage(1);
      return;
    }

    setFilter((prev) => ({
      ...prev,
      mainCategory: kategorija.naziv,
      subCategory: "",
    }));
    setOpenCategory((prev) =>
      prev === kategorija.naziv.toLowerCase()
        ? null
        : kategorija.naziv.toLowerCase()
    );
    setSelectedIndex(null);
    setPage(1);
  },
  [setFilter, setPage]
);

  const handleSubcategoryClick = useCallback(
    (kategorija, pod, idx) => {
      setSelectedIndex(idx);
      setFilter((prev) => ({
        ...prev,
        mainCategory: kategorija.naziv,
        subCategory: pod,
      }));
      setOpenCategory(kategorija.naziv.toLowerCase());
      setPage(1);
      window.scrollTo(0, 0);
    },
    [setFilter, setPage]
  );

  const handleIsNewToggle = useCallback(
    (checked) => {
      setFilter((prev) => ({ ...prev, isNew: checked }));
      setPage(1);
    },
    [setFilter, setPage]
  );

  const handleRemoveFilter = useCallback(
    (key) => {
      if (key === "mainCategory") {
        setFilter((prev) => ({ ...prev, mainCategory: "", subCategory: "" }));
        setSelectedIndex(null);
        setOpenCategory(null);
      } else {
        setFilter((prev) => ({
          ...prev,
          [key]: typeof prev[key] === "boolean" ? false : "",
        }));
      }
    },
    [setFilter]
  );

  // ----------------------------
  // Memoized Categories Render
  // ----------------------------
  const renderedCategories = useMemo(
    () =>
      kategorije.map((kategorija, idx) => {
        const isSveKnjige = kategorija.naziv.toLowerCase() === "sve kategorije";

        const categoryButtonSx = {
          display: "flex",
          gap: "1rem",
          minWidth: "100%",
          borderRadius: "8px",
          mb: 0.5,
          borderLeft: "4px solid transparent",
          transition: "border-left 0.3s ease, background-color 0.3s ease, transform 0.2s",
          "&:hover": {
            backgroundColor: `${kategorija.boja}15`,
            borderLeft: `6px solid ${kategorija.boja}`,
            transform: "translateX(3px)",
          },
        };

        const listItemIconSx = {
          color: kategorija.boja,
          minWidth: "auto",
          "& svg": { fontSize: { xs: "1.2rem", sm: "1.4rem" } },
        };

        const categoryTextSx = {
          fontSize: { xs: "0.7rem", sm: "0.8rem" },
          fontWeight: 100,
          color: "#f7f7f7f7",
        };

        return (
          <React.Fragment key={kategorija.naziv}>
            <ListItemButton
              onClick={() => handleCategoryClick(kategorija)}
              aria-expanded={openCategory === kategorija.naziv.toLowerCase()}
              sx={categoryButtonSx}
            >
              <ListItemIcon sx={listItemIconSx}>{kategorija.ikona}</ListItemIcon>
              <ListItemText
                primary={<Typography sx={categoryTextSx}>{kategorija.naziv}</Typography>}
              />
              {!isSveKnjige && kategorija.podkategorije?.length > 0 &&
                (openCategory === kategorija.naziv.toLowerCase() ? (
                  <PanoramaFishEyeIcon fontSize="small" sx={{ color: kategorija.boja }} />
                ) : (
                  <AdjustIcon fontSize="small" sx={{ color: "#262626" }} />
                ))}
            </ListItemButton>

            {!isSveKnjige && kategorija.podkategorije?.length > 0 && (
              <Collapse
                in={openCategory === kategorija.naziv.toLowerCase()}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <Grid container spacing={1} sx={{ pl: 2 }}>
                    {kategorija.podkategorije.map((pod, i) => {
                      const idxKey = idx * 100 + i;
                      return (
                        <SubcategoryItem
                          key={pod}
                          pod={pod}
                          idx={idxKey}
                          kategorija={kategorija}
                          selectedIndex={selectedIndex}
                          handleClick={() => handleSubcategoryClick(kategorija, pod, idxKey)}
                        />
                      );
                    })}
                  </Grid>
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      }),
    [openCategory, selectedIndex, handleCategoryClick, handleSubcategoryClick]
  );

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "380px", sm: "430px" },
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        pt: "1rem",
        pr: "0.5rem",
        background: "transparent",
       
      }}
    >
      <Box sx={scrollBoxSx}>
        <Box sx={{ mb: 2 }}>
          <ActiveFilters filters={filter} onRemove={handleRemoveFilter} kategorije={kategorije} />
        </Box>

        <Box
          sx={{
            height: { xs: "2rem", md: "2rem" },
            width: "100%",
            background: `repeating-linear-gradient(
              45deg,
              #313131,
              #313131 10px,
              transparent 10px,
              transparent 20px
            )`,
            borderRadius: "6px",
          }}
        />

        <List
          sx={{ background: "#313131" }}
          component="nav"
          subheader={
            <ListSubheader component="h1" sx={headerSx}>
              Kategorije knjiga
              <Box
                sx={resetButtonSx}
                onClick={() => {
                  setOpenCategory(null);
                  setSelectedIndex(null);
                  setFilter({
                    mainCategory: "",
                    subCategory: "",
                    language: "",
                    isNew: false,
                    discount: false,
                  });
                }}
              >
                <RestartAltIcon />
              </Box>
            </ListSubheader>
          }
        >
          {renderedCategories}
        </List>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
          <Language filter={filter} setFilter={setFilter} setPage={setPage} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
          <IsNewSwitch checked={filter.isNew} onToggle={handleIsNewToggle} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
          <DiscountSwitch
            checked={filter.discount}
            onToggle={(val) => {
              setFilter((prev) => ({ ...prev, discount: val }));
              setPage(1);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(SelectedListItem);
