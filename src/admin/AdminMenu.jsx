import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// 👉 import your DataGrid page
import DataGrid from './DataGrid';

const drawerWidth = 240;

const menuItems = [
  { label: 'Overview', key: 'overview' },
  { label: 'Books', key: 'books' },
  { label: 'Orders', key: 'orders' },
  { label: 'Most Sold', key: 'mostSold' },
];

export default function PermanentDrawerLeft() {
  const [activeView, setActiveView] = React.useState('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <Typography variant="h5">Overview</Typography>;

      case 'books':
        return <DataGrid />; // ✅ DataGrid mounts here

      case 'orders':
        return <Typography variant="h5">Orders</Typography>;

      case 'mostSold':
        return <Typography variant="h5">Most Sold</Typography>;

      default:
        return null;
    }
  };

  return (
  <Box
  sx={{
    display: "flex", // 🔑 whole viewport
    minHeight:"100lvh",
  }}
>

  <CssBaseline />

  {/* AppBar */}


  {/* Drawer */}
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      }, zIndex: "50"
    }}
  >
    {/* 🔑 This pushes menu BELOW navbar */}
  

    <Divider />

    <List>
      {menuItems.map((item, index) => (
        <ListItem key={item.key} disablePadding>
          <ListItemButton
            selected={activeView === item.key}
            onClick={() => setActiveView(item.key)}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>

  {/* Main */}
  <Box
  component="main"
  sx={{
    flexGrow: 1,
    display: "flex",
    minHeight:"100lvh",
    flexDirection: "column",
    overflow: "visible",
  }}
>
  <Toolbar /> {/* AppBar spacer */}

  <Box
    sx={{
      flex: 1,           // 🔑 fills remaining height
      p: 2,
      overflow: "hidden",
    }}
  >
    {renderContent()}
  </Box>
</Box>
</Box>

  );
}
