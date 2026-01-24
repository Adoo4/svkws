import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

// Static menu items
const menuItems = [
  { text: "Sve za Vas", icon: <StorefrontIcon /> },
  { text: "Za Kancelariju", icon: <WorkIcon /> },
  { text: "Za Školu", icon: <SchoolIcon /> },
];

// Styles
const drawerWidth = 250;
const buttonStyle = {
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  height: 50,
  width: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: 5,
  top: "1vh",
  zIndex: 99,
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  cursor: "pointer",
};

export default function LeftDrawerOnly() {
  const [open, setOpen] = React.useState(false);

  // Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ marginTop: "6rem", position: "relative" }}>
      {/* Hamburger Button */}
      <Box sx={buttonStyle}>
        <Button onClick={handleOpen} sx={{ color: "white", minWidth: 0, padding: 0 }}>
          <MenuIcon />
        </Button>
      </Box>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <Box sx={{ width: drawerWidth, mt: "5rem" }} role="presentation">
          <List>
            {menuItems.map(({ text, icon }) => (
              <ListItemButton
                key={text}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
                onClick={handleClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
