import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardPicker = ({ FormControl, RadioGroup, shipping, handleInputChange, Paper, FormControlLabel, Radio }) => {
  const paymentOptions = [
    {
      id: "card",
      label: "Kartično plaćanje",
      description: "Visa, Visa Electron, MasterCard ili Maestro",
      disabled: false,
    },
    {
      id: "cash",
      label: "Pouzećem",
      description: "Plaćanje gotovinom pri preuzimanju paketa",
      disabled: true,
    },
    {
      id: "bank",
      label: "Plaćanje na žiro račun",
      description: "Uplatom direktno na naš žiro račun",
      disabled: true,
    },
  ];

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
          {paymentOptions.map((option) => (
            <Paper
              key={option.id}
              elevation={shipping.paymentMethod === option.id ? 4 : 1}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border:
                  shipping.paymentMethod === option.id
                    ? "1px solid #34bf48"
                    : "1px solid #eee",
                backgroundColor:
                  shipping.paymentMethod === option.id
                    ? "#f2fff2ff"
                    : "#fff",
                transition: "0.3s",
                cursor: option.disabled ? "not-allowed" : "pointer",
                opacity: option.disabled ? 0.5 : 1,
                "&:hover": {
                  boxShadow: !option.disabled
                    ? "0 4px 16px rgba(0,0,0,0.08)"
                    : "none",
                },
              }}
              onClick={() => {
                if (!option.disabled) {
                  handleInputChange({
                    target: { name: "paymentMethod", value: option.id },
                  });
                }
              }}
            >
              <FormControlLabel
                value={option.id}
                control={<Radio sx={{ color: "#34bf48" }} disabled={option.disabled} />}
                label={
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {option.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
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
  );
};

export default CardPicker;
