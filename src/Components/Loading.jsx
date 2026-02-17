import { Box, CircularProgress } from "@mui/material";

export default function FullScreenLoader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#262626",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "#fff" }} />
    </Box>
  );
}