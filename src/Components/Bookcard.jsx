import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "@clerk/clerk-react";
import  { useState, useEffect } from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ArticleIcon from "@mui/icons-material/Article";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import InterestsIcon from "@mui/icons-material/Interests";
import BiotechIcon from '@mui/icons-material/Biotech';
import DrawIcon from '@mui/icons-material/Draw';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { SignedIn } from '@clerk/clerk-react';
import {
  isInWishlist,
} from "../Utils.js/wishlist"; // adjust path

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
    ikona: <SelfImprovementIcon   />,
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


const BookCard = ({ book, setDrawerData, toggleDrawer,  setCart,  setWishlist }) => {
  const { isSignedIn } = useUser();
  const theme = useTheme();
  const isNew = book.isNew;
  const hasDiscount = book.discount?.amount > 0;
  const navigate = useNavigate();


   // state to control heart icon
  const [inWishlist, setInWishlist] = useState(false);

  // sync with localStorage on mount
  useEffect(() => {
    setInWishlist(isInWishlist(book));
  }, [book]);

  // handle heart click
 const handleWishlistClick = (e) => {
  e.stopPropagation();

  setWishlist((prev) => {
    const alreadyInWishlist = prev.some((item) => item._id === book._id);

    let updated;
    if (alreadyInWishlist) {
      // remove book
      updated = prev.filter((item) => item._id !== book._id);
    } else {
      // add book
      updated = [...prev, book];
    }

    // persist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(updated));

    return updated;
  });

  setInWishlist((prev) => !prev); // just for icon toggle
};


  const finalPrice = hasDiscount
    ? (book.price * (1 - book.discount.amount / 100)).toFixed(2)
    : book.price.toFixed(2);


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

// Then when rendering cart, compute price:
const formatCategoryName = (name) => {
  if (!name) return "";
  const lower = name.toLowerCase();
  if (lower === "ekonomija i biznis") return "Ekonomija";
  if (lower === "naučna i stručna literatura") return "Stručna literatura";
  if (lower === "literatura za djecu i mlade") return "Literatura za mlade";
  return name;
};


  const mainCategory = kategorije.find(
    (k) => k.naziv.toLowerCase() === book.mainCategory?.toLowerCase()
  );


  return (
   <Card
  elevation={0}
  sx={{
     minWidth: { xs: "170px", sm: "290px" }, // increase sm
    maxWidth: { xs: "30vw", sm: "320px", md: "270px" }, // allow more space
    flexGrow: { xs: 1, sm: 1 }, // lets it stretch if space is available
    borderRadius: 4,
    cursor: "pointer", // 👈 makes it a hand icon
    "&:hover": {
      boxShadow: 8, // optional shadow effect on hover
    },
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    border: "1px solid transparent",
    boxShadow: 2,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    [theme.breakpoints.up("sm")]: {
      "&:hover": {
        
        boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
        border: "1px solid transparent",
      },
    },
    position: "relative",
  }}
>
  {/* Badge */}
  {(isNew || hasDiscount) && (
    <Chip
      label={isNew ? "Novo" : `-${book.discount.amount}%`}
      color={isNew ? "success" : "error"}
      size="small"
      sx={{
        position: "absolute",
        top: 8,
        left: 8,
        zIndex: 5,
        fontWeight: "bold",
        fontSize: { xs: "0.6rem", sm: "0.65rem", md:"0.75rem" }, // ⬅️ smaller on xs
      }}
    />
  )}

    {/* Wishlist Icon */}
<SignedIn>
  <IconButton
    onClick={handleWishlistClick}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 5,
      bgcolor: "rgba(255,255,255,0.9)",
      "&:hover": { bgcolor: "rgba(255,255,255,1)" },
      p: 0.5,
    }}
  >
    {inWishlist ? (
      <BookmarkIcon sx={{ color: "#262626", fontSize: "1.5rem" }} />
    ) : (
      <BookmarkBorderIcon sx={{ color: "#262626", fontSize: "1.5rem" }} />
    )}
  </IconButton>
</SignedIn>

  {/* Image */}
   <Box sx={{ position: "relative" }}   >
    <CardMedia
      component="img"
      image={book?.coverImage}
      alt={book.title}
      loading="eager"
      sx={{
        height: { xs: 190, sm: 200, md: 250 },
        objectFit: "contain",
        width: "100%",
        aspectRatio: "3 / 4",
      }}
    
    />

    {/* Hover Overlay with Magnifier */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.3s ease",
        "&:hover": {
          opacity: 1,
        },
        
      }}
      onClick={(e)=>{setDrawerData(book)
      toggleDrawer(true)(e)}}
      
    >
      <SearchOutlinedIcon
        sx={{
          fontSize: "4rem",
          color: "white",
        }}
        
      />
    </Box>
  </Box>

  <Box sx={{ px: { xs: 1, sm: 1 }, py: 2, flexGrow: 1 }}>
    <CardContent sx={{ p: 0, minHeight: { xs: "5rem", sm: "7rem" } }}>
      {/* Title */}
    <Typography
  variant="subtitle2"
  sx={{
    gap: "0.5rem",
    display: "flex",
    fontWeight: 600,
    color: "#333",
    mb: 0.5,
    lineHeight: 1.2,
    fontSize: { xs: "0.75rem", sm:"0.88", md: "0.95rem", },
      // ⬅️ force single line
    overflow: "hidden",     // ⬅️ hide overflow
    textOverflow: "ellipsis" // ⬅️ show "..." if too long
  }}
>
        {book?.title?.toUpperCase()}
      </Typography>

      {/* Categories */}
     {/* Categories */}
<Box
  sx={{
    display: "flex",
    gap: 0.5,
    mb: 1,
    flexWrap: "nowrap",
    overflow: "hidden",
  }}
>
  {/* XS compact version */}
  {/* Compact XS/SM version with icon instead of text */}
<Box
  sx={{
    display: { xs: "flex", md: "none" },
    alignItems: "center",
    width:"100%",
    gap: 0.5,
    px: 0.8,
    py: 0.3,
    borderRadius: 20,
    color: (() => {
      const kat = kategorije.find(
        (k) =>
          k.naziv === book.mainCategory ||
          k.podkategorije?.includes(book.subCategory)
      );
      return kat?.boja || "#313131";
    })(),
    
    fontSize: "0.55rem",
    fontWeight: 500,
  }}
>
  {/* Icon */}
  {(() => {
    const kat = kategorije.find(
      (k) =>
        k.naziv === book.mainCategory ||
        k.podkategorije?.includes(book.subCategory)
    );
    return kat?.ikona || <ImportContactsIcon  />;
  })()}

  {/* Optional: keep text on very small screens */}
  <Typography
    component="span"
    sx={{
      ml: 0.3,
      color:"#313131",
      fontSize: "0.55rem",
      fontWeight: 500,
      display: { xs: "flex", sm: "inline" }, // text hidden on xs, shown on sm
    }}
  >
    {book.subCategory}
  </Typography>
</Box>


  {/* SM+ full chips */}
  <>
     {/* Main Category */}
      {mainCategory && (
  <Box
    sx={{
      display: { xs: "none", md: "inline-flex" },
      alignItems: "center",
      justifyContent: "center",
      gap:"0.2rem",
     
      color: "white",
 
    }}
  >
    {/* Ikona u boji */}
    <Box sx={{ color: mainCategory.boja, display: "flex", alignItems: "center" }}>
      {mainCategory.ikona}
    </Box>
<Box sx={{display:"flex"}}>
    {/* Main Category ime */}
    <Typography
      component="span"
      sx={{
        fontWeight: 500,
        fontSize: "0.6rem",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#313131"
      }}
    >
      {formatCategoryName(book.mainCategory)}
    </Typography>

    {/* Slash separator */}
    {book.subCategory && (
      <Typography
        component="span"
        sx={{
          mx: 0.5,
          fontWeight: 400,
          fontSize: "0.6rem",
          opacity: 0.6,
          color: "#313131"
        }}
      >
        /
      </Typography>
    )}

    {/* Sub Category ime */}
    {book.subCategory && (
      <Typography
        component="span"
        sx={{
          fontWeight: 400,
          fontSize: "0.6rem",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#313131"
        }}
      >
        {book.subCategory}
      </Typography>
      
    )}
    </Box>
  </Box>
)}
  </>
</Box>


      {/* Description */}
      <Typography
          sx={{
    color: "text.secondary",
    fontSize: { xs: "0.60rem", md: "0.8rem" },
    fontStyle: "italic",
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2, // always max 2 lines
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
      >
        {book.description}
      </Typography>

      {/* Price */}
      <Box sx={{ mt: 1 }}>
        {hasDiscount ? (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#f33600",
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
            >
              {finalPrice} KM
            </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#999",
                fontSize: { xs: "0.65rem", sm: "0.8rem" },
              }}
            >
              {book.price.toFixed(2)} KM
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#222",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            {book.price?.toFixed(2)} KM
          </Typography>
        )}
      </Box>
    </CardContent>

    {/* Actions */}
 <CardActions
  sx={{
    p: 0,
    mt: 2,
    display: "flex",
    flexDirection: { xs: "column", sm:"column", md:"row" },
    alignItems: "stretch",
    justifyContent: "center",
    gap: { xs: 0.5, sm: 1 },
    "& > :not(:first-of-type)": {
      ml: { xs: 0, sm: 0, md: 1, lg: 2 }, // responsive margin
    },
  }}
>
  <Button
  variant="outlined"
  size="small"
  onClick={(e) => {
  
    navigate(`/${book._id}`, {
      state: {
        book,                     // full book object
        category: book.subCategory, // mainCategory for related books
      },
    });
    console.log(book);
  }}
  fullWidth
  startIcon={
    <InfoOutlinedIcon
      sx={{
        fontSize: { xs: "0.9rem", sm: "1.2rem" },
      }}
    />
  }
  sx={{
    width: "100%",
    flex: { xs: "1 1 100%", sm: "1 1 50%" },
    px: { xs: 1, sm: 1.5 },
    borderRadius: "12px",
    textTransform: "none",
    borderColor: "#313131",
    color: "#313131",
    fontSize: { xs: "0.60rem", sm: "0.7rem" },
    "&:hover": {
      borderColor: "#f33600",
      color: "#f33600",
    },
  }}
>
  Detalji
</Button>


  {isSignedIn && (
    <Button
  variant="contained"
  size="small"
  onClick={() => addToCart(book)}
  fullWidth
  startIcon={
    <ShoppingCartIcon
      sx={{
        fontSize: { xs: "0.9rem", sm: "1.2rem" },
      }}
    />
  }
  sx={{
    width: "100%",
    flex: { xs: "1 1 100%", sm: "1 1 50%" },
    px: { xs: 1, sm: 1.5 },
    fontSize: { xs: "0.60rem", sm: "0.7rem" },
    borderRadius: "12px",
    textTransform: "none",
    bgcolor: "#313131",
    "&:hover": { bgcolor: "#d62d00" },
  }}
>
  Dodaj
</Button>
  )}
</CardActions>

  </Box>
</Card>

  );
};

export default BookCard;
