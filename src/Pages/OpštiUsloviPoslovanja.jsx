import { Box, Typography } from "@mui/material";

const termsConditionsData = [
  {
    title: "1. Opšti uslovi korištenja",
    content:
      "Ovi Opšti uslovi poslovanja regulišu korištenje webshopa, prava i obaveze korisnika i webshopa, kao i uslove kupovine i zaštite potrošača. Korištenjem webshopa, korisnik prihvata navedene uslove u cijelosti. Webshop zadržava pravo izmjene uslova u bilo kojem trenutku, a izmjene stupaju na snagu objavom na stranici.",
  },
  {
    title: "2. Prava i obaveze korisnika",
    content:
      "Korisnik se obavezuje da će webshop koristiti isključivo u skladu sa važećim zakonima i ovim uslovima. Zabranjeno je neovlašteno kopiranje sadržaja, zloupotreba sistema ili naručivanje proizvoda s netačnim podacima. Korisnik je odgovoran za tačnost podataka koje dostavlja prilikom registracije i narudžbi.",
  },
  {
    title: "3. Prava i obaveze webshopa",
    content:
      "Webshop je obavezan da proizvode prikaže sa tačnim i potpunim informacijama, te da obradi narudžbe u skladu s navedenim uslovima kupovine. Webshop nije odgovoran za prekide u radu stranice nastale tehničkim problemima, vanrednim okolnostima ili višom silom, ali će nastojati pravovremeno obavijestiti korisnike o svakoj smetnji.",
  },
  {
    title: "4. Uslovi kupovine",
    content:
      "Uslovi kupovine predstavljaju sastavni dio ovih Opštih uslova poslovanja i detaljno definišu postupak naručivanja, plaćanja, dostave, reklamacija i prava potrošača.",
  },
  {
    title: "5. Intelektualno vlasništvo",
    content:
      "Svi sadržaji objavljeni na webshopu, uključujući tekstove, fotografije, logotipe, grafička rješenja i baze podataka, zaštićeni su autorskim i srodnim pravima. Njihovo neovlašteno korištenje predstavlja povredu prava intelektualnog vlasništva.",
  },
  {
    title: "6. Ograničenje odgovornosti",
    content:
      "Webshop ne snosi odgovornost za eventualnu štetu koja može nastati korisniku korištenjem webshopa, osim u slučajevima kada je ista rezultat namjere ili grube nepažnje webshopa. U slučaju spora, primjenjuje se zakon Bosne i Hercegovine, a nadležni su sudovi prema sjedištu webshopa.",
  },
  {
    title: "7. Završne odredbe",
    content:
      "Ovi Opšti uslovi poslovanja primjenjuju se od dana objave na webshopu i važe do njihove izmjene ili opoziva. U slučaju da pojedine odredbe postanu nevažeće, to ne utiče na valjanost ostalih odredbi.",
  },
];

const TermsConditionsPage = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, marginTop: "6rem", color: "#262626" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 900, color: "#262626" }}
      >
        Opšti uslovi poslovanja
      </Typography>

      {termsConditionsData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#262626" }} gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body3" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < termsConditionsData.length - 1 }
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

export default TermsConditionsPage;
