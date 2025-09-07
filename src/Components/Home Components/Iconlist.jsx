import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Box, Typography } from '@mui/material';






let Iconlist = () => {
  return (
    <Box sx={{minHeight:"30lvh", display:"flex", flexDirection:{xs:"column", lg:"row"}, alignItems:"center", justifyContent:"space-evenly", color:"white", backgroundColor:"black", padding:"4rem 1rem", gap:"2rem"}}>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",  width:{xs:"100%", md:"80%"}, gap:"1rem", color:"gray"}}>
      <HandshakeIcon sx={{ fontSize: {xs:40, md:60} }} />
        <Box>
        <Typography sx={{fontWeight:"bold"}}>POVJERENJE</Typography>
        <Typography sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"} }}> Svjetlostkomerc je kompanija sa dugom tradicijom i povjerenjem koje traje već 80 godina. Kroz decenije poslovanja, izgradili smo reputaciju kao pouzdani partner u trgovini, nudeći proizvode vrhunskog kvaliteta koji su zadovoljili generacije naših kupaca. Naša tradicija se temelji na stalnom usmjerenju prema kvaliteti, inovacijama i usluzi koja osigurava zadovoljstvo svakog kupca.</Typography>
        </Box>
      </Box>

      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",  width:{xs:"100%", md:"80%"}, gap:"1rem", color:"gray"}}>
      <WorkspacePremiumIcon sx={{ fontSize: {xs:40, md:60} }} />
        <Box>
        <Typography sx={{fontWeight:"bold"}}>KVALITET KOJI TRAJE</Typography>
        <Typography sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"} }}>Svjetlostkomerc je kompanija koja se već dugi niz godina posvećuje nabavci vrhunskih proizvoda, pažljivo odabranih od naših pouzdanih dobavljača. Iako ne proizvodimo robu, naš glavni cilj je osigurati najkvalitetnije artikle koji zadovoljavaju visoke standarde i ispunjavaju potrebe naših kupaca. Kroz dugogodišnje poslovanje, izgradili smo čvrste i partnerske veze s dobavljačima koji dijele našu posvećenost kvalitetu.</Typography>
        </Box>
      </Box>

      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",  width:{xs:"100%", md:"80%"}, gap:"1rem", color:"gray"}}>
      <VerifiedUserIcon sx={{ fontSize: {xs:40, md:60} }} />
        <Box >
        <Typography sx={{fontWeight:"bold"}}>SIGURNOST I POUZDANOST</Typography>
        <Typography sx={{ fontSize: {xs:"0.7rem", md:"0.8rem"} }}>Svjetlostkomerc je sinonim za sigurnost i pouzdanost. Naša kompanija se posvećuje pružanju proizvoda koji su provjereni i sigurni za svakodnevnu upotrebu. Kroz godine iskustva, izgradili smo reputaciju kompanije kojoj kupci mogu vjerovati, jer se uvijek oslanjamo na dugoročne, sigurne odnose s našim dobavljačima. Naša posvećenost kvalitetu i sigurnosti osigurava da svaki proizvod koji nudimo bude pouzdan izbor za naše kupce.</Typography>
        </Box>
      </Box>
    </Box>
  );
};


export default Iconlist