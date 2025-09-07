// BookCardSkeleton.jsx
import { Box, Card, CardContent, CardActions, Skeleton } from "@mui/material";

const BookCardSkeleton = () => {
  return (
    <Card
      elevation={0}
      sx={{
        minWidth: { xs: "50px", sm: "140px", md: "250px" },
        maxWidth: { xs: "130px", sm: "180px", md: "270px" },
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        border: "1px solid transparent",
        position: "relative",
      }}
    >
      {/* Badge placeholder */}
      <Skeleton
        variant="rounded"
        width={50}
        height={20}
        sx={{ position: "absolute", top: 10, left: 10, borderRadius: 10 }}
      />

      {/* Image placeholder */}
      <Skeleton
        variant="rectangular"
        sx={{
          height: { xs: 180, sm: 250 },
          width: "100%",
          aspectRatio: "3 / 4",
        }}
      />

      <Box sx={{ px: 2, py: 2, flexGrow: 1 }}>
        <CardContent sx={{ p: 0, minHeight: "7rem" }}>
          {/* Title */}
          <Skeleton variant="text" height={24} width="70%" />

          {/* Category badges */}
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Skeleton variant="rounded" width={60} height={20} />
            <Skeleton variant="rounded" width={50} height={20} />
          </Box>

          {/* Short description */}
          <Skeleton variant="text" height={14} width="100%" />
          <Skeleton variant="text" height={14} width="95%" />
          <Skeleton variant="text" height={14} width="80%" />

          {/* Price */}
          <Box sx={{ mt: 1 }}>
            <Skeleton variant="text" width="40%" height={24} />
          </Box>
        </CardContent>

        {/* Buttons */}
        <CardActions sx={{ p: 0, mt: 2, gap: 1 }}>
          <Skeleton variant="rectangular" height={36} width="100%" />
          <Skeleton variant="rectangular" height={36} width="100%" />
        </CardActions>
      </Box>
    </Card>
  );
};

export default BookCardSkeleton;
