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

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Grid } from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ArticleIcon from "@mui/icons-material/Article";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import InterestsIcon from "@mui/icons-material/Interests";
import AdjustIcon from "@mui/icons-material/Adjust";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import BiotechIcon from "@mui/icons-material/Biotech";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DrawIcon from "@mui/icons-material/Draw";
import  Language  from "./LanguageSelect";


const kategorije = [
  {
    naziv: "Sve Knjige",
    ikona: <ImportContactsIcon />,
    boja: "#2a9d8f",
  },
  {
    naziv: "Beletristika",
    ikona: <DrawIcon />,
    boja: "#9c5fe0",
    podkategorije: [
      "Roman",
      "Ljubavni roman",
      "Istorijski roman",
      "Psihološki roman",
      "Triler / Krimi",
      "Naučna fantastika (Sci-Fi)",
      "Fantastika / Fantasy",
      "Domaći roman",
      "Strani roman",
      "Pripovijetke i novele",
      "Drama",
      "Poezija",
      "Klasici",
      "Humoristička književnost",
    ],
  },
  {
    naziv: "Literatura za djecu i mlade",
    ikona: <ChildCareIcon />,
    boja: "#16a3d8",
    podkategorije: [
      "Bajke i basne",
      "Ilustrirane knjige",
      "Knjige za prve čitače",
      "Teen romani / Young Adult",
      "Edukativne knjige za djecu",
      "Stripovi i slikovnice",
    ],
  },
  {
    naziv: "Naučna i stručna literatura",
    ikona: <BiotechIcon />,
    boja: "#60dce8",
    podkategorije: [
      "Pravo",
      "Ekonomija i biznis",
      "Psihologija",
      "Medicina",
      "Tehnika i IT",
      "Prirodne nauke",
      "Društvene nauke",
      "Obrazovanje i pedagogija",
    ],
  },
  {
    naziv: "Publicistika",
    ikona: <ArticleIcon />,
    boja: "#8ad346",
    podkategorije: [
      "Biografije i autobiografije",
      "Eseji",
      "Putopisi",
      "Istorija",
      "Filozofija",
      "Religija i duhovnost",
      "Politika i društvo",
    ],
  },
  {
    naziv: "Samopomoć i razvoj",
    ikona: <SelfImprovementIcon />,
    boja: "#ffb703",
    podkategorije: [
      "Lični razvoj",
      "Motivacija i uspjeh",
      "Zdravlje i wellness",
      "Mindfulness i meditacija",
      "Ljubavni i partnerski odnosi",
      "Roditeljstvo i porodica",
    ],
  },
  {
    naziv: "Kuharice i gastronomija",
    ikona: <RestaurantMenuIcon />,
    boja: "#fb8500",
    podkategorije: [
      "Nacionalna kuhinja",
      "Zdrava ishrana",
      "Vegetarijanska / veganska kuhinja",
      "Slatkiši i peciva",
    ],
  },
  {
    naziv: "Hobiji i slobodno vrijeme",
    ikona: <InterestsIcon />,
    boja: "#d64e12",
    podkategorije: [
      "Uradi sam (DIY)",
      "Umjetnost i dizajn",
      "Moda i stil",
      "Baštovanstvo",
      "Sport i fitness",
      "Putovanja i vodiči",
    ],
  },
];

export default function SelectedListItem({
  desktop,
  setFilter,
  filter,
  filterFunction,
  setBooks,
  booksCopy,
  books,
  allBooks
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(() => {
    // calculate initial selectedIndex based on filter.bookCategory and filter.bookSubCategory
    if (!filter.bookCategory) return null;

    const catIdx = kategorije.findIndex(
      (k) => k.naziv.toLowerCase() === filter.bookCategory.toLowerCase()
    );
    if (catIdx === -1) return null;

    if (filter.bookSubCategory && kategorije[catIdx].podkategorije) {
      const subIdx = kategorije[catIdx].podkategorije.findIndex(
        (sub) => sub.toLowerCase() === filter.bookSubCategory.toLowerCase()
      );
      if (subIdx !== -1) return catIdx * 100 + subIdx;
    }

    return null;
  });

  const [openMap, setOpenMap] = React.useState(() => {
    const map = {};
    kategorije.forEach((k) => {
      map[k.naziv] =
        filter.bookCategory &&
        k.naziv.toLowerCase() === filter.bookCategory.toLowerCase();
    });
    return map;
  });

  // Safe filtering helper
  const filterBooks = ({ category, subcategory }) => {
    if (!Array.isArray(booksCopy)) {
      setBooks([]); // no data yet
      return;
    }

    const cat = category?.toString().trim();
    const sub = subcategory?.toString().trim();

    // reset when category empty or "Sve Knjige"
    if (!cat || cat.toLowerCase() === "sve knjige".toLowerCase()) {
      if (!sub) {
        setBooks(booksCopy);
        return;
      }
      // if only subcategory provided (rare), filter across all books
      const resBySub = booksCopy.filter(
        (b) => b.subCategory?.toString().toLowerCase() === sub.toLowerCase()
      );
      setBooks(resBySub);
      return;
    }

    // filter by category first
    let updated = booksCopy.filter(
      (b) => b.mainCategory?.toString().toLowerCase() === cat.toLowerCase()
    );

    // then by subcategory if provided
    if (sub) {
      updated = updated.filter(
        (b) => b.subCategory?.toString().toLowerCase() === sub.toLowerCase()
      );
    }

    setBooks(updated);
  };

const handleCategoryClick = (kategorija) => {
  if (!allBooks || !Array.isArray(allBooks)) return; // <-- guard

  const selectedCategory = kategorija.naziv;

  const newFilter = {
    ...filter,
    bookCategory: selectedCategory === "Sve Knjige" ? "" : selectedCategory,
    bookSubCategory: "",
  };

  const filteredBooks = allBooks.filter((b) => {
    if (newFilter.bookCategory && newFilter.bookCategory.toLowerCase() !== "sve knjige") {
      if (b.mainCategory?.toLowerCase() !== newFilter.bookCategory.toLowerCase()) return false;
    }
    if (newFilter.bookSubCategory) {
      if (b.subCategory?.toLowerCase() !== newFilter.bookSubCategory.toLowerCase()) return false;
    }
    if (newFilter.bookLanguage) {
      if (b.language?.toLowerCase() !== newFilter.bookLanguage.toLowerCase()) return false;
    }
    return true;
  });

  setBooks(filteredBooks);
  setFilter(newFilter);

  setSelectedIndex(null);
  toggleOpen(kategorija.naziv);
};


  // SUBCATEGORY button handler (inside the Collapse grid)
  const handleSubcategoryClick = (kategorija, pod, index) => {
    setSelectedIndex(index);

    setFilter((prev) => ({
      ...prev,
      bookCategory: kategorija.naziv,
      bookSubCategory: pod,
    }));

    filterBooks({ category: kategorija.naziv, subcategory: pod });

    // ensure category stays open
    setOpenMap((prev) => ({
      ...prev,
      [kategorija.naziv]: true,
    }));
  };

  const toggleOpen = (categoryName) => {
    setOpenMap((prev) => {
      const isOpen = !!prev[categoryName];
      // close all
      const newMap = {};
      kategorije.forEach((k) => {
        newMap[k.naziv] = false;
      });
      // open clicked if it wasn't open
      if (!isOpen) newMap[categoryName] = true;
      return newMap;
    });
  };

  return (
   <Box
  sx={{
    width: "100%",
    maxWidth: { xs: "300px", sm: "400px" },
    height: "100%",
    background: "transparent",
    overflowY: "auto",
    pr: "0.5rem",
    mt: "1rem",
    
   
  }}
>
  {/* Decorative header bar */}
  <Box
  
    sx={{
      height: { xs: "2rem", md: "3rem" },
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

  {/* Categories */}
  <List
  sx={{background:"#313131"}}
    component="nav"
    subheader={
      <ListSubheader
        component="div"
        sx={{
          fontWeight: "bold",
          fontSize: "0.95rem",
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
    "&:hover": {
      color: "#f33600",
      cursor: "pointer",
    },
  }}
  onClick={() => {
    // Reset books
    setBooks(booksCopy);

    // Close all categories
    const closedMap = {};
    kategorije.forEach((k) => {
      closedMap[k.naziv] = false;
    });
    setOpenMap(closedMap);

    // Reset selected category/subcategory
    setSelectedIndex(null);

    // Reset filters including language
    setFilter((prev) => ({
      ...prev,
      bookCategory: "",
      bookSubCategory: "",
      bookLanguage: "",  // <-- reset language here
      newBook: false,
      bookDiscount: false,
    }));
  }}
>
  <RestartAltIcon />
</Box>

      </ListSubheader>
    }
  >
    {kategorije.map((kategorija, idx) => {
      const isSveKnjige = kategorija.naziv === "SVE KNJIGE";

      return (
        <React.Fragment key={kategorija.naziv}>
          {/* Main category */}
          <ListItemButton
            onClick={() => !isSveKnjige && handleCategoryClick(kategorija)}
            sx={{
              display: "flex",
              gap: "1rem",
              flexShrink: 0,
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
                "& .MuiListItemIcon-root": {
                  color: kategorija.boja,
                },
              },
            }}
          >
            {/* Icon */}
            <ListItemIcon
              sx={{
                borderRadius: "50%",
                p: { xs: "0.2rem", md: "0.5rem" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "auto",
                mr: 0,
                color: kategorija.boja,

                "& svg": {
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                },
              }}
            >
              {kategorija.ikona}
            </ListItemIcon>

            {/* Category name */}
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    color: "#f7f7f7f7",
                  }}
                >
                  {kategorija.naziv}
                </Typography>
              }
            />

            {/* Collapse icon (only if not "SVE KNJIGE") */}
            {!isSveKnjige &&
              Array.isArray(kategorija.podkategorije) &&
              kategorija.podkategorije.length > 0 &&
              (openMap[kategorija.naziv] ? (
                <PanoramaFishEyeIcon fontSize="small" sx={{ color: kategorija.boja }} />
              ) : (
                <AdjustIcon fontSize="small" sx={{ color: "#262626" }} />
              ))}
          </ListItemButton>

          {/* Subcategories (skip collapse for "SVE KNJIGE") */}
          {!isSveKnjige && (
            <Collapse in={openMap[kategorija.naziv]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Grid container sx={{ borderLeft: `4px solid ${kategorija.boja}` }}>
                  {(kategorija.podkategorije || []).map((pod, i) => (
                    <Grid
                      item
                      xs={6}
                      key={pod}
                      sx={{
                        display: "flex",
                        justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          width: "fit-content",
                          borderRadius: "6px",
                          color:"#f7f7f7",
                          "&:hover": {
                            backgroundColor: `${kategorija.boja}22`,
                          },
                        }}
                        selected={selectedIndex === idx * 100 + i}
                        onClick={() =>
                          handleSubcategoryClick(kategorija, pod, idx * 100 + i)
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                                pl: "0.3rem",
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
    })}
  </List>

  <Divider sx={{ my: 1 }} />
  <Box sx={{ display: "flex", justifyContent: "flext-start", width: "100%", marginBottom: "2rem" }}>
  <Language
  filter={filter}
  setFilter={setFilter}
/>
</Box>
</Box>

  );
}
