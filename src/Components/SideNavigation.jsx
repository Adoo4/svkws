import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

export default function LeftDrawerOnly() {
  const [open, setOpen] = React.useState(false);
  const [show, setshow] = React.useState(true)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const list = (
    <Box
      sx={{ width: 250, mt:"5rem" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
     <List>
  {[
    { text: 'Sve za Vas', icon: <StorefrontIcon /> },
    { text: 'Za Kancelariju', icon: <WorkIcon /> },
    { text: 'Za Školu', icon: <SchoolIcon /> },
  ].map(({ text, icon }) => (
    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={[
          { minHeight: 48, px: 2.5 },
          open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
        ]}
      >
        <ListItemIcon
          sx={[
            { minWidth: 0, justifyContent: 'center' },
            open ? { mr: 3 } : { mr: 'auto' },
          ]}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={[open ? { opacity: 1 } : { opacity: 0 }]}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

    </Box>
  );

  return (
    
    <div style={{ marginTop: '5rem', position: 'relative' }}>
  {show && (
    <Box
      sx={{
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        height: "50px",
        width: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "5px",
        top: "1lvh",
        zIndex: 99,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
      }}
    >
      <Button
        onClick={toggleDrawer(true)} // ⚠️ Make sure toggleDrawer returns a function
        sx={{
          color: "white",
          minWidth: 0,
          padding: 0,
        }}
      >
        <MenuIcon />
      </Button>
    </Box>
  )}

  <Drawer sx={{}} anchor="left" open={open} onClose={toggleDrawer(false)}>
    {list}
  </Drawer>
</div>
  );
}
