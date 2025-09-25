// TermsAndConditionsPage.jsx
import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import {useEffect} from "react"

const termsData = [
  {
    title: "1. Opis proizvoda/usluga",
    content:
      "Svaki artikal u našoj ponudi prikazan je s detaljnim informacijama iz baze podataka. Korisnik može vidjeti naziv proizvoda, ime autora, kratak opis sadržaja i tematike, kategoriju i podkategoriju (npr. 'Beletristika / Ljubavni roman'), format izdanja (Paperback, Hardcover ili eBook), jezik izdanja, godinu izdavanja, izdavača i broj stranica. Svaka knjiga ima svoj jedinstveni ISBN broj, a novo izdanje je posebno označeno. Glavna fotografija prikazuje naslovnicu knjige. Cijena je izražena u KM s uračunatim PDV-om, a ukoliko postoji popust, prikazuje se postotak popusta i nova cijena, uključujući datum do kada popust vrijedi.",
  },
  {
    title: "2. Postupak naručivanja",
    content:
      "Korisnik pregledava knjige prikazane u obliku kartica koje sadrže naslov, kategoriju, kratak opis, cijenu i eventualni popust. Svaka kartica omogućava nekoliko brzih i intuitivnih akcija:\n- Dodavanje u korpu – klikom na dugme 'Dodaj', knjiga se odmah stavlja u korpu. Ako je knjiga već u korpi, količina se automatski povećava, a popusti se primjenjuju odmah. Dugme je aktivno samo za prijavljene korisnike.\n- Brzi pregled – klikom na sliku knjige otvara se prozor sa osnovnim informacijama: autor i kratak opis knjige.\n- Lista želja – klikom na ikonu srca, knjiga se dodaje na listu želja za kasniju kupovinu; ikona jasno pokazuje status knjige.\n- Detalji – klikom na dugme 'Detalji', korisnik može vidjeti sve informacije o knjizi, uključujući kategorije, cijenu i popuste, te odlučiti o nastavku kupovine.\n\nDodavanjem knjige u korpu, korisnik započinje proces naručivanja. Klikom na ikonu korpe može pregledati odabrane proizvode i nastaviti do završetka kupovine, gdje se vodi kroz korake plaćanja i potvrde narudžbe.",
  },
  {
    title: "3. Način plaćanja",
    content:
      "Plaćanje se vrši kreditnom karticom (Visa Clasic, Visa Electron, MasterCard, Maestro) odmah prilikom narudžbe.",
  },
  {
    title: "4. Dostava",
    content:
      "Svi proizvodi naručeni putem webshopa dostavljaju se na adresu koju korisnik navede prilikom narudžbe. Vrijeme isporuke ovisi o dostupnosti proizvoda i odabranoj opciji dostave. Korisnik dobija obavijest o predviđenom vremenu dostave i praćenju pošiljke. Troškovi dostave prikazuju se prije potvrde narudžbe.\n\nRoba se pakuje tako da tokom transporta ne bude oštećena. Prilikom preuzimanja, kupac je dužan provjeriti stanje pošiljke i u slučaju oštećenja odmah reklamirati proizvod dostavljaču.",
  },
  {
    title: "5. Otkazivanje narudžbe",
    content:
      "Korisnik može otkazati narudžbu dok roba nije proslijeđena na dostavu. Otkazivanje se vrši putem korisničkog računa ili kontaktom sa službom za korisnike. Nakon otkazivanja, ukoliko je plaćanje već izvršeno, sredstva se vraćaju na isti način plaćanja u najkraćem mogućem roku.",
  },
  {
    title: "6. Reklamacije i povrat robe",
    content:
      "Molimo Vas da prije potvrde narudžbe provjerite ispravnost e-mail i poštanske adrese, jer webshop ne snosi odgovornost za netačne podatke.\n\nPošiljke se šalju bez osiguranja, a eventualna kašnjenja ili oštećenja nastala tokom transporta su odgovornost poštanskog servisa.\n\nUkoliko paket stigne oštećen, kontaktirajte nas što prije s detaljnim opisom problema i fotografijama artikala kako bismo pronašli odgovarajuće rješenje.",
  },
  {
    title: "7. Zaštita podataka i privatnost",
    content:
      "Webshop poštuje privatnost korisnika i štiti sve lične podatke u skladu sa važećim zakonima. Podaci korisnika koriste se isključivo u svrhu obrade narudžbi, slanja informacija o proizvodima i pružanja podrške. Podaci se ne dijele trećim stranama bez izričitog pristanka korisnika.",
  },
  {
    title: "8. Odgovornost",
    content:
      "Webshop ne snosi odgovornost za štetu nastalu nepravilnom upotrebom proizvoda ili nepoštivanjem uputa. Također, webshop ne odgovara za kašnjenje dostave izazvano vanjskim faktorima izvan kontrole, poput prijevoznika ili nepovoljnih vremenskih uvjeta. Svi napori se ulažu da se korisniku omogući sigurna i pravovremena usluga.",
  },
  {
    title: "9. Prava potrošača",
    content:
      "Korisnik ima sva prava koja mu pripadaju prema važećim zakonima o zaštiti potrošača, uključujući pravo na povrat proizvoda, reklamaciju i odustajanje od kupovine u zakonski predviđenom roku. Webshop osigurava transparentan i jednostavan postupak ostvarivanja prava potrošača.",
  },
];

const TermsAndConditionsPage = () => {

    useEffect(() => {
   window.scrollTo({
      top: 0,          // scroll to top
      behavior: "smooth" // optional smooth scroll
  })}, [])
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, marginTop:"6rem", color:"#262626" }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{fontWeight:900, color:"#262626"}}>
        Uslovi kupovine
      </Typography>
      {termsData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{fontWeight:800, color:"#262626"}} gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body3" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < termsData.length - 1 && <Divider sx={{ mt: 3 }} />}
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
        <Typography variant="body5" sx={{color:"#f1f1f1"}}>
          Za sve dodatne informacije i potrebe slobodno se obratite na mail:{" "}
          <Typography
            component="span"
            color="error"
            sx={{ fontWeight: "bold" }}
          >
            info@svjetlostkomerc.ba
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsAndConditionsPage;
