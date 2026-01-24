import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ArticleIcon from "@mui/icons-material/Article";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import InterestsIcon from "@mui/icons-material/Interests";
import BiotechIcon from "@mui/icons-material/Biotech";
import DrawIcon from "@mui/icons-material/Draw";

const kategorije = ([
  {
    naziv: "Sve Kategorije",
    ikona: <ImportContactsIcon />,
    boja: "#2a9d8f",
  },
  {
    naziv: "Beletristika",
    ikona: <DrawIcon />,
    boja: "#9c5fe0",
    podkategorije: [
      "Roman",
      "Ljubavni roman",
      "Historijski roman",
      "Psihološki roman",
      "Triler / Krimi",
      "Drama",
      "Poezija",
      "Klasici",
      "Domaći roman",
      "Strani roman",
      "Pripovijetke i novele",
      "Humoristička književnost",
      "Mitologija",
      "Fantastika / Fantasy",
      "Naučna fantastika (Sci-Fi)",
    ],
  },
  {
    naziv: "Literatura za djecu i mlade",
    ikona: <ChildCareIcon />,
    boja: "#16a3d8",
    podkategorije: [
      "Bajke i basne",
      "Ilustrirane knjige",
      "Knjige za prve čitače",
      "Teen romani / Young Adult",
      "Edukativne knjige za djecu",
      "Stripovi",
      "Lektire", 
      "Enciklopedije i priručnici",
      "Slikovnice",
      "Vjerske knjige za djecu",
      "Bojanke"
    ],
  },
  {
    naziv: "Naučna i stručna literatura",
    ikona: <BiotechIcon />,
    boja: "#60dce8",
    podkategorije: [
      "Pravo",
      "Ekonomija i biznis",
      "Psihologija",
      "Medicina",
      "Tehnika i IT",
      "Prirodne nauke",
      "Društvene nauke",
      "Obrazovanje i pedagogija",
    ],
  },
  {
    naziv: "Publicistika",
    ikona: <ArticleIcon />,
    boja: "#8ad346",
    podkategorije: [
      "Biografije i autobiografije",
      "Eseji",
      "Putopisi",
      "Historija",
      "Filozofija",
      "Astrofizika",
      "Religija i duhovnost",
      "Politika i društvo",
    ],
  },
  {
    naziv: "Samopomoć i razvoj",
    ikona: <SelfImprovementIcon />,
    boja: "#ffb703",
    podkategorije: [
      "Lični razvoj",
      "Motivacija i uspjeh",
      "Zdravlje i wellness",
      "Mindfulness i meditacija",
      "Ljubavni i partnerski odnosi",
      "Roditeljstvo i porodica",
    ],
  },
  {
    naziv: "Kuharice i gastronomija",
    ikona: <RestaurantMenuIcon />,
    boja: "#fb8500",
    podkategorije: [
      "Nacionalna kuhinja",
      "Zdrava ishrana",
      "Vegetarijanska / veganska kuhinja",
      "Slatkiši i peciva",
    ],
  },
  {
    naziv: "Hobiji i slobodno vrijeme",
    ikona: <InterestsIcon />,
    boja: "#d64e12",
    podkategorije: [
      "Uradi sam (DIY)",
      "Umjetnost i dizajn",
      "Moda i stil",
      "Baštovanstvo",
      "Sport i fitness",
      "Putovanja i vodiči",
    ],
  },
]);
export default kategorije;







