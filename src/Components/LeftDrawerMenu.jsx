// components/LeftDrawerMenu.js
import React from 'react';
import {
  SwipeableDrawer,
  Box,
} from '@mui/material';

import Menu from "../Components/Menu/Menu"

const LeftDrawerMenu = ({ open, setOpen,  setFilter,
            filter, // <-- This must be defined!
            setBooks,
            booksCopy }) => {
  const handleClose = () => setOpen(false);

  

  return (
 <SwipeableDrawer
  PaperProps={{
    sx: {
      backgroundColor: "#262626", // whole drawer background
      width: { xs: 270, md: 400 }, // adjust drawer width here if you want
      
    }
  }}
  anchor="left"
  open={open}
  onClose={handleClose}
  onOpen={() => setOpen(true)}
 
>
  <Box
    sx={{
      width: {
        xs: 270,
        md: 400,
       
      },
       background:"#262626"
    }}
    role="presentation"
  >
    <Menu
      handleClose={handleClose}
      setFilter={setFilter}
      filter={filter}
      setBooks={setBooks}
      booksCopy={booksCopy}
    />
  </Box>
</SwipeableDrawer>
  );
};

export default LeftDrawerMenu