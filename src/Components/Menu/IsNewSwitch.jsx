// IsNewSwitch.jsx
import { Switch, FormControlLabel, Box, FormControl, Typography } from "@mui/material";
import WhatshotIcon from '@mui/icons-material/Whatshot';

const IsNewSwitch = ({ onToggle, checked }) => {
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
              checked={checked} // now controlled by parent
              onChange={handleChange}
              color="default"
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "#f7f7f7",
                },
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#f7f7f7",
                  transform: "translateX(16px)",
                  "&:hover": {
                    backgroundColor: "rgba(247, 247, 247, 0.08)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#d62d00",
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
              <WhatshotIcon sx={{ fontSize: "1rem", color: "#d62d00" }} />
              <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7" }}>
                Nove knjige
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


export default IsNewSwitch;

