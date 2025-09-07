import React from 'react';
import { SwipeableDrawer, Box } from '@mui/material';
import Menu from "../Components/Menu/Menu";

const LeftDrawerMenu = ({ open, setOpen, setFilter, filter, allBooks }) => {
  const handleClose = () => setOpen(false);

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      PaperProps={{
        sx: {
          backgroundColor: "#262626",
          width: { xs: 270, md: 400 },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 270, md: 400 },
          background: "#262626",
        }}
        role="presentation"
      >
        <Menu
          handleClose={handleClose}
          setFilter={setFilter}
          filter={filter}
          allBooks={allBooks}
        />
      </Box>
    </SwipeableDrawer>
  );
};

export default LeftDrawerMenu;
