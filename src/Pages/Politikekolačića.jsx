import { Box, Typography, Divider } from "@mui/material";

const cookiePolicyData = [
  {
    title: "1. Šta su kolačići?",
    content:
      "Kolačići su male tekstualne datoteke koje se pohranjuju na Vaš uređaj prilikom posjete našoj web stranici. Omogućavaju prepoznavanje Vašeg uređaja i pamćenje određenih informacija radi poboljšanja funkcionalnosti i korisničkog iskustva.",
  },
  {
    title: "2. Vrste kolačića koje koristimo",
    content:
      "- Neophodni kolačići: omogućavaju osnovne funkcionalnosti stranice i ne mogu se isključiti.\n- Analitički kolačići: pomažu nam razumjeti kako korisnici koriste web stranicu (broj posjeta, posjećene stranice).\n- Funkcionalni kolačići: pamte Vaše postavke i preferencije.\n- Marketinški kolačići: koriste se za prikazivanje relevantnih oglasa i praćenje efikasnosti marketinških kampanja.",
  },
  {
    title: "3. Upravljanje kolačićima",
    content:
      "Korisnici mogu u bilo kojem trenutku kontrolisati ili onemogućiti upotrebu kolačića putem postavki svog internet preglednika. Ipak, isključivanje određenih kolačića može uticati na funkcionalnost i rad stranice.",
  },
  {
    title: "4. Izmjene Politike kolačića",
    content:
      "Svjetlostkomerc d.d. zadržava pravo izmjene i ažuriranja ove Politike kolačića u skladu sa važećim zakonima i regulativama. Sve promjene bit će objavljene na ovoj stranici.",
  },
];

const CookiePolicyPage = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, marginTop: "6rem", color: "#262626" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 900, color: "#262626" }}
      >
        Politika kolačića
      </Typography>

      {cookiePolicyData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#262626" }} gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body3" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < cookiePolicyData.length - 1 }
        </Box>
      ))}

      {/* Box za dodatne informacije */}
      <Box
        sx={{
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#262626",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ color: "#f1f1f1" }}>
          Za sva pitanja u vezi politike kolačića obratite se na mail:{" "}
          <Typography component="span" color="error" sx={{ fontWeight: "bold" }}>
            info@svjetlostkomerc.ba
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default CookiePolicyPage;
