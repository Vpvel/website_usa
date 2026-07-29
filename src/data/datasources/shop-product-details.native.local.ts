import type { ShopProductDetails } from "@/domain/entities/shop-product";

/** Category-level Native Starch overview used on category pages and fallbacks. */
export const nativeStarchCategoryDetails = {
  overview:
    "Native Starch is a natural food-grade starch extracted from premium plant sources. It provides excellent thickening, binding, moisture retention, and texture enhancement while maintaining clean-label functionality. It is widely used in bakery, dairy, confectionery, sauces, snacks, and processed foods.",
  features: [
    "100% Natural",
    "Food Grade",
    "Clean Label",
    "Plant Based",
    "High Purity",
    "Excellent Thickening",
    "Neutral Taste",
    "Superior Texture",
  ],
  applications: [
    "Bakery Products",
    "Dairy Products",
    "Sauces & Dressings",
    "Confectionery",
    "Snacks",
    "Meat Processing",
    "Instant Foods",
  ],
  specifications: [
    { property: "Source", value: "Natural Plant Starch" },
    { property: "Appearance", value: "White Powder" },
    { property: "Moisture", value: "≤13%" },
    { property: "Shelf Life", value: "24 Months" },
    { property: "Packaging", value: "25 kg" },
    { property: "Storage", value: "Cool & Dry Place" },
  ],
} satisfies ShopProductDetails;

export const nativeStarchProductDetails: Record<string, ShopProductDetails> = {
  "tapioca-starch": {
    overview:
      "Tapioca Starch is extracted from high-quality cassava roots and offers excellent viscosity, smooth texture, transparency, and process stability. It is ideal for food manufacturers seeking premium-quality starch with superior performance.",
    features: [
      "High Viscosity",
      "Smooth Texture",
      "Excellent Water Binding",
      "Freeze-Thaw Stable",
      "Neutral Flavour",
      "Gluten Free",
      "Vegan Friendly",
    ],
    applications: [
      "Bakery",
      "Noodles",
      "Dairy",
      "Sauces",
      "Frozen Foods",
      "Confectionery",
      "Snacks",
      "Ready Meals",
    ],
    specifications: [
      { property: "Botanical Source", value: "Cassava" },
      { property: "Appearance", value: "White Powder" },
      { property: "Moisture", value: "≤13%" },
      { property: "pH", value: "5.5–7.5" },
      { property: "Shelf Life", value: "24 Months" },
      { property: "Packaging", value: "25 kg" },
    ],
  },
  "angel-cws-ts-native": {
    overview:
      "Angel CWS TS is a Cold Water Soluble Tapioca Starch specially developed for instant food processing. It disperses rapidly without heating while providing excellent viscosity, creamy mouthfeel, and superior processing stability.",
    features: [
      "Cold Water Soluble",
      "Instant Hydration",
      "Smooth Texture",
      "Excellent Stability",
      "High Process Tolerance",
      "Easy Dispersion",
      "Clean Label",
    ],
    applications: [
      "Instant Soups",
      "Beverage Mixes",
      "Dairy Products",
      "Salad Dressings",
      "Sauces",
      "Instant Desserts",
      "Ready-to-Eat Foods",
    ],
    specifications: [
      { property: "Type", value: "Cold Water Soluble Tapioca Starch" },
      { property: "Appearance", value: "White Powder" },
      { property: "Solubility", value: "Cold Water" },
      { property: "Shelf Life", value: "24 Months" },
      { property: "Packaging", value: "25 kg" },
    ],
  },
  "sweet-potato-starch": {
    overview:
      "Sweet Potato Starch is manufactured from carefully selected sweet potatoes and delivers outstanding clarity, high viscosity, excellent elasticity, and freeze-thaw stability. It is widely used in premium food products.",
    features: [
      "Excellent Transparency",
      "High Viscosity",
      "Smooth Mouthfeel",
      "Strong Water Binding",
      "Freeze-Thaw Stability",
      "High Purity",
    ],
    applications: [
      "Glass Noodles",
      "Meat Products",
      "Bakery",
      "Sauces",
      "Desserts",
      "Frozen Foods",
      "Snacks",
    ],
    specifications: [
      { property: "Botanical Source", value: "Sweet Potato" },
      { property: "Appearance", value: "White Powder" },
      { property: "Moisture", value: "≤13%" },
      { property: "Shelf Life", value: "24 Months" },
      { property: "Packaging", value: "25 kg" },
    ],
  },
  "orange-sweet-potato-flour": {
    overview:
      "Orange Sweet Potato Flour is a naturally nutritious flour rich in dietary fibre and beta-carotene. It enhances colour, flavour, and nutritional value while improving texture in bakery and functional food applications.",
    features: [
      "Rich in Beta-Carotene",
      "High Fibre",
      "Natural Colour",
      "Gluten Free",
      "Plant Based",
      "Nutrient Rich",
    ],
    applications: [
      "Bakery",
      "Biscuits",
      "Cakes",
      "Healthy Snacks",
      "Baby Foods",
      "Functional Foods",
      "Nutritional Products",
    ],
    specifications: [
      { property: "Source", value: "Orange Sweet Potato" },
      { property: "Appearance", value: "Fine Orange Powder" },
      { property: "Shelf Life", value: "24 Months" },
      { property: "Packaging", value: "25 kg" },
      { property: "Storage", value: "Cool & Dry Place" },
    ],
  },
  "potato-starch-13m": {
    overview:
      "Potato Starch 13M is a premium-quality food starch known for its exceptional water-binding capacity, smooth texture, high viscosity, and excellent thickening properties. It performs well in demanding food processing applications.",
    features: [
      "High Water Binding",
      "Excellent Thickening",
      "Smooth Texture",
      "Neutral Taste",
      "High Process Stability",
      "Freeze-Thaw Resistant",
    ],
    applications: [
      "Meat Products",
      "Dairy Products",
      "Soups",
      "Sauces",
      "Instant Foods",
      "Bakery",
      "Processed Foods",
    ],
    specifications: [
      { property: "Botanical Source", value: "Potato" },
      { property: "Appearance", value: "White Powder" },
      { property: "Moisture", value: "≤13%" },
      { property: "Shelf Life", value: "24 Months" },
      { property: "Packaging", value: "25 kg" },
      {
        property: "Storage",
        value: "Store in a cool, dry, well-ventilated place",
      },
    ],
  },
};
