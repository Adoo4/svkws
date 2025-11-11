
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import Divider from "@mui/material/Divider";




const personalInfoAndData = ({shipping, valid, handleInputChange, compactField}) => {


    return(
<Box
            sx={{
              flex: 1,
              background: "#fff",
              borderRadius: 3,
              p: {  sm: 3, md: "1.5rem 10rem" },
              minHeight:{xs:"74lvh", md:"62lvh"},
                pb: { xs: 8, md: 0 },
            }}
          >
            {/* Section header */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#262626",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              🏠 Podaci za dostavu
            </Typography>

            {/* First row: Name & Email */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2,  }}>
              <TextField
                label="Ime i prezime"
                name="fullName"
                value={shipping.fullName || ""}
                placeholder="Ime i prezime"
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!shipping.fullName && !valid.fullName}
                helperText={
                  shipping.fullName && !valid.fullName ? "Neispravno ime" : ""
                }
                InputProps={{
                  endAdornment: valid.fullName ? (
                    <CheckOutlinedIcon sx={{ color: "green", fontSize:"0.95rem", marginRight:"1rem" }} />
                  ) : null,
                }}
               sx={compactField}
              />
              {/*Email*/}
              <TextField
                label="Email"
                name="email"
                value={shipping.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!shipping.email && !valid.email}
                helperText={
                  shipping.email && !valid.email ? "Neispravan email" : ""
                }
                InputProps={{
                  endAdornment: valid.email ? (
                    <CheckOutlinedIcon sx={{ color: "green", fontSize:"0.95rem", marginRight:"1rem" }} />
                  ) : null,
                }}
                sx={compactField}
              />
            </Box>

            {/* Phone row */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <TextField
                label="Država"
                value="+387"
                disabled
               sx={compactField}
              />
              <TextField
                label="Telefon"
                name="phone"
                value={shipping.phone}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!shipping.phone && !valid.phone}
                helperText={
                  shipping.phone && !valid.phone ? "Neispravan broj" : ""
                }
                InputProps={{
                  endAdornment: valid.phone ? (
                    <CheckOutlinedIcon sx={{ color: "green", fontSize:"0.95rem", marginRight:"1rem" }} />
                  ) : null,
                }}
               sx={compactField}
              />
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 3, borderColor: "#eee" }} />

            {/* Second group: Address */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Adresa"
                name="address"
                value={shipping.address}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!shipping.address && !valid.address}
                helperText={
                  shipping.address && !valid.address ? "Neispravna adresa" : ""
                }
                InputProps={{
                  endAdornment: valid.address ? (
                    <CheckOutlinedIcon sx={{ color: "green", fontSize:"0.95rem", marginRight:"1rem" }} />
                  ) : null,
                }}
               sx={compactField}
              />

              <TextField
                label="Grad"
                name="city"
                value={shipping.city}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!shipping.city && !valid.city}
                helperText={
                  shipping.city && !valid.city ? "Neispravan grad" : ""
                }
                InputProps={{
                  endAdornment: valid.city ? (
                    <CheckOutlinedIcon sx={{ color: "green", fontSize:"0.95rem", marginRight:"1rem" }} />
                  ) : null,
                }}
               sx={compactField}
              />

              <TextField
                label="Poštanski broj"
                name="zip"
                value={shipping.zip}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!shipping.zip && !valid.zip}
                helperText={
                  shipping.zip && !valid.zip ? "Neispravan poštanski broj" : ""
                }
                InputProps={{
                  endAdornment: valid.zip ? (
                    <CheckOutlinedIcon sx={{ color: "green", fontSize:"0.95rem", marginRight:"1rem" }} />
                  ) : null,
                }}

                
               sx={compactField}
              />
            </Box>
          </Box>

    )
}

    export default personalInfoAndData