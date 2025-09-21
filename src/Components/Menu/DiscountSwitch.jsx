// DiscountSwitch.jsx
import { Switch, FormControlLabel, Box, FormControl, Typography } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const DiscountSwitch = ({ onToggle, checked }) => {
  const handleChange = (event) => {
    const newValue = event.target.checked;
    onToggle(newValue); // send value up to parent
  };

  return (
    <Box sx={{ minWidth: 250, width: "100%", mt: 1 }}>
      <FormControl
        fullWidth
        sx={{
          borderRadius: 2,
          backgroundColor: "#313131",
          px: 2,
          py: 1,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={checked} // controlled by parent
              onChange={handleChange}
              color="default"
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "#696969",
                },
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#696969",
                  transform: "translateX(16px)",
                  "&:hover": {
                    backgroundColor: "rgba(247, 247, 247, 0.08)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#ffb703",
                  opacity: 1,
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#262626",
                  opacity: 1,
                },
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalOfferIcon sx={{ fontSize: "1rem", color: "#ffb703" }} />
              <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7" }}>
                Popust
              </Typography>
            </Box>
          }
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            m: 0,
          }}
          labelPlacement="start"
        />
      </FormControl>
    </Box>
  );
};

export default DiscountSwitch;
