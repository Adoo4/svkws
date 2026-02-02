import kategorije from "./kategorije";
export const kategorijeMap = {};
kategorije.forEach(k => {
  kategorijeMap[k.naziv.toLowerCase()] = k;
  k.podkategorije?.forEach(sub => {
    kategorijeMap[sub.toLowerCase()] = k;
  });
});