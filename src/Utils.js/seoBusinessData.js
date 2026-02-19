const SITE_URL = "https://www.bookstore.ba";

const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "Bacici 5",
  addressLocality: "Sarajevo",
  postalCode: "71000",
  addressCountry: "BA",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Bookstore.ba",
  url: SITE_URL,
  logo: `${SITE_URL}/logofinal.svg`,
  email: "info@svjetlostkomerc.ba",
  telephone: "+38733200840",
  address: businessAddress,
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BookStore",
  "@id": `${SITE_URL}/#bookstore`,
  name: "Bookstore.ba",
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  email: "info@svjetlostkomerc.ba",
  telephone: "+38733200840",
  address: businessAddress,
  areaServed: "BA",
  priceRange: "KM",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Bookstore.ba",
  url: SITE_URL,
  inLanguage: "bs-BA",
};
