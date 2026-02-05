import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardPicker = ({
  FormControl,
  RadioGroup,
  shipping,
  handleInputChange,
  Paper,
  FormControlLabel,
  Radio,
}) => {
  const paymentOptions = [
    {
      id: "card",
      label: "Kartično plaćanje",
      description: "Visa, MasterCard ili Maestro",
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

const cardLogos = [
 
  {
    src: "/Cards/Visa 2015 50.gif",
    href: "https://www.visa.com",
    alt: "Visa",
  },
 
  {
    src: "/Cards/ms_vrt_opt_pos_53_2x.png",
    href: "https://brand.mastercard.com/brandcenter/more-about-our-brands.html",
    alt: "Maestro",
  },
  {
    src: "/Cards/mc_vrt_opt_pos_46_3x.png",
    href: "https://www.mastercard.com",
    alt: "Mastercard",
  },
];


const securityLogos = [
  
  {
    src: "/Payment Security logo/mc_idcheck_hrz_rgb_pos.png",
    alt: "Mastercard ID Check",
  },
  {
    src: "/Payment Security logo/visa-secure-blk_72dpi.jpg",
    alt: "Visa Secure",
  },
  {
    src: "/Payment Security logo/PayWeb e-kupovina_logo.png",
    alt: "Monri Secure Payment",
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
                    ? "1px solid #353535"
                    : "1px solid #eee",
                backgroundColor:
                  shipping.paymentMethod === option.id ? "#f2fff2ff" : "#fff",
                transition: "0.3s",
                cursor: option.disabled ? "not-allowed" : "pointer",
                opacity: option.disabled ? 0.5 : 1,
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
                control={
                  <Radio sx={{ color: "#34bf48" }} disabled={option.disabled} />
                }
                sx={{ width: "100%", m: 0 }}
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
                        mb: 1,
                      }}
                    >
                      {option.description}
                    </Typography>

                    {/* ✅ Card logos ONLY for card payment */}
                    {option.id === "card" && (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width:"100%",
      gap: { xs: 1, sm: 1.5, lg: 2 },
      flexWrap: { xs: "wrap", lg: "nowrap" },
      mt: 1,
      justifyContent:"flex-end"
    }}
  >
    {cardLogos.map((logo) => (
      <Box
        key={logo.src}
        component="a"
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "inline-flex",
          alignItems: "flex-end",
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={logo.src}
          alt={logo.alt}
          sx={{
            height: { xs: 24, sm: 28, lg: 32 },
            width: "auto",
            objectFit: "contain",
            filter: "grayscale(10%)",
            transition: "0.2s ease",
            "&:hover": {
              filter: "grayscale(0%)",
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>
    ))}

    
  </Box>
  
)}


                  </Box>
                  
                }

              />
              {/* 🔒 Payment security logos – ONLY ONCE */}

              
            </Paper>
          ))}
        </RadioGroup>
        
      </FormControl>

          {/* 🔒 Payment security logos – ONLY ONCE (correct placement) */}
     {shipping.paymentMethod === "card" && (
  <Box
    sx={{
      mt: 4,
      pt: 2,
      borderTop: "1px solid #eee",
      textAlign: "center",
    }}
  >
    <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
      SIGURNO PLAĆANJE
    </Typography>

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: { xs: 2, sm: 3 }, // minimalni razmak između logotipa
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
     

      {/* Mastercard® Identity Check™ */}
      <Box
        component="img"
        src={securityLogos.find((logo) => logo.alt.includes("Mastercard")).src}
        alt="Mastercard® Identity Check™"
        sx={{
          height: { xs: 35, sm: 50 },
          objectFit: "contain",
          m: 0.5,
        }}
      />

      {/* Visa Secure */}
      <Box
        component="img"
        src={securityLogos.find((logo) => logo.alt.includes("Visa")).src}
        alt="Visa Secure"
        sx={{
          height: { xs: 35, sm: 50 },
          objectFit: "contain",
          m: 0.5,
        }}
      />

      {/* Monri Payments – PSP */}
      <Box
        component="a"
        href="http://monri.com/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: "inline-block", m: 0.5 }}
      >
        <Box
          component="img"
          src={securityLogos.find((logo) => logo.alt.includes("Monri")).src}
          alt="Monri Payments"
          sx={{
            height: { xs: 60, sm: 80 },
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  </Box>
)}

      
    </Box>
  );
};

export default CardPicker;
