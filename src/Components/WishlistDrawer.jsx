import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Drawer,
  Button,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Utils.js/useWishlist";
export default function WishlistDrawer({
  open,
  onClose,
  addToCart,
  cart
}) {
  const { wishlist, isLoading, removeFromWishlist, clearWishlist } = useWishlist();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

    if (isLoading) {
    return <div style={{ padding: "1rem", color: "#fff" }}>Loading...</div>;
  }

  const list = () => (

    
    <Box
      sx={{
        width: { xs: 300, sm: 400, md: 450 },
        p: 1,
        background: "#1f1f1f",
        height: "100%",
        overflowY: "auto",
        color: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Moja lista želja ({wishlist.length})
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#f9f9f9" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "#444" }} />

      {wishlist.length === 0 ? (
        <Typography sx={{ p: 2, textAlign: "center", color: "#aaa" }}>
          Lista želja je prazna.
        </Typography>
      ) : (
        <List sx={{ mt: 1 }}>
          {wishlist.map((book) => (
            <ListItem
              key={book._id}
              alignItems="flex-start"
              disablePadding
              sx={{
                mb: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                "&:hover": { backgroundColor: "#333" },
                mr: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={book.coverImage}
                  alt={book.title}
                  onClick={(e) => {
                    navigate(`/${book?._id}`, {
                      state: { book, category: book.subCategory },
                    });
                  }}
                  sx={{
                    width: { xs: 80, sm: 100, md: 130 },
                    height: { xs: 100, sm: 130, md: 150 },
                    borderRadius: 2,
                    "& img": {
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    },
                  }}
                />
              </ListItemAvatar>

              <ListItemText
                sx={{ ml: 2, mr: 1 }}
                primary={
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {book.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="#bbb" noWrap>
                    {book.author || ""}
                  </Typography>
                }
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: 1,
                  gap: "1rem",
                }}
              >
                <Tooltip title="Izbriši iz liste" arrow>
                  <IconButton
                    size="small"
                      onClick={() => {
                      removeFromWishlist(book._id);
                      enqueueSnackbar("Knjiga je uklonjena iz liste želja", {
                        variant: "info",
                      });
                    }}
                    sx={{
                      color: "#f44336",
                      bgcolor: "#2b2b2b",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "#d32f2f",
                      },
                      borderRadius: 10,
                      
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                {/* Add to cart */}
                <Tooltip title="Prebaci ovu knjigu u korpu" arrow>
                  <IconButton
                    size="small"
                     onClick={() => {
                      addToCart(book);
                      enqueueSnackbar("Knjiga je dodana u korpu", {
                        variant: "success",
                      });
                    }}
                    sx={{
                      color: "#fff",
                      bgcolor: "#313131",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "#388e3c",
                      },
                      borderRadius: 10,
                      
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {wishlist.length > 0 && (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Tooltip title="Obriši sve artikle iz liste želja" arrow>
            <Button
              onClick={() => {
                clearWishlist();
                enqueueSnackbar("lista želja ispražnjena", { variant: "info" });
              }}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                borderColor: "#fff",
                color: "#fff",
                py: 1.2,
                fontWeight: 400,
                "&:hover": { borderColor: "#d62d00", color: "#d62d00" },
              }}
            >
              Isprazni Listu
            </Button>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1f1f1f",
          color: "#f9f9f9",
          width: { xs: 300, sm: 400, md: 450 },
        },
      }}
    >
      {list()}
    </Drawer>
  );
}
