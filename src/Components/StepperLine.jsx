import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const StepperLine = ({
  completed,
  activeStep,
  Stepper,
  steps,
  Step,
  StepButton,
  stepValid,
  setCompleted,
  setActiveStep,
  StepLabel,
  CustomStepIcon,
  stepIcons,
  renderStepContent,
  handleBack,
  handleCompleteStep
}) => {
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
};

export default StepperLine;
