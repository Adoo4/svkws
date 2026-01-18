import { Box, Typography } from "@mui/material";

import AdminMenu from "./AdminMenu"; // import the admin menu

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 1, marginTop: 0 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <AdminMenu /> {/* fully working server-side paginated grid */}
    </Box>
  );
};

export default AdminDashboard;