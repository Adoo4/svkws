// BookCardSkeleton.jsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";


const BookCardSkeleton = () => {
  const badges = [8, 34]; // top positions for badges
  const textLines = [0.9, 0.75]; // width ratios for title
  const descLines = [0.95, 0.85]; // width ratios for description

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
      }}
    >
      {/* Badges */}
      {badges.map((top, idx) => (
        <Skeleton
          key={idx}
          variant="rounded"
          width={44}
          height={18}
          sx={{ position: "absolute", top, left: 8, borderRadius: 9, zIndex: 2 }}
        />
      ))}

      {/* Image */}
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", height: { xs: 250, sm: 200, md: 290 }, aspectRatio: "3/4" }}
      />

      <CardContent sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Title */}
        {textLines.map((w, idx) => (
          <Skeleton key={idx} variant="text" height={22} width={`${w * 100}%`} />
        ))}

        {/* Author */}
        <Skeleton variant="text" height={14} width="60%" />

        {/* Stock + Wishlist */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="rounded" width={90} height={18} />
          <Skeleton variant="circular" width={26} height={26} />
        </Stack>

        {/* Category chip */}
        <Skeleton variant="rounded" width={110} height={20} />

        {/* Description */}
        {descLines.map((w, idx) => (
          <Skeleton key={idx} variant="text" height={14} width={`${w * 100}%`} />
        ))}

        {/* Price */}
        <Stack spacing={0.5} mt={1}>
          <Skeleton variant="text" height={26} width="45%" />
          <Skeleton variant="text" height={12} width="60%" />
        </Stack>

        {/* Action buttons */}
        <Stack direction="row" spacing={1} mt={1}>
          <Skeleton variant="rounded" height={36} width="100%" />
          <Skeleton variant="rounded" height={36} width="100%" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookCardSkeleton;
