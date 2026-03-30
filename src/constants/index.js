// src/constants/index.js
export const CURRENCY = "INR";
export const MAX_PRICE = 5000;
export const SHIPPING_THRESHOLD = 5000;
export const SHIPPING_COST = 80;
export const FREE_SHIPPING_CITY = "Sagwara";
// Category keys (UI-facing names preserved)
export const CATEGORY_KEYS = {
  ALL: "All",
  BRACELETS: "Bracelets",
  NECKLACES: "Necklaces",
  EARRINGS: "Earrings",
  RINGS: "Rings",
  WATCHES: "Watches",
};
const variantExample = [
  {
    style: "Gold Plated",
    images: ["/images/gold-default.jpg"],
    colors: [
      {
        color: "Ruby Red",
        images: ["/images/gold-red-1.jpg", "/images/gold-red-2.jpg"],
      },
      {
        color: "Emerald Green",
        images: ["/images/gold-green-1.jpg"],
      },
    ],
  },
  {
    style: "Sterling Silver",
    colors: [
      {
        color: "Classic Silver",
        images: ["/images/silver-1.jpg"],
      },
    ],
  },
  {
    style: "Rose Gold",
    images: ["/images/rose-gold-only.jpg"],
    /* No colors array here - will only show Style option */
  },
  {
    color: "Midnight Blue",
    images: ["/images/blue-direct.jpg"],
    /* No style key here - will show Color option directly */
  },
];
