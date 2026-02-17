// BookCardSkeletonResponsive.jsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";

const BookCardSkeletonResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    // Mobile skeleton matches BookCardMobile layout
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "transparent",
          position: "relative",
          padding: 1,
        }}
      >
        {/* Badges */}
        <Box sx={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 0.5, zIndex: 2 }}>
          <Skeleton variant="rounded" width={36} height={18} />
          <Skeleton variant="rounded" width={36} height={18} />
        </Box>

        {/* Cover */}
        <Skeleton variant="rectangular" sx={{ width: "100%", height: 200 }} />

        {/* Content */}
        <CardContent sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Skeleton variant="text" height={18} width="80%" />
          <Skeleton variant="text" height={14} width="60%" />
          <Skeleton variant="text" height={14} width="70%" />

          {/* Price + Stock */}
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Skeleton variant="text" height={20} width="40%" />
            <Skeleton variant="rounded" height={22} width={50} />
          </Stack>

          {/* Details Button */}
          <Skeleton variant="rounded" height={36} width="100%" sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    );
  }

  // Desktop skeleton
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        position: "relative",
        padding: 2,
      }}
    >
      {/* Badges */}
      {[8, 34].map((top, idx) => (
        <Skeleton
          key={idx}
          variant="rounded"
          width={43}
          height={18}
          sx={{ position: "absolute", top, left: 8, borderRadius: 9, zIndex: 2 }}
        />
      ))}

      {/* Image */}
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", height: { xs: 250, sm: 200, md: 290 }, aspectRatio: "3/4" }}
      />

      <CardContent sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0 }}>
        {[0.9, 0.75].map((w, idx) => (
          <Skeleton key={idx} variant="text" height={22} width={`${w * 100}%`} />
        ))}

        <Skeleton variant="text" height={14} width="60%" />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Skeleton variant="rounded" width={90} height={18} />
          <Skeleton variant="circular" width={26} height={26} />
        </Stack>

        <Skeleton variant="rounded" width={110} height={20} />

        {[0.95, 0.85].map((w, idx) => (
          <Skeleton key={idx} variant="text" height={14} width={`${w * 100}%`} />
        ))}

        <Stack spacing={0.5} mt={1}>
          <Skeleton variant="text" height={26} width="45%" />
          <Skeleton variant="text" height={12} width="60%" />
        </Stack>

        <Stack direction="row" spacing={1} mt={1}>
          <Skeleton variant="rounded" height={36} width="100%" />
          <Skeleton variant="rounded" height={36} width="100%" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookCardSkeletonResponsive;
