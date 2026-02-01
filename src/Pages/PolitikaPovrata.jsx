import { Box, Typography, Divider } from "@mui/material";

const returnRefundData = [
  {
    title: "1. Pravo na povrat i reklamaciju",
    content:
      "Kupac ima pravo na povrat i reklamaciju proizvoda u skladu sa važećim zakonima o zaštiti potrošača Bosne i Hercegovine. Povrat je moguć ukoliko proizvod nije u skladu sa opisom, ukoliko je oštećen ili neispravan."
  },
  {
    title: "2. Uslovi za povrat",
    content:
      "Da bi ostvario pravo na povrat, kupac je obavezan sačuvati dokaz o kupovini (račun ili potvrdu narudžbe) i obavijestiti nas putem e-maila u roku od 14 dana od prijema pošiljke. Proizvod treba biti vraćen u originalnom pakovanju, bez znakova korištenja, osim ako je razlog povrata oštećenje ili neispravnost."
  },
  {
    title: "3. Oštećenja tokom transporta",
    content:
      "Ako je pošiljka uručena, ali su artikli oštećeni u transportu, molimo kupca da nas odmah kontaktira putem e-maila i dostavi fotografije oštećenja. Na osnovu dostavljenih dokaza, webshop će pokrenuti postupak reklamacije."
  },
  {
    title: "4. Troškovi povrata",
    content:
      "Troškove povrata snosi webshop, osim u situacijama kada proizvod nije oštećen niti neispravan, već se povrat vrši iz subjektivnih razloga kupca (npr. nezadovoljstvo proizvodom, pogrešan odabir i sl.)."
  },
  {
    title: "5. Povrat novca",
    content:
      "Povrat sredstava se vrši nakon što webshop zaprimi i pregleda vraćeni proizvod, a najkasnije u roku od 14 radnih dana. Sredstva se vraćaju na isti način na koji je izvršeno plaćanje, osim ako nije drugačije dogovoreno sa kupcem."
  },
  {
    title: "6. Kontakt za reklamacije",
    content:
      "Za sve dodatne informacije i potrebe vezane za povrat i reklamacije, kupac se može obratiti na e-mail: info@svjetlostkomerc.ba"
  }
];

const ReturnRefundPolicyPage = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, marginTop: "6rem", color: "#262626" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 900, color: "#262626" }}
      >
        Politika povrata i reklamacija
      </Typography>

      {returnRefundData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#262626" }} gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body3" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < returnRefundData.length - 1 }
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
          textAlign: "center"
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

export default ReturnRefundPolicyPage;
