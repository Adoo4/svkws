import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import axios from "axios";


import { Box, Paper, TextField, Typography, Button, Grid } from "@mui/material";

export default function CompleteProfile() {
  const { user } = useUser();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      await axios.put("http://localhost:5000/api/users/update-profile", {
        userId: user.id,
        form
      });

      alert("Delivery info saved!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to save delivery info.");
    }
  };

 return (



    <Paper
      elevation={5}
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 4,
        p: 4,
        pb: 6,
        borderRadius: 3,
        background: `
          repeating-linear-gradient(
            45deg,
            black,
            black 10px,
            #262626 10px,
            #262626 20px
          ),
          linear-gradient(
            to bottom,
            rgba(255, 255, 255, 1) 0%,
            rgba(241, 241, 241, 0.49) 66%,
            rgba(0, 0, 0, 1) 100%
          )
        `,
        backgroundBlendMode: "overlay",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "#fff" }}
      >
        Complete Your Delivery Info
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: "#fff" } }}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              label="Street Address"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: "#fff" } }}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: "#fff" } }}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="postalCode"
              label="Postal Code"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: "#fff" } }}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone Number"
              fullWidth
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: "#fff" } }}
              inputProps={{ style: { color: "#fff" } }}
              defaultValue="+387"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                mt: 1,
                py: 1.2,
                fontWeight: "bold",
                backgroundColor: "#0070f3",
                "&:hover": { backgroundColor: "#005bb5" },
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}





