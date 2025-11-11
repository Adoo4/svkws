import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardPicker = ({FormControl, RadioGroup, shipping, handleInputChange, Paper, FormControlLabel, Radio}) => {


    return (
        <Box
            sx={{
              p: { sm: 3, md: "1.5rem 10rem" },
              backgroundColor: "#fff",
              borderRadius: 3,
              minHeight: { xs: "74lvh", md: "62lvh" },
              pb: { xs: 8, md: 0 },
            }}
          >
            {/* Section header */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#262626",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              💳 Način plaćanja
            </Typography>

            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup
                name="paymentMethod"
                value={shipping.paymentMethod || ""}
                onChange={handleInputChange}
              >
                {[
                  {
                    id: "card",
                    label: "Kartično plaćanje",
                    description: "Visa, Visa Electron, MasterCard ili Maestro",
                  },
                  {
                    id: "cash",
                    label: "Pouzećem",
                    description: "Plaćanje gotovinom pri preuzimanju paketa",
                  },
                  {
                    id: "bank",
                    label: "Plaćanje na žiro račun",
                    description: "Uplatom direktno na naš žiro račun",
                  },
                ].map((option) => (
                  <Paper
                    key={option.id}
                    elevation={shipping.paymentMethod === option.id ? 4 : 1}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border:
                        shipping.paymentMethod === option.id
                          ? "1px solid #327c30ff"
                          : "1px solid #eee",
                      backgroundColor:
                        shipping.paymentMethod === option.id
                          ? "#f2fff2ff"
                          : "#fff",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <FormControlLabel
                      value={option.id}
                      control={<Radio sx={{ color: "#34bf48" }} />}
                      label={
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            {option.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.75rem",
                            }}
                          >
                            {option.description}
                          </Typography>
                        </Box>
                      }
                      sx={{ width: "100%", mb: 0 }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
    )
}

export default CardPicker