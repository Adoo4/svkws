import  { useState } from "react";
import { Drawer, Toolbar, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react"; // make sure you installed this

export default function FullScreenMenu() {
  const [isOpen, setOpen] = useState(false);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => setOpen(state);
const [hover, setHover] = useState(false);
  return (
   <>
  {/* Top Navigation Bar (mobile only) */}
 <Toolbar sx={{ display: { xs: "flex", md: "none" } }}>
  <Box
    sx={{ cursor: "pointer" }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    <Hamburger
      toggled={isOpen}
      toggle={setOpen}
      size={24}
      color={hover ? "#d62d00" : "#f9f9f9"}
    />
  </Box>
</Toolbar>

  {/* Fullscreen Drawer Menu */}
  <Drawer
    anchor="left"
    open={isOpen}
    onClose={toggleDrawer(false)}
    PaperProps={{
      sx: {
        marginTop: "3rem",
        width: "100vw",
        height: "100vh",
        bgcolor: "#262626",
        color: "#f9f9f9",
        zIndex: "999999",
      },
    }}
  >
    {/* Header with Close button + Clerk/User */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "#313131",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.4)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SignedIn>
          <UserButton />
          <Typography variant="h6" sx={{ color: "#f9f9f9" }}>
            Dobrodošli
          </Typography>
        </SignedIn>
        <SignedOut>
          <AccountCircleIcon sx={{ fontSize: 30, color: "#f9f9f9" }} />
          <Typography variant="h6" sx={{ color: "#f9f9f9" }}>
            Dobrodošli
          </Typography>
        </SignedOut>
      </Box>
      <Box sx={{ color: "#f9f9f9", fontSize: "1rem" }}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={16} color="#f9f9f9" />
      </Box>
    </Box>

    {/* Menu Items */}
    <List sx={{ mt: 2 }}>
      <ListItem
        button
        onClick={() => {
          navigate("/home");
          setOpen(false);
        }}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          mx: 1,
          "&:hover": { bgcolor: "#d62d00", color: "#f9f9f9" },
        }}
      >
        <ListItemIcon sx={{ color: "#f9f9f9" }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Početna" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          navigate("/shop");
          setOpen(false);
        }}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          mx: 1,
          "&:hover": { bgcolor: "#d62d00", color: "#f9f9f9" },
        }}
      >
        <ListItemIcon sx={{ color: "#f9f9f9" }}>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Bookstore" />
      </ListItem>

      {/* Clerk Login / Logout */}
      <SignedOut>
        <SignInButton mode="modal">
          <ListItem
            button
            sx={{
              cursor: "pointer",
              bgcolor: "#313131",
              borderRadius: 2,
              mx: 1,
              mt: 1,
              "&:hover": { bgcolor: "#d62d00", color: "#f9f9f9" },
            }}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon sx={{ color: "#f9f9f9" }}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Prijava" />
          </ListItem>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <ListItem
          button
          sx={{
            cursor: "pointer",
            bgcolor: "#313131",
            borderRadius: 2,
            mx: 1,
            mt: 1,
            "&:hover": { bgcolor: "#d62d00", color: "#f9f9f9" },
          }}
          onClick={() => {
            signOut();
            setOpen(false);
          }}
        >
          <ListItemIcon sx={{ color: "#f9f9f9" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Odjava" />
        </ListItem>
      </SignedIn>
    </List>

    <Divider sx={{ bgcolor: "#313131", my: 2 }} />
  </Drawer>
</>

  );
}
