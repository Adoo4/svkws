import { Box, Typography } from "@mui/material";

const paymentSecurityData = [
  {
    title: "1. Sigurnost online plaćanja",
    content:
      "Svjetlostkomerc d.d. koristi najsavremenije sigurnosne standarde za zaštitu Vaših podataka prilikom online plaćanja. Svi podaci koje unosite prilikom plaćanja (broj kartice, datum isteka, CVV kod) prenose se putem sigurne SSL konekcije i nisu dostupni neovlaštenim trećim stranama.",
  },
  {
    title: "2. 3D Secure zaštita",
    content:
      "Online plaćanja putem našeg webshopa dodatno su osigurana kroz Verified by Visa i MasterCard SecureCode (3D Secure program). Ovaj sistem autentifikacije garantuje da transakciju može izvršiti isključivo vlasnik kartice, što značajno smanjuje mogućnost zloupotrebe.",
  },
  {
    title: "3. Obrada podataka o kartici",
    content:
      "Svjetlostkomerc d.d. ne pohranjuje podatke o Vašim karticama. Plaćanje se vrši preko zaštićenog sistema partnerske banke, koja vrši autorizaciju i naplatu. Na ovaj način osiguravamo maksimalnu sigurnost i povjerenje naših korisnika.",
  },
  {
    title: "4. Zaštita ličnih podataka",
    content:
      "Svi lični podaci koje nam dostavite prilikom kupovine obrađuju se u skladu sa Zakonom o zaštiti ličnih podataka BiH. Podaci se koriste isključivo u svrhu realizacije narudžbe i neće biti dijeljeni s trećim stranama bez Vaše saglasnosti.",
  },
  {
    title: "5. Transparentnost i povjerenje",
    content:
      "Naš cilj je da Vam omogućimo sigurnu, brzu i pouzdanu kupovinu. Ukoliko imate bilo kakvih pitanja ili sumnji u vezi sigurnosti plaćanja, slobodno nas kontaktirajte kako bismo Vam pružili sve potrebne informacije.",
  },
  {
    title: "6. Sigurnost plaćanja kreditnim karticama",
    content:
      `Poverljivost Vaših podataka je zaštićena korištenjem najnovije verzije TLS enkripcije. Online stranice za naplatu su osigurane korištenjem Secure Socket Layer (SSL) protokola sa 128-bitnom enkripcijom podataka. SSL enkripcija štiti podatke od neovlaštenog pristupa tokom njihove transmisije.\n
Ovo omogućava siguran transfer podataka i sprečava neovlašteni pristup tokom komunikacije između korisnika i Monri WebPay Payment Gateway-a i obrnuto.\n
Monri WebPay Payment Gateway i finansijske institucije razmenjuju podatke koristeći svoj virtualni privatni mrežni (VPN) kanal, koji je takođe zaštićen od neovlaštenog pristupa.\n
Monri Payments je PCI DSS Level 1 sertifikovan provajder platnih usluga regulisan od strane Visa i Mastercard pravila.\n
Brojevi kreditnih kartica se ne pohranjuju kod trgovca i nisu dostupni neovlašćenim osobama.`,
  },
];

const PaymentSecurityPage = () => {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 3,
        marginTop: "6rem",
        color: "#262626",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 900, color: "#262626" }}
      >
        Sigurnost plaćanja
      </Typography>

      {paymentSecurityData.map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#262626" }}
            gutterBottom
          >
            {item.title}
          </Typography>
          <Typography variant="body2" whiteSpace="pre-line">
            {item.content}
          </Typography>
          {index < paymentSecurityData.length - 1 }
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
          Za sva pitanja u vezi sigurnosti plaćanja obratite se na mail:{" "}
          <Typography component="span" color="error" sx={{ fontWeight: "bold" }}>
            info@svjetlostkomerc.ba
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentSecurityPage;
