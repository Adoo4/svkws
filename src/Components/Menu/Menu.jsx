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
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
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
import Language from "./LanguageSelect";
import IsNewSwitch from "./IsNewSwitch";
import ActiveFilters from "./ActiveFIlters";
import DiscountSwitch from "./DiscountSwitch";


const kategorije = [
  {
    naziv: "Sve Kategorije",
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
      "Mitologija",
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

export default function SelectedListItem({ filter, setFilter, page, setPage }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [openCategory, setOpenCategory] = React.useState(null); // Track which category is open
  const handleCategoryClick = (kategorija) => {
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
    setOpenCategory((prev) => prev === kategorija.naziv.toLowerCase() ? null : kategorija.naziv.toLowerCase());
    setSelectedIndex(null);
  };

  const handleIsNewToggle = (checked) => {
    setFilter((prev) => ({
      ...prev,
      isNew: checked,
    }));
    setPage(1);
  };

  const handleSubcategoryClick = (kategorija, pod, idx) => {
    setSelectedIndex(idx);
    // ✅ Preserve language & isNew
    setFilter((prev) => ({
      ...prev,
      mainCategory: kategorija.naziv,
      subCategory: pod,
    }));
    setOpenCategory(kategorija.naziv.toLowerCase());
    setPage(1);
  };


// Add these inside SelectedListItem component (not nested in any function)
const handleRemoveFilter = (key) => {
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
        marginBottom:"10rem"
      }}
    >
      {/*Filters athat are applied*/ }
{/* Active Filters Bar */}
<ActiveFilters filters={filter} onRemove={handleRemoveFilter} kategorije={kategorije} />



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

      <List
        sx={{ background: "#313131" }}
        component="nav"
        subheader={
          <ListSubheader
            component="div"
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
        {kategorije.map((kategorija, idx) => {
          const isSveKnjige = kategorija.naziv.toLowerCase() === "sve kategorije";

          return (
            <React.Fragment key={kategorija.naziv}>
              {/* Main category button */}
              <ListItemButton
                onClick={() => handleCategoryClick(kategorija)}
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
                     variant="caption"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
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
                      <AdjustIcon fontSize="small" sx={{ color: "#262626" }} />
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
                  <List component="div" disablePadding>
                    <Grid container spacing={0} sx={{ pl: 2 }}>
                      {kategorija.podkategorije.map((pod, i) => (
                        <Grid item xs={6} key={pod}>
                          <ListItemButton
                            sx={{
                              borderRadius: "6px",
                              color: "#f7f7f7",
                              "&:hover": {
                                backgroundColor: `${kategorija.boja}22`,
                              },
                            }}
                            selected={selectedIndex === idx * 100 + i}
                            onClick={() =>
                              handleSubcategoryClick(
                                kategorija,
                                pod,
                                idx * 100 + i
                              )
                            }
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
        })}
      </List>

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
        <Language filter={filter} setFilter={setFilter} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
        <IsNewSwitch checked={filter.isNew} onToggle={handleIsNewToggle} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
  <DiscountSwitch checked={filter.discount} onToggle={(val) => {
    setFilter((prev) => ({ ...prev, discount: val }));
    setPage(1);
  }} />
</Box>
    </Box>
  );
}
