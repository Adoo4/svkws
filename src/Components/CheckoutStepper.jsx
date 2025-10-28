import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Check from "@mui/icons-material/Check";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ReviewStep from "./ReviewStep";

export default function CheckoutStepper({
  shipping,
  handleChange,
  handleCheckout,
  cart,
}) {
  const steps = [
    "Podaci za dostavu",
    "Načini dostave",
    "Način plaćanja",
    "Zaključi narudžbu",
  ];
  const stepIcons = ["🏠", "🚚", "💳", "📦"];
  const [valid, setValid] = useState({
    fullName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    zip: false,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  // Regex patterns for validation
  const patterns = {
    fullName: /^[A-Za-zÀ-ž]+ [A-Za-zÀ-ž]+(?: [A-Za-zÀ-ž]+)*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{8,12}$/,
    address: /^[A-Za-z0-9čšđžćČŠĐŽĆ\s,.-]{5,}$/,
    city: /^[A-Za-zÀ-ž\s]{2,}$/,
    zip: /^[0-9]{4,10}$/,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ target: { name, value } });

    setValid((prev) => ({
      ...prev,
      [name]: patterns[name] ? patterns[name].test(value) : false,
    }));
  };

  const isCase0Valid =
    valid.fullName &&
    valid.email &&
    valid.phone &&
    valid.address &&
    valid.city &&
    valid.zip;

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveStep((prev) => prev + 1);


  const handleCompleteStep = () => {
    // Only mark step completed if valid
    if (stepValid[activeStep]) {
      setCompleted({ ...completed, [activeStep]: true });
      handleNext();
    }
  };

  const stepValid = [
    isCase0Valid, // Step 0
    !!shipping.deliveryMethod, // Step 1: delivery method selected
    !!shipping.paymentMethod, // Step 2: payment method selected
    true, // Step 3: review step, always valid
  ];

  const CustomStepIcon = ({ completed, active, icon }) => {
    // Always show check for completed, ignore active for that case
    if (completed) {
      return <Check sx={{ color: "#34bf48" }} />;
    }

   
    return (
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: active ? "#262626" : "#ccc",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        {icon}
      </Box>
    );
  };

  const compactField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "1rem",
    padding: 0,          // remove extra padding
    minHeight: "45px",   // actual control height
    fontSize: "0.85rem",
    "& input": {
      padding: "8px 10px",  // top/bottom padding controls height
      fontSize: "0.85rem",
    },
    "& fieldset": {
      borderColor: "#9b9999ff",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.8rem",
    top: "-4px",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "0.65rem",
    marginTop: "2px",
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0px 1000px #fff inset",
    WebkitTextFillColor: "#000",
    transition: "background-color 5000s ease-in-out 0s",
  },
};



  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
        );

      case 1:
    
  return (
    <Box
      sx={{
        p: {  sm: 3, md: "1.5rem 10rem" },
        backgroundColor: "#fff",
        borderRadius: 3,
        minHeight:{xs:"74lvh", md:"62lvh"},
          pb: { xs: 8, md: 0 },
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color: "#262626", mb: 2, display: "flex", alignItems: "center", gap: 1 }}
      >
        🚚 Način dostave
      </Typography>

      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          name="deliveryMethod"
          value={shipping.deliveryMethod || ""}
          onChange={handleInputChange}
        >
          {[
            {
              id: "bhposta",
              label: "BH Pošta (BiH)",
              description: "Dostava putem BH pošte unutar BiH",
              price: "4,50 KM",
            },
            {
              id: "euroexpress",
              label: "Euro Express",
              description: "Brza dostava širom BiH",
              price: "10,00 KM",
            },
            {
              id: "storepickup",
              label: "Preuzimanje u trgovini",
              description:
                "Bez dodatnih troškova. Preuzmite pošiljku u jednoj od naših podružnica i to u vremenu od 8:00 do 16:00 radnim danom ili subotom",
              price: "0,00 KM",
            },
          ].map((option) => (
            <Paper
  key={option.id}
  elevation={shipping.deliveryMethod === option.id ? 4 : 1}
  sx={{
    p: 2,
    mb: 2,
    borderRadius: 2,
    border:
      shipping.deliveryMethod === option.id ? "1px solid #34bf48" : "1px solid #eee",
    backgroundColor: shipping.deliveryMethod === option.id ? "#f2fff2ff" : "#fff",
    transition: "0.3s",
    "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.08)" },
    cursor: "pointer",
  }}
  onClick={() => handleInputChange({ target: { name: "deliveryMethod", value: option.id } })}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    }}
  >
    {/* Left: radio + label + description */}
    <Box sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
      <Radio
        checked={shipping.deliveryMethod === option.id}
        sx={{ color: "#34bf48", mt: "3px" }}
      />
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {option.label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-line", fontSize: "0.75rem" }}
        >
          {option.description}
        </Typography>
      </Box>
    </Box>

    {/* Right: price */}
    <Box sx={{ flexShrink: 0, ml: 2 }}>
      <Typography variant="subtitle2" sx={{ color: "#ff4b2b", fontWeight: 500 }}>
        {option.price}
      </Typography>
    </Box>
  </Box>
</Paper>

          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );


      case 2:
        return (
          <Box
            sx={{
              p: {  sm: 3, md: "1.5rem 10rem" },
              backgroundColor: "#fff",
              borderRadius: 3,
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
        );

      case 3:
        return (
          <Box sx={{ p: { xs: 0, sm: 3, xl: "1.5rem 10rem", minHeight:"90lvh" } }}>
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
              📦 Pregled i zaključi narudžbu
            </Typography>
            <ReviewStep
              cart={cart}
              shipping={shipping}
              deliveryOption={shipping.deliveryMethod}
              paymentOption={shipping.paymentMethod}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#f33600",
                "&:hover": { bgcolor: "#d62d00" },
              }}
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Završi kupovinu
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          sx={{ mb: 3, maxWidth: "1000px", width: "100%" }}
          alternativeLabel={false}
        >
          {steps.map((label, index) => {
            

            return (
              <Step
                key={label}
                completed={!!completed[index]}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                }}
              >
                <StepButton
                  onClick={() => {
                    // Only allow going to the step if all previous steps and this step are valid
                    let canGo = true;

                    for (let i = 0; i <= index; i++) {
                      // notice <=
                      if (!stepValid[i]) {
                        canGo = false;
                        break;
                      }
                    }

                    if (canGo) {
                      // Mark all previous steps as completed
                      const newCompleted = { ...completed };
                      for (let i = 0; i < index; i++) {
                        if (stepValid[i]) newCompleted[i] = true;
                      }
                      setCompleted(newCompleted);
                      setActiveStep(index);
                    }
                  }}
                  sx={{ flexDirection: "column" }}
                >
                  <StepLabel
                    StepIconComponent={(props) => <CustomStepIcon {...props} />}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: { xs: "0.65rem", sm: "0.80rem" },
                        mt: { xs: 1, sm: 0 },
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      },
                    }}
                  >
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                      {label}
                    </Box>
                    <Box
                      sx={{
                        display: { xs: "block", sm: "none" },
                        fontSize: "1.2rem",
                      }}
                    >
                      {stepIcons[index]}
                    </Box>
                  </StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {renderStepContent(activeStep)}

      {/* Navigation buttons */}
      {/* Navigation buttons */}
      {/* Navigation buttons */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    pt: 2,
    maxWidth: "900px",
    width: "100%",
    mx: "auto",
    background: { xs: "#fff", md: "transparent" },
    borderTop: { xs: "1px solid #eee", md: "none" },
    p: { xs: "0.75rem 1rem", md: 0 },
    position: { xs: "fixed", md: "static" },
    bottom: { xs: 0, md: "auto" },
    left: 0,
    zIndex: 1000,
  }}
>
  {/* Back button */}
  <Button
    color="inherit"
    disabled={activeStep === 0}
    onClick={handleBack}
    sx={{
      color: "#262626",
      py: 0.5,
      px: 2,
      borderRadius: "2rem",
      fontSize: "0.75rem",
      textTransform: "none",
      minWidth: "80px",
      "&:hover": { bgcolor: "#313131", color: "white" },
    }}
  >
    Nazad
  </Button>

  {/* Next / Complete step button */}
  {activeStep < steps.length - 1 && (
    <Button
      onClick={handleCompleteStep}
      variant="contained"
      sx={{
        bgcolor: "#262626",
        color: "white",
        py: 0.5,
        px: 2,
        borderRadius: "2rem",
        fontSize: "0.75rem",
        textTransform: "none",
        minWidth: "80px",
        "&:hover": { bgcolor: "#313131" },
      }}
      disabled={!stepValid[activeStep]}
    >
      Dalje
    </Button>
  )}
</Box>

    </Box>
  );
}
