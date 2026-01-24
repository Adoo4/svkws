import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  ListSubheader,
  Collapse,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AdjustIcon from "@mui/icons-material/Adjust";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Language from "./LanguageSelect";
import IsNewSwitch from "./IsNewSwitch";
import ActiveFilters from "./ActiveFIlters";
import DiscountSwitch from "./DiscountSwitch";
import { alpha } from "@mui/material/styles";
import kategorije from "../../Utils.js/kategorije.js";

export default function SelectedListItem({ filter, setFilter, page, setPage }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [openCategory, setOpenCategory] = React.useState(null); // Track which category is open
  const handleCategoryClick = React.useCallback(
    (kategorija) => {
      if (kategorija.naziv.toLowerCase() === "sve kategorije") { 
        // ✅ Do NOT reset language/isNew/discount here
        setFilter((prev) => ({
          ...prev,
          mainCategory: "",
          subCategory: "",
        }));
        setSelectedIndex(null);
        setOpenCategory(null);
        setPage(1);
        return;
      }

      // Other categories
      setFilter((prev) => ({
        ...prev,
        mainCategory: kategorija.naziv,
        subCategory: "",
      }));
      setPage(1);
      setOpenCategory((prev) =>
        prev === kategorija.naziv.toLowerCase()
          ? null
          : kategorija.naziv.toLowerCase()
      );
      setSelectedIndex(null);
    },
    [setFilter, setPage]
  );

  const handleIsNewToggle = (checked) => {
    setFilter((prev) => ({
      ...prev,
      isNew: checked,
    }));
    setPage(1);
  };

  const handleSubcategoryClick = React.useCallback(
    (kategorija, pod, idx) => {
      setSelectedIndex(idx);
      // ✅ Preserve language & isNew
      setFilter((prev) => ({
        ...prev,
        mainCategory: kategorija.naziv,
        subCategory: pod,
      }));
      setOpenCategory(kategorija.naziv.toLowerCase());
      setPage(1);
    },
    [setFilter, setPage]
  );
const chipHoverBg = (color, opacity) => alpha(color, opacity);
  const renderedCategories = React.useMemo(() => {
  return kategorije.map((kategorija, idx) => {
    const isSveKnjige =
      kategorija.naziv.toLowerCase() === "sve kategorije";

    return (
      <React.Fragment key={kategorija.naziv}>
        {/* Main category button */}
        <ListItemButton
        
          onClick={() => {
            handleCategoryClick(kategorija);
            
          }}
          aria-expanded={openCategory === kategorija.naziv.toLowerCase()}
          sx={{
            
            display: "flex",
            gap: "1rem",
            minWidth: "100%",
            borderRadius: "8px",
            mb: 0.5,
            borderLeft: "4px solid transparent",
            transition:
              "border-left 0.3s ease, background-color 0.3s ease, transform 0.2s",
            "&:hover": {
              backgroundColor: `${kategorija.boja}15`,
              borderLeft: `6px solid ${kategorija.boja}`,
              transform: "translateX(3px)",
            },
          }}
          
        >
          <ListItemIcon
            sx={{
              color: kategorija.boja,
              minWidth: "auto",
              "& svg": { fontSize: { xs: "1.2rem", sm: "1.4rem" } },
            }}
          >
            {kategorija.ikona}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  fontWeight: "100",
                  color: "#f7f7f7f7",
                }}
              >
                {kategorija.naziv}
              </Typography>
            }
          />
          {!isSveKnjige && kategorija.podkategorije?.length > 0 && (
            <>
              {openCategory === kategorija.naziv.toLowerCase() ? (
                <PanoramaFishEyeIcon
                  fontSize="small"
                  sx={{ color: kategorija.boja }}
                />
              ) : (
                <AdjustIcon
                  fontSize="small"
                  sx={{ color: "#262626" }}
                />
              )}
            </>
          )}
        </ListItemButton>

        {/* Subcategories accordion */}
        {!isSveKnjige && kategorija.podkategorije?.length > 0 && (
          <Collapse
            in={openCategory === kategorija.naziv.toLowerCase()}
            timeout="auto"
            unmountOnExit
          >
            <List component="h1" disablePadding>
              <Grid container spacing={1} sx={{ pl: 2 }}>
                {kategorija.podkategorije.map((pod, i) => (
                  <Grid item xs={6} key={pod}>
                    <ListItemButton
                      sx={{
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
                          "&:hover": {
                            backgroundColor: chipHoverBg(kategorija.boja, 0.25),
                          },
                        },
                      }}
                      selected={selectedIndex === idx * 100 + i}
                      onClick={() => {
                        handleSubcategoryClick(
                          kategorija,
                          pod,
                          idx * 100 + i
                        );
                        window.scrollTo(0, 0);
                      }}
                       aria-expanded={openCategory === kategorija.naziv.toLowerCase()}
                    >
                      
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: { xs: "0.65rem", sm: "0.7rem" },
                            }}
                          >
                            {pod}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  });
},  [
  
  selectedIndex,
  openCategory,
  handleCategoryClick,
  handleSubcategoryClick
]);


  // Add these inside SelectedListItem component (not nested in any function)
  const handleRemoveFilter = React.useCallback(
    (key) => {
      if (key === "mainCategory") {
        setFilter((prev) => ({
          ...prev,
          mainCategory: "",
          subCategory: "",
        }));
        setSelectedIndex(null);
        setOpenCategory(null); // collapse category menu
      } else {
        setFilter((prev) => ({
          ...prev,
          [key]: typeof prev[key] === "boolean" ? false : "",
        }));
      }
    },
    [setFilter]
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "380px", sm: "430px" },
        display: "flex",
        flexDirection: "column",
        height: "100vh", // full viewport height
        pt: "1rem",
        pr: "0.5rem",
        background: "transparent",
      }}
    >
      {/* Scrollable content on small/medium, static on large */}
      <Box
  sx={{
    flex: "1 1 auto",
    overflowY: { xs: "auto", sm: "auto", md: "auto", lg: "visible" },
    pr: "0.5rem",
    pb: "10rem",
    "&::-webkit-scrollbar": { width: "4px" },
    "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.3)", borderRadius: "2px" },
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.3) transparent",
  }}
>
        {/*Filters athat are applied*/}
        {/* Active Filters Bar */}
        <Box sx={{ mb: 2 }}>
          <ActiveFilters
            filters={filter}
            onRemove={handleRemoveFilter}
            kategorije={kategorije}
          />
        </Box>

        {/* Decorative header bar */}
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
            <ListSubheader
              component="h1"
              sx={{
                fontWeight: "400",
                fontSize: "0.80rem",
                bgcolor: "inherit",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#f7f7f7f7",
              }}
            >
              Kategorije knjiga
              <Box
                sx={{
                  display: "inline-flex",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#f33600", cursor: "pointer" },
                }}
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
}
