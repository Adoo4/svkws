// Utils/SEO.js
import React from "react";
import { Helmet } from "react-helmet";

const normalizeCanonical = (rawUrl) => {
  if (!rawUrl) return "";

  try {
    const parsed = new URL(rawUrl, window.location.origin);
    const canonical = `${parsed.origin}${parsed.pathname}`;
    return canonical.endsWith("/") && canonical.length > parsed.origin.length + 1
      ? canonical.slice(0, -1)
      : canonical;
  } catch {
    return rawUrl;
  }
};

const SEO = ({
  title,
  description,
  url,
  ogImage,
  type = "website",
  jsonLd,
  keywords,
  noindex = false,
}) => {
  const canonicalUrl = normalizeCanonical(url);

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="Bosnian" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="bs_BA" />
      <meta property="og:locale:alternate" content="hr_BA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="bs-BA" href={canonicalUrl} />
      <link rel="alternate" hrefLang="hr-BA" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
