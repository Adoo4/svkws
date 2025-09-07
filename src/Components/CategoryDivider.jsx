import { Typography, Divider, Box } from "@mui/material";

const CategorySection = ({ title, children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        my: 2,
        marginTop:"4rem",
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Divider
          sx={{
            flexGrow: 1,
            borderColor: "#e0e0e0",
            height: 2,
            borderRadius: 1,
            mr: 2,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1c1c1c",
            letterSpacing: "1px",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              width: "40%",
              height: "4px",
              background: "#cb282d",
              bottom: -6,
              left: 0,
              borderRadius: 2,
            },
          }}
        >
          {title}
        </Typography>
        <Divider
          sx={{
            flexGrow: 1,
            borderColor: "#e0e0e0",
            height: 2,
            borderRadius: 1,
            ml: 2,
          }}
        />
      </Box>

      {children}
    </Box>
  );
};

export default CategorySection;
