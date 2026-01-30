// PrivacyPolicyPage.jsx
import React from "react";
import { Typography, Box, Divider } from "@mui/material";

const privacyData = [
  {
    title: "1. Prikupljanje podataka",
    content:
      "Webshop prikuplja lične podatke korisnika, uključujući ime, prezime, adresu, e-mail i broj telefona, isključivo u svrhu obrade narudžbi, dostave proizvoda i pružanja korisničke podrške.",
  },
  {
    title: "2. Korištenje podataka",
    content:
      "Podaci korisnika koriste se isključivo za izvršenje ugovora, komunikaciju s korisnikom, slanje informacija o proizvodima i promocijama samo uz izričit pristanak korisnika.",
  },
  {
    title: "3. Zaštita podataka",
    content:
      "Webshop primjenjuje odgovarajuće tehničke i organizacijske mjere zaštite podataka kako bi spriječio neovlašten pristup, izmjenu ili brisanje podataka korisnika.",
  },
  {
    title: "4. Dijeljenje podataka",
    content:
      "Podaci korisnika se ne dijele trećim stranama bez izričitog pristanka, osim kada je to potrebno radi izvršenja ugovora (npr. dostavna služba) ili kada je to zakonski obavezno.",
  },
  {
    title: "5. Prava korisnika",
    content:
      "Korisnici imaju pravo pristupa svojim podacima, pravo na ispravku, brisanje ili ograničenje obrade, pravo na prigovor i pravo prenosa podataka. Za ostvarivanje prava, korisnik se može obratiti na naš kontakt e-mail.",
  },
  {
    title: "6. Kolačići (Cookies)",
    content:
      "Webshop koristi kolačiće radi poboljšanja funkcionalnosti web stranice, analitike i personalizacije ponude. Korisnik može upravljati kolačićima putem postavki svog pretraživača.",
  },
  {
    title: "7. Promjene politike privatnosti",
    content:
      "Webshop zadržava pravo izmjene ove politike privatnosti. Sve promjene objavljuju se na web stranici, a preporučuje se korisnicima da povremeno provjere politiku privatnosti.",
  },
  {
    title: "8. Izjava o privatnosti i zaštiti ličnih podataka",
    content:
      `Webshop omogućava korisnicima da odbiju učestvovanje u marketinškim kampanjama i da ne pristanu na otkrivanje svojih ličnih podataka trećim stranama.\n
Obavezujemo se da ćemo prikupljati samo osnovne informacije potrebne za ispunjenje naših obaveza prema kupcima. Informišemo korisnike o načinu prikupljanja informacija i redovno im dajemo mogućnost da odluče kako će se njihove informacije koristiti, uključujući i mogućnost da njihovo ime bude uključeno ili izostavljeno sa marketinških lista.\n
Sve informacije o korisnicima su strogo zaštićene i dostupne samo zaposlenima kojima su potrebne za obavljanje poslova.\n
Svi naši zaposleni i poslovni partneri odgovorni su za pridržavanje principa zaštite povjerljivosti podataka.`,
  },
];

const PrivacyPolicyPage = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, marginTop: "6rem", color: "#262626" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 900, color: "#262626" }}
      >
        Politika privatnosti
      </Typography>

      {privacyData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#262626" }} gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body2" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < privacyData.length - 1 }
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
          Za sve dodatne informacije i potrebe slobodno se obratite na mail:{" "}
          <Typography component="span" color="error" sx={{ fontWeight: "bold" }}>
            info@svjetlostkomerc.ba
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicyPage;
