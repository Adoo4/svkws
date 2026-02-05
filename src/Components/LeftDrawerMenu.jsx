import React from 'react';
import { SwipeableDrawer, Box } from '@mui/material';
import Menu from "../Components/Menu/Menu";

const LeftDrawerMenu = ({ open, setOpen, setFilter, filter, page,  setPage }) => {
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
          width: { xs: 270, md: 430 }, overflow:"hidden", paddingTop:"3rem"
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 270, md: 450 },
          background: "#262626",
        }}
        role="presentation"
      >
        <Menu
          handleClose={handleClose}
          setFilter={setFilter}
          filter={filter}
          page={page}
          setPage={setPage}
        />
      </Box>
    </SwipeableDrawer>
  );
};

export default LeftDrawerMenu;
