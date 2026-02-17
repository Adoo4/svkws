const USE_PROXY = process.env.REACT_APP_USE_IMAGE_PROXY !== "false";
const DEFAULT_QUALITY = 70;

const isLocalAsset = (url) => !url || url.startsWith("/") || url.startsWith("data:");

export const toHttpsUrl = (url) => {
  if (!url) return "";
  if (isLocalAsset(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return url.replace(/^http:\/\//i, "https://");
};

export const getImageUrl = (url, { width, quality = DEFAULT_QUALITY } = {}) => {
  const normalized = toHttpsUrl(url);
  if (!normalized || isLocalAsset(normalized) || !USE_PROXY) return normalized;

  const stripped = normalized.replace(/^https?:\/\//i, "");
  const params = new URLSearchParams({
    url: stripped,
    output: "webp",
    q: String(quality),
  });

  if (width) params.set("w", String(width));

  return `https://images.weserv.nl/?${params.toString()}`;
};

export const getImageSrcSet = (url, widths = [160, 240, 320, 480, 640]) => {
  const normalized = toHttpsUrl(url);
  if (!normalized || isLocalAsset(normalized) || !USE_PROXY) return undefined;

  return widths.map((w) => `${getImageUrl(url, { width: w })} ${w}w`).join(", ");
};
