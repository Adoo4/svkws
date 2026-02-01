// BookCardSkeleton.jsx
import { Box, Card, CardContent, Skeleton } from "@mui/material";

const BookCardSkeleton = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: "transparent",
      }}
    >
      {/* Badges */}
      <Skeleton
        variant="rounded"
        width={44}
        height={18}
        sx={{ position: "absolute", top: 8, left: 8, borderRadius: 9, zIndex: 2 }}
      />
      <Skeleton
        variant="rounded"
        width={44}
        height={18}
        sx={{ position: "absolute", top: 34, left: 8, borderRadius: 9, zIndex: 2 }}
      />

      {/* Image */}
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: { xs: 250, sm: 200, md: 290 },
          aspectRatio: "3 / 4",
        }}
      />

      <Box sx={{ px: 1, py: 1, flexGrow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          {/* Title */}
          <Skeleton variant="text" height={22} width="90%" />
          <Skeleton variant="text" height={22} width="75%" />

          {/* Author */}
          <Skeleton variant="text" height={14} width="60%" sx={{ mb: 0.5 }} />

          {/* Stock + Wishlist */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Skeleton variant="rounded" width={90} height={18} />
            <Skeleton variant="circular" width={26} height={26} />
          </Box>

          {/* Category chip */}
          <Skeleton
            variant="rounded"
            width={110}
            height={20}
            sx={{ mb: 0.8 }}
          />

          {/* Description (desktop only mimic) */}
          <Skeleton variant="text" height={14} width="95%" />
          <Skeleton variant="text" height={14} width="85%" />

          {/* Price */}
          <Box sx={{ mt: 1 }}>
            <Skeleton variant="text" height={26} width="45%" />
            <Skeleton variant="text" height={12} width="60%" />
          </Box>
        </CardContent>

        {/* Action buttons */}
        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
          <Skeleton variant="rounded" height={36} width="100%" />
          <Skeleton variant="rounded" height={36} width="100%" />
        </Box>
      </Box>
    </Card>
  );
};

export default BookCardSkeleton;
