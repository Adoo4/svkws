// IsNewSwitch.jsx
import { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";

import { Box, FormControl,  Typography } from "@mui/material";

const IsNewSwitch = ({ onToggle }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    onToggle(newValue); // send value up to parent
  };

return (
  <Box sx={{ minWidth: 250, width: "100%", mt: 0,  }}>
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
          checked={checked}
          onChange={handleChange}
          color="default"
          sx={{
            "& .MuiSwitch-switchBase": {
              color: "#f7f7f7", // thumb when off
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#f7f7f7", // thumb when on
              transform: "translateX(16px)",
              "&:hover": {
                backgroundColor: "rgba(247, 247, 247, 0.08)",
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#d62d00", // track when ON
              opacity: 1,
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#262626", // track when OFF
              opacity: 1,
            },
          }}
        />
      }
      label={
        <Typography sx={{ fontSize: "0.75rem", color: "#f7f7f7" }}>
          Nove knjige
        </Typography>
      }
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        m: 0,
      }}
      labelPlacement="start" // label left, switch right
    />
  </FormControl>
</Box>

);

};

export default IsNewSwitch;
