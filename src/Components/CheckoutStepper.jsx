import  { useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepperLine from "./StepperLine";
import CardPicker from "./CardPicker3";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import ReviewStep from "./ReviewStep4";
import PersonalInfoAndData from "./PersonalInfoAndData1";

export default function CheckoutStepper({
  shipping,
  handleChange,
  handlePay,
  setShipping,
  totalWithDelivery,
  delivery,
  totals,
  cart,
  setTotals,
  orderNumber
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
      padding: 0, // remove extra padding
      minHeight: "45px", // actual control height
      fontSize: "0.85rem",
      "& input": {
        padding: "8px 10px", // top/bottom padding controls height
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
          <PersonalInfoAndData
            shipping={shipping}
            valid={valid}
            handleInputChange={handleInputChange}
            compactField={compactField}
          />
        );

      case 1:
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
              price: "7 KM",
              disabled: false,
            },
            {
              id: "brzapošta",
              label: "Brza pošta",
              description: "Brza dostava širom BiH",
              price: "USKORO",//"10,00 KM",
              disabled: true,
            },
            {
              id: "storepickup",
              label: "Preuzimanje u trgovini",
              description:
                "Bez dodatnih troškova. Preuzmite pošiljku u jednoj od naših podružnica i to u vremenu od 8:00 do 16:00 radnim danom ili subotom",
              price: "USKORO",//"0,00 KM",
              disabled: true,
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
                  shipping.deliveryMethod === option.id
                    ? "1px solid #34bf48"
                    : "1px solid #eee",
                backgroundColor:
                  shipping.deliveryMethod === option.id ? "#f2fff2ff" : "#fff",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: !option.disabled ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
                },
                cursor: option.disabled ? "not-allowed" : "pointer",
                opacity: option.disabled ? 0.5 : 1,
              }}
              onClick={() => {
                if (!option.disabled) {
                  handleInputChange({
                    target: {
                      name: "deliveryMethod",
                      value: option.id,
                      price: option.price,
                    },
                  });
                }
              }}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flex: 1,
                  }}
                >
                  <Radio
                    checked={shipping.deliveryMethod === option.id}
                    sx={{
                      color: "#34bf48",
                      mt: "3px",
                    }}
                    disabled={option.disabled}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {option.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        whiteSpace: "pre-line",
                        fontSize: "0.75rem",
                      }}
                    >
                      {option.description}
                    </Typography>
                  </Box>
                </Box>

                {/* Right: price */}
                <Box sx={{ flexShrink: 0, ml: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: option.disabled ? "#999" : "#ff4b2b",
                      fontWeight: 500,
                    }}
                  >
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
          <CardPicker
            FormControl={FormControl}
            RadioGroup={RadioGroup}
            shipping={shipping}
            handleInputChange={handleInputChange}
            Paper={Paper}
            FormControlLabel={FormControlLabel}
            Radio={Radio}
          />
        );

      case 3:
        return (
          <Box
            sx={{ p: { xs: 0, sm: 3, xl: "1.5rem 10rem", minHeight: "90lvh" } }}
          >
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
              📦 Pregledaj i zaključi narudžbu
            </Typography>
           <ReviewStep
  cart={cart}
  shipping={shipping}
  deliveryOption={shipping.deliveryMethod}
  paymentOption={shipping.paymentMethod}
  totalCart={totals.totalCart}
  delivery={totals.delivery}
  totalWithDelivery={totals.totalWithDelivery}
  orderNumber={orderNumber}
  handlePay={handlePay}
/>
            
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <StepperLine
      completed={completed}
      activeStep={activeStep}
      Stepper={Stepper}
      steps={steps}
      Step={Step}
      StepButton={StepButton}
      stepValid={stepValid}
      setCompleted={setCompleted}
      setActiveStep={setActiveStep}
      StepLabel={StepLabel}
      CustomStepIcon={CustomStepIcon}
      stepIcons={stepIcons}
      renderStepContent={renderStepContent}
      handleBack={handleBack}
      handleCompleteStep={handleCompleteStep}
      
    />
  );
}
