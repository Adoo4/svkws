// TermsAndConditionsPage.jsx
import React, { useEffect } from "react";
import { Typography, Box, Divider } from "@mui/material";

const termsData = [
  {
    title: "1. Opis proizvoda/usluga",
    content:
      "Svaki artikal u našoj ponudi prikazan je s detaljnim informacijama iz baze podataka. Korisnik može vidjeti naziv proizvoda, ime autora, kratak opis sadržaja i tematike, kategoriju i podkategoriju (npr. 'Beletristika / Ljubavni roman'), format izdanja (Paperback, Hardcover ili eBook), jezik izdanja, godinu izdavanja, izdavača i broj stranica. Svaka knjiga ima svoj jedinstveni ISBN broj, a novo izdanje je posebno označeno. Glavna fotografija prikazuje naslovnicu knjige. Cijena je izražena u KM s uračunatim PDV-om, a ukoliko postoji popust, prikazuje se postotak popusta i nova cijena, uključujući datum do kada popust vrijedi.",
  },
  {
    title: "2. Postupak naručivanja",
    content:
      "Korisnik naručuje proizvode putem elektronskog obrasca za narudžbu. Naručivanje se smatra potvrđenim kada korisnik popuni sve obavezne podatke i pošalje narudžbu. Dodavanje proizvoda u korpu inicira proces narudžbe. Svaka narudžba se vodi kroz korake plaćanja i potvrde narudžbe.",
  },
  {
    title: "3. Način plaćanja",
    content:
      "Plaćanje se vrši kreditnom karticom (Visa, Visa Electron, MasterCard, Maestro) ili pouzećem prilikom dostave. Plaćanje kreditnom karticom izvršava se odmah prilikom potvrde narudžbe.",
  },
  {
    title: "4. Dostava",
    content:
      "Naručeni proizvodi se pakiraju tako da tokom transporta ne budu oštećeni. Kupac je dužan provjeriti stanje pošiljke prilikom preuzimanja i odmah reklamirati eventualna oštećenja dostavljaču. Ukoliko kupac ne primi pošiljku u očekivanom roku, može kontaktirati prodavca radi pronalaska ili slanja zamjenske pošiljke. Pošiljka se šalje u roku od 5 radnih dana nakon potvrde plaćanja.",
  },
  {
    title: "5. Reklamacije i povrat robe",
    content:
      "Kupac ima pravo reklamacije u slučaju tehničkih ili transportnih nedostataka proizvoda. Reklamacije se podnose u roku od 4 radna dana od prijema proizvoda, a zamjenski proizvod se šalje u roku od 3 radna dana. U slučaju tehničkih problema s digitalnim proizvodom, kupac je dužan reklamirati proizvod u istom roku. Povrat sredstava nije moguć za digitalne proizvode ukoliko su tehnički ispravni.",
  },
  {
    title: "6. Zaštita podataka i privatnost",
    content:
      "Webshop poštuje privatnost korisnika i štiti sve lične podatke u skladu sa važećim zakonima. Podaci korisnika koriste se isključivo u svrhu obrade narudžbi i pružanja podrške. Podaci se ne dijele trećim stranama bez izričitog pristanka korisnika.",
  },
  {
    title: "7. Odgovornost",
    content:
      "Prodavac ne snosi odgovornost za štetu nastalu nepravilnom upotrebom proizvoda ili nepoštivanjem uputa. Webshop nije odgovoran za kašnjenja u dostavi izazvana vanjskim faktorima ili trećim stranama.",
  },
  {
    title: "8. Prava potrošača",
    content:
      "Kupac ima prava prema važećim zakonima o zaštiti potrošača, uključujući povrat proizvoda, reklamaciju i odustajanje od kupovine u zakonski predviđenom roku. Webshop omogućava transparentan i jednostavan postupak ostvarivanja prava potrošača.",
  },
  {
    title: "9. Zaštita autorskih prava",
    content:
      "Sva prava izdavača i vlasnika programa na snimljenim i štampanim radovima su zadržana. Kupac je dužan ne reprodukovati, ne koristiti u emitovanju, i ne prodavati proizvode bez odobrenja prodavca.",
  },
  {
    title: "10. Opšte odredbe",
    content:
      "Prodavac zadržava pravo izmjene uvjeta i pravila korištenja webshopa. Kupac je odgovoran za tačnost podataka unesenih prilikom kupovine. Troškovi pristupa internetu i korištenja računalne opreme nisu uključeni u cijenu usluga. Prodavac ne garantuje da će usluge uvijek biti dostupne bez grešaka, ali korisnik može prijaviti greške na info@COMPANY.com radi ispravke.",
  },
];

const TermsAndConditionsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, marginTop: "6rem", color: "#262626" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 900, color: "#262626" }}
      >
        Uslovi kupovine
      </Typography>

      {termsData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#262626" }} gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body2" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < termsData.length - 1 }
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

export default TermsAndConditionsPage;
