
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

export default function CheckoutStepper({ shipping, handleChange, handleCheckout, cart }) {
  const steps = [
    'Adresa za dostavu',
    'Načini dostave',
    'Način plaćanja',
    'Zaključi narudžbu',
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);
  const handleStep = step => () => setActiveStep(step);
  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ flex: 1, background: '#f0f0f0', borderRadius: 3, p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, color: '#000' }}>
              Podaci za dostavu
            </Typography>
            <TextField
              label="Ime i prezime"
              name="fullName"
              value={shipping.fullName}
              placeholder="Ime i prezime"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={shipping.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Adresa"
              name="address"
              value={shipping.address}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Grad"
              name="city"
              value={shipping.city}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Poštanski broj"
              name="zip"
              value={shipping.zip}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ovde ide izbor načina dostave (placeholder)
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ovde ide izbor načina plaćanja (placeholder)
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Pregled i zaključi narudžbu
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#f33600',
                color: '#fff',
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#d62d00' },
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
      <Stepper nonLinear activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      {allStepsCompleted() ? (
        <Box>
          <Typography sx={{ mt: 2, mb: 1 }}>Sve korake ste završili!</Typography>
          <Button onClick={handleReset}>Resetuj</Button>
        </Box>
      ) : (
        <Box>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
              Nazad
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep < steps.length - 1 && (
              <Button onClick={handleComplete}>
                {completedSteps() === totalSteps() - 1 ? 'Završi' : 'Označi korak'}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
