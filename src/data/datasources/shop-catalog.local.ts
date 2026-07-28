import type { ShopCatalog, ShopProduct } from "@/domain/entities/shop-product";

const SOURCE = "https://www.indiamart.com/angelfoodstarch/";

const img = {
  potato: "/images/product_starch/PotatoProteinIsolate.webp",
  sweetPotato: "/images/product_starch/8f2a6eb2-7454-4db1-a202-1a1d5c815168.webp",
  cassava: "/images/product_starch/cassavaflourbag.webp",
  cassavaAlt: "/images/product_starch/cassava_flour_pack.webp",
  corn: "/images/product_starch/cornmaltodextrinpack.webp",
  tapioca: "/images/product_starch/tapiocamaltodextrinpack_a27d5209-720e-4f33-95e9-fd063bb9ffaf.webp",
};

function product(
  partial: Omit<ShopProduct, "currency" | "minOrderKg" | "packaging" | "href" | "sourceUrl"> &
    Partial<Pick<ShopProduct, "minOrderKg" | "packaging" | "sourceUrl">>,
): ShopProduct {
  return {
    currency: "USD",
    minOrderKg: 25,
    packaging: "25 kg bags",
    sourceUrl: SOURCE,
    ...partial,
    href: `/shop#${partial.id}`,
  };
}

const bakeryProducts: ShopProduct[] = [
  product({
    id: "bakery-stathick-ps-e1414",
    name: "Modified Starch E1414 Acetylated Distarch Phosphate Potato Starch – StaThick PS",
    shortName: "StaThick PS (E1414)",
    summary:
      "Acetylated distarch phosphate potato starch for bakery thickening, binding, and water holding.",
    pricePerKg: 1.65,
    category: "bakery-modified-starch",
    imageSrc: img.sweetPotato,
    packaging: "25 kg moisture-proof paper bags",
  }),
  product({
    id: "bakery-corn-starch-7m",
    name: "Corn Starch 7M for Bakery, Dairy, Confectionery and Beverage Products",
    shortName: "Corn Starch 7M",
    summary:
      "Plant-based corn starch for bakery, dairy, confectionery, and beverage applications.",
    pricePerKg: 0.85,
    category: "bakery-modified-starch",
    imageSrc: img.corn,
    packaging: "25/50 kg PP bags with moisture-proof liner",
  }),
  product({
    id: "bakery-frujix",
    name: "Physically Modified Starch FruJix",
    shortName: "FruJix",
    summary:
      "Clean-label instant thickener and stabilizer for fruit juices, purees, and bakery fillings.",
    pricePerKg: 2.05,
    category: "bakery-modified-starch",
    imageSrc: img.tapioca,
  }),
  product({
    id: "bakery-flamas-ms-cws-e1422",
    name: "Modified Starch E1422 Acetylated Distarch Adipate Cold Water Soluble Maize Starch – FlaMas MS-CWS",
    shortName: "FlaMas MS-CWS (E1422)",
    summary:
      "Cold-water soluble maize starch for sauces, bakery fillings, yogurt, and emulsified systems.",
    pricePerKg: 2.15,
    category: "bakery-modified-starch",
    imageSrc: img.cassava,
    packaging: "25 kg moisture-proof paper bags",
  }),
  product({
    id: "bakery-flamas-ps-cws-e1422",
    name: "Modified Starch Food Grade FLAMAS PS CWS E1422 (Acetylated Distarch Adipate)",
    shortName: "FLAMAS PS CWS (E1422)",
    summary:
      "Food-grade potato-based E1422 CWS starch with heat, shear, and acid tolerance for bakery systems.",
    pricePerKg: 2.05,
    category: "bakery-modified-starch",
    imageSrc: img.potato,
    packaging: "25/50 kg PP bags with moisture-proof liner",
  }),
];

const potatoProducts: ShopProduct[] = [
  product({
    id: "e1442-waxy-maize-cws",
    name: "Modified E-1442 Hydroxypropyl Distarch Phosphate Waxy Maize Starch Cold Water Soluble",
    shortName: "E-1442 Waxy Maize CWS",
    summary: "Cold-water soluble hydroxypropyl distarch phosphate for freeze-thaw stability.",
    pricePerKg: 2.4,
    category: "potato-starch",
    imageSrc: img.potato,
  }),
  product({
    id: "e1422-potato-cws",
    name: "Modified E 1422 - Acetylated Distarch Adipate Potato Starch Cold Water Soluble",
    shortName: "E1422 Potato CWS",
    summary: "Pregelatinized potato starch with heat, shear, and acid tolerance.",
    pricePerKg: 2.05,
    category: "potato-starch",
    imageSrc: img.sweetPotato,
  }),
  product({
    id: "e1422-waxy-maize",
    name: "Modified E 1422 - Acetylated Distarch Adipate Waxy Maize Starch",
    shortName: "E1422 Waxy Maize",
    summary: "Process-tolerant acetylated distarch adipate for sauces and bakery systems.",
    pricePerKg: 2.15,
    category: "potato-starch",
    imageSrc: img.corn,
  }),
  product({
    id: "stathick-ps-e1414",
    name: "Modified Starch E1414 Acetylated Distarch Phosphate Potato Starch – StaThick PS",
    shortName: "StaThick PS (E1414)",
    summary: "Potato starch thickener, stabilizer, and binder with strong water holding.",
    pricePerKg: 1.65,
    category: "potato-starch",
    imageSrc: img.sweetPotato,
  }),
  product({
    id: "e1450-potato-cws",
    name: "Modified E1450 Starch Sodium Octenyl Succinate Potato Starch CWS",
    shortName: "E1450 Potato CWS",
    summary: "OSA potato starch for emulsification and specialty texture systems.",
    pricePerKg: 2.1,
    category: "potato-starch",
    imageSrc: img.potato,
  }),
];

const tapiocaProducts: ShopProduct[] = [
  product({
    id: "tapioca-high-viscosity",
    name: "Tapioca Starch with High Viscosity",
    shortName: "Tapioca Starch HV",
    summary: "High-viscosity tapioca starch for clean texture and body in food systems.",
    pricePerKg: 1.35,
    category: "tapioca-starch",
    imageSrc: img.tapioca,
  }),
  product({
    id: "tapioca-high-viscosity-premium",
    name: "Tapioca Starch with High Viscosity – Premium Grade",
    shortName: "Tapioca Starch HV Premium",
    summary: "Premium high-viscosity tapioca starch for demanding bakery and sauce lines.",
    pricePerKg: 1.55,
    category: "tapioca-starch",
    imageSrc: img.cassava,
  }),
  product({
    id: "e1442-tapioca",
    name: "Modified E-1442 Hydroxypropyl Distarch Phosphate Tapioca Starch",
    shortName: "E-1442 Tapioca",
    summary: "Hydroxypropyl distarch phosphate tapioca starch for process stability.",
    pricePerKg: 2.25,
    category: "tapioca-starch",
    imageSrc: img.tapioca,
  }),
  product({
    id: "tapioca-native",
    name: "Tapioca Starch – Native",
    shortName: "Native Tapioca Starch",
    summary: "Native tapioca starch for clean-label thickening and binding.",
    pricePerKg: 1.1,
    category: "tapioca-starch",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "tapioca-maltodextrin-de16-20",
    name: "Enzymatically Modified Starch Maltodextrin Tapioca Starch Dextrose Equivalent 16 to 20",
    shortName: "Tapioca Maltodextrin DE 16–20",
    summary: "Enzymatically modified tapioca maltodextrin for solubility and mouthfeel.",
    pricePerKg: 1.85,
    category: "tapioca-starch",
    imageSrc: img.tapioca,
  }),
];

const additiveProducts: ShopProduct[] = [
  product({
    id: "corn-syrup-solids-de26-30",
    name: "Corn Syrup Solids (DE-26-30)",
    shortName: "Corn Syrup Solids DE 26–30",
    summary: "Dried corn syrup solids for sweetness, body, and browning control.",
    pricePerKg: 1.75,
    category: "food-additive",
    imageSrc: img.corn,
  }),
  product({
    id: "yeast-protein-powder-90",
    name: "Yeast Protein Powder 90%",
    shortName: "Yeast Protein Powder 90%",
    summary: "High-protein yeast powder for nutrition and savory systems.",
    pricePerKg: 4.8,
    category: "food-additive",
    imageSrc: img.potato,
  }),
  product({
    id: "tapioca-syrup-de60",
    name: "Tapioca Syrup (DE-60)",
    shortName: "Tapioca Syrup DE 60",
    summary: "Higher DE tapioca syrup for sweetness and clean fermentable solids.",
    pricePerKg: 1.95,
    category: "food-additive",
    imageSrc: img.tapioca,
  }),
  product({
    id: "brown-rice-syrup",
    name: "Brown Rice Syrup",
    shortName: "Brown Rice Syrup",
    summary: "Natural brown rice syrup sweetener for clean-label formulations.",
    pricePerKg: 2.2,
    category: "food-additive",
    imageSrc: img.cassava,
  }),
  product({
    id: "tapioca-syrup-de30",
    name: "Tapioca Syrup (DE-30) – Liquid Glucose and Natural Sweetener",
    shortName: "Tapioca Syrup DE 30",
    summary: "Lower DE tapioca syrup / liquid glucose for mild sweetness and body.",
    pricePerKg: 1.9,
    category: "food-additive",
    imageSrc: img.cassavaAlt,
  }),
];

const ingredientProducts: ShopProduct[] = [
  product({
    id: "organic-cassava-flour-mv",
    name: "Organic Cassava Flour MV",
    shortName: "Organic Cassava Flour MV",
    summary: "Organic cassava flour for gluten-free bakery and clean-label applications.",
    pricePerKg: 2.35,
    category: "food-ingredients",
    imageSrc: img.cassava,
  }),
  product({
    id: "boiled-potato-ingredient",
    name: "Food Ingredient for Boiled Potatoes",
    shortName: "Boiled Potato Ingredient",
    summary: "Allergen-free plant-based ingredient system for potato applications.",
    pricePerKg: 2.55,
    category: "food-ingredients",
    imageSrc: img.sweetPotato,
  }),
  product({
    id: "maize-maltodextrin-de9-15",
    name: "Maize Malto Dextrin with Dextrose Equivalent 9 to 15",
    shortName: "Maize Maltodextrin DE 9–15",
    summary: "Maize maltodextrin for bulking, solubility, and controlled sweetness.",
    pricePerKg: 1.45,
    category: "food-ingredients",
    imageSrc: img.corn,
  }),
  product({
    id: "angel-tomato-powder",
    name: "Angel Tomato Powder",
    shortName: "Angel Tomato Powder",
    summary: "Tomato powder for sauces, seasonings, and savory ready meals.",
    pricePerKg: 3.6,
    category: "food-ingredients",
    imageSrc: img.potato,
  }),
  product({
    id: "angel-pea-protein",
    name: "Angel Pea Protein",
    shortName: "Angel Pea Protein",
    summary: "Plant protein for meat alternatives, bakery fortification, and nutrition.",
    pricePerKg: 5.2,
    category: "food-ingredients",
    imageSrc: img.cassavaAlt,
  }),
];

export const shopCatalogLocal: ShopCatalog = {
  categories: [
    {
      id: "bakery-modified-starch",
      title: "Bakery Products Modified Starch",
      description:
        "We are Industry pioneers of Modified Starch E1414 Acetylated Distarch Phosphate Potato Starch – StaThick PS, Corn Starch 7M for Bakery, Dairy, Confectionery and Beverage Products, Physically Modified Starch FruJix, Modified Starch E1422 Acetylated Distarch Adipate Cold Water Soluble Maize Starch FlaMas MS-CWS, and Food Grade FLAMAS PS CWS E1422 from India.",
      products: bakeryProducts,
    },
    {
      id: "potato-starch",
      title: "Potato Starch",
      description:
        "Leading manufacturer of modified potato and process-tolerant starches including E-1422 CWS, E-1442 systems, StaThick PS, and specialty thickeners for bakery, sauces, and gluten-free lines.",
      products: potatoProducts,
    },
    {
      id: "tapioca-starch",
      title: "Tapioca Starch",
      description:
        "We are a leading manufacturer of tapioca starch with high viscosity, modified E-1442 hydroxypropyl distarch phosphate tapioca starch, native tapioca starch, and enzymatically modified maltodextrin (DE 16–20).",
      products: tapiocaProducts,
    },
    {
      id: "food-additive",
      title: "Food Additive",
      description:
        "Our range includes Corn Syrup Solids (DE 26–30), Yeast Protein Powder 90%, Tapioca Syrup (DE 60), Brown Rice Syrup, and Tapioca Syrup (DE 30) liquid glucose as a natural sweetener.",
      products: additiveProducts,
    },
    {
      id: "food-ingredients",
      title: "Food Ingredients",
      description:
        "We are a leading manufacturer of Organic Cassava Flour MV, boiled-potato food ingredients, maize maltodextrin (DE 9–15), Angel Tomato Powder, and Angel Pea Protein.",
      products: ingredientProducts,
    },
  ],
};

export const shopProductsFlat: ShopProduct[] =
  shopCatalogLocal.categories.flatMap((category) => category.products);
