// scripts/generateSitemap.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { SitemapStream, streamToPromise } = require("sitemap");

// ✅ Use non-www as canonical
const BASE_URL = "https://bookstore.ba"; // preferred non-www domain

// Static pages
const staticPages = [
  "/",
  "/home",
  "/shop",
  "/checkout",
  "/success",
  "/payment-cancel",
  "/sign-in",
  "/sign-up",
  "/complete-profile",
  "/UsloviKupovine",
  "/Privatnost",
  "/OpštiUsloviPoslovanja",
  "/PolitikaPovrataiReklamacije",
  "/Sigurnost",
  "/PolitikaKolačića",
  "/admin"
];

// Fetch all books from API
async function fetchAllBooks() {
  const limit = 1000;
  let page = 1;
  let allBooks = [];
  let totalPages = 1;

  do {
    const res = await axios.get(
      "https://backendsvkwbshp.onrender.com/api/books",
      { params: { page, limit } }
    );

    const data = res.data;
    if (!data.books || !Array.isArray(data.books)) break;

    allBooks.push(...data.books);
    totalPages = data.totalPages || 1;
    page++;
  } while (page <= totalPages);

  return allBooks;
}

async function generateSitemap() {
  try {
    console.log("📦 Fetching books from API...");
    const books = await fetchAllBooks();
    console.log(`✅ Fetched ${books.length} books.`);

    const today = new Date().toISOString();

    const urls = [
      // Static pages
      ...staticPages.map((url) => ({
        url,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: today
      })),

      // Dynamic book pages
      ...books
        .filter((b) => b.slug)
        .map((book) => ({
          url: `/books/${book.slug}`,
          changefreq: "weekly",
          priority: 0.9,
          lastmod: book.lastmod
            ? new Date(book.lastmod).toISOString()
            : today
        }))
    ];

    // Generate sitemap
    const sitemap = new SitemapStream({ hostname: BASE_URL });
    urls.forEach((u) => sitemap.write(u));
    sitemap.end();

    const sitemapOutput = await streamToPromise(sitemap);
    const outputPath = path.resolve(__dirname, "../public/sitemap.xml");

    fs.writeFileSync(outputPath, sitemapOutput.toString());
    console.log(`🌐 sitemap.xml generated at ${outputPath}`);
    console.log("✅ All URLs use non-www canonical version!");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
    process.exit(1);
  }
}

generateSitemap();