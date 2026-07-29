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

const nativeStarchProducts: ShopProduct[] = [
  product({
    id: "tapioca-starch",
    name: "Tapioca Starch",
    shortName: "Tapioca Starch",
    summary: "Native tapioca starch for clean thickening, binding, and texture in food systems.",
    pricePerKg: 1.1,
    category: "native-starch",
    imageSrc: img.tapioca,
  }),
  product({
    id: "angel-cws-ts-native",
    name: "Angel CWS TS",
    shortName: "Angel CWS TS",
    summary: "Cold-water soluble tapioca starch for instant viscosity and clean-label systems.",
    pricePerKg: 1.85,
    category: "native-starch",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "sweet-potato-starch",
    name: "Sweet Potato Starch",
    shortName: "Sweet Potato Starch",
    summary: "Native sweet potato starch for bakery, snacks, and gluten-free applications.",
    pricePerKg: 1.45,
    category: "native-starch",
    imageSrc: img.sweetPotato,
  }),
  product({
    id: "orange-sweet-potato-flour",
    name: "Orange Sweet Potato Flour",
    shortName: "Orange Sweet Potato Flour",
    summary: "Orange sweet potato flour for color, nutrition, and clean-label bakery systems.",
    pricePerKg: 1.75,
    category: "native-starch",
    imageSrc: img.sweetPotato,
  }),
  product({
    id: "potato-starch-13m",
    name: "Potato Starch 13M",
    shortName: "Potato Starch 13M",
    summary: "Native potato starch grade 13M for thickening, binding, and moisture control.",
    pricePerKg: 1.35,
    category: "native-starch",
    imageSrc: img.potato,
  }),
];

const organicProducts: ShopProduct[] = [
  product({
    id: "cassava-flour-mv-30",
    name: "Cassava Flour MV 30",
    shortName: "Cassava Flour MV 30",
    summary: "Organic medium-viscosity cassava flour for gluten-free bakery and coatings.",
    pricePerKg: 2.2,
    category: "organic-products",
    imageSrc: img.cassava,
  }),
  product({
    id: "cassava-flour-mv-100",
    name: "Cassava Flour MV 100",
    shortName: "Cassava Flour MV 100",
    summary: "Organic medium-viscosity cassava flour for structured bakery and snack systems.",
    pricePerKg: 2.25,
    category: "organic-products",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "cassava-flour-hv-30",
    name: "Cassava Flour HV30",
    shortName: "Cassava Flour HV30",
    summary: "Organic high-viscosity cassava flour for body and clean texture.",
    pricePerKg: 2.3,
    category: "organic-products",
    imageSrc: img.cassava,
  }),
  product({
    id: "cassava-flour-hv-100",
    name: "Cassava Flour HV100",
    shortName: "Cassava Flour HV100",
    summary: "Organic high-viscosity cassava flour for sauces, batters, and bakery fillings.",
    pricePerKg: 2.35,
    category: "organic-products",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "cassava-flour-hv-150",
    name: "Cassava Flour HV150",
    shortName: "Cassava Flour HV150",
    summary: "Organic high-viscosity cassava flour for premium gluten-free applications.",
    pricePerKg: 2.45,
    category: "organic-products",
    imageSrc: img.cassava,
  }),
  product({
    id: "cassava-flour-lv-30",
    name: "Cassava Flour LV30",
    shortName: "Cassava Flour LV30",
    summary: "Organic low-viscosity cassava flour for drinks, coatings, and light batters.",
    pricePerKg: 2.15,
    category: "organic-products",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "cassava-flour-lv-100",
    name: "Cassava Flour LV100",
    shortName: "Cassava Flour LV100",
    summary: "Organic low-viscosity cassava flour for process-friendly gluten-free systems.",
    pricePerKg: 2.2,
    category: "organic-products",
    imageSrc: img.cassava,
  }),
  product({
    id: "cassava-flour-lv-150",
    name: "Cassava Flour LV150",
    shortName: "Cassava Flour LV150",
    summary: "Organic low-viscosity cassava flour for specialty bakery and snack lines.",
    pricePerKg: 2.3,
    category: "organic-products",
    imageSrc: img.cassavaAlt,
  }),
];

const sweetenerProducts: ShopProduct[] = [
  product({
    id: "maltox-ms-ld",
    name: "MALTOX MS LD",
    shortName: "MALTOX MS LD",
    summary: "Low-density maize maltodextrin sweetener for bulking and mild sweetness.",
    pricePerKg: 1.45,
    category: "sweetener",
    imageSrc: img.corn,
  }),
  product({
    id: "maltox-ms-md",
    name: "MALTOX MS MD",
    shortName: "MALTOX MS MD",
    summary: "Medium-density maize maltodextrin for balanced body and solubility.",
    pricePerKg: 1.5,
    category: "sweetener",
    imageSrc: img.corn,
  }),
  product({
    id: "maltox-ms-hd",
    name: "MALTOX MS HD",
    shortName: "MALTOX MS HD",
    summary: "High-density maize maltodextrin for concentrated bulking systems.",
    pricePerKg: 1.55,
    category: "sweetener",
    imageSrc: img.corn,
  }),
  product({
    id: "dextrose-monohydrate",
    name: "Dextrose Monohydrate",
    shortName: "Dextrose Monohydrate",
    summary: "Food-grade dextrose monohydrate for sweetness, fermentation, and browning.",
    pricePerKg: 1.35,
    category: "sweetener",
    imageSrc: img.corn,
  }),
  product({
    id: "maltox-ts-ld",
    name: "MALTOX TS LD",
    shortName: "MALTOX TS LD",
    summary: "Low-density tapioca maltodextrin for clean-label sweetness and mouthfeel.",
    pricePerKg: 1.65,
    category: "sweetener",
    imageSrc: img.tapioca,
  }),
  product({
    id: "maltox-ts-md",
    name: "MALTOX TS MD",
    shortName: "MALTOX TS MD",
    summary: "Medium-density tapioca maltodextrin for beverages and confectionery.",
    pricePerKg: 1.7,
    category: "sweetener",
    imageSrc: img.tapioca,
  }),
  product({
    id: "maltox-ts-hd",
    name: "MALTOX TS HD",
    shortName: "MALTOX TS HD",
    summary: "High-density tapioca maltodextrin for concentrated clean-label systems.",
    pricePerKg: 1.75,
    category: "sweetener",
    imageSrc: img.tapioca,
  }),
];

const cleanLabelProducts: ShopProduct[] = [
  product({
    id: "clatap-prima-300-wmt-v2",
    name: "CLATAP PRIMA 300 WMT – V2",
    shortName: "CLATAP PRIMA 300 WMT V2",
    summary: "Clean-label tapioca starch system for premium texture and process tolerance.",
    pricePerKg: 2.55,
    category: "clean-label-starch",
    imageSrc: img.tapioca,
  }),
  product({
    id: "cleation-3300-v12",
    name: "CLEATION 3300 V12",
    shortName: "CLEATION 3300 V12",
    summary: "Clean-label starch for stable viscosity across cooking and shear.",
    pricePerKg: 2.45,
    category: "clean-label-starch",
    imageSrc: img.cassava,
  }),
  product({
    id: "whitrin-f",
    name: "WHITRIN F",
    shortName: "WHITRIN F",
    summary: "Clean-label whitening and texture starch for dairy and bakery systems.",
    pricePerKg: 2.35,
    category: "clean-label-starch",
    imageSrc: img.potato,
  }),
  product({
    id: "chikmat",
    name: "CHIKMAT",
    shortName: "CHIKMAT",
    summary: "Clean-label starch designed for poultry and savory coating systems.",
    pricePerKg: 2.4,
    category: "clean-label-starch",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "texturamyl-6m-v1",
    name: "TEXTURAMYL 6M V1",
    shortName: "TEXTURAMYL 6M V1",
    summary: "Clean-label texturizing starch for mouthfeel and structure in foods.",
    pricePerKg: 2.5,
    category: "clean-label-starch",
    imageSrc: img.corn,
  }),
  product({
    id: "angel-cws-ms",
    name: "ANGEL_CWS MS",
    shortName: "ANGEL_CWS MS",
    summary: "Cold-water soluble maize starch for instant thickening without cooking.",
    pricePerKg: 2.15,
    category: "clean-label-starch",
    imageSrc: img.corn,
  }),
  product({
    id: "angel-cws-ts",
    name: "ANGEL_CWS TS",
    shortName: "ANGEL_CWS TS",
    summary: "Cold-water soluble tapioca starch for clean-label instant viscosity.",
    pricePerKg: 2.2,
    category: "clean-label-starch",
    imageSrc: img.tapioca,
  }),
];

const modifiedStarchProducts: ShopProduct[] = [
  product({
    id: "stabiflo-ts-hv60-e1442",
    name: "STABIFLO TS HV60 - E1442",
    shortName: "STABIFLO TS HV60 (E1442)",
    summary: "Hydroxypropyl distarch phosphate tapioca starch for freeze-thaw stability.",
    pricePerKg: 2.35,
    category: "modified-starch",
    imageSrc: img.tapioca,
    packaging: "25 kg moisture-proof paper bags",
  }),
  product({
    id: "flamas-ts-08600-e1422",
    name: "FLAMAS TS 08600 - E1422",
    shortName: "FLAMAS TS 08600 (E1422)",
    summary: "Acetylated distarch adipate tapioca starch for heat, shear, and acid tolerance.",
    pricePerKg: 2.25,
    category: "modified-starch",
    imageSrc: img.cassava,
    packaging: "25 kg moisture-proof paper bags",
  }),
  product({
    id: "flotexa-ts-5750-e1440",
    name: "FLOTEXA TS 5750 - E1440",
    shortName: "FLOTEXA TS 5750 (E1440)",
    summary: "Hydroxypropyl starch for process-tolerant texture in sauces and fillings.",
    pricePerKg: 2.2,
    category: "modified-starch",
    imageSrc: img.tapioca,
  }),
  product({
    id: "frosin-ts-081800t-e1420",
    name: "FROSIN TS 081800T - E1420",
    shortName: "FROSIN TS 081800T (E1420)",
    summary: "Acetylated starch for freeze-stable thickening and binder performance.",
    pricePerKg: 2.15,
    category: "modified-starch",
    imageSrc: img.cassavaAlt,
  }),
  product({
    id: "stathick-ts-071100-e1414",
    name: "E 1414 - STATHICK TS 071100",
    shortName: "STATHICK TS 071100 (E1414)",
    summary: "Acetylated distarch phosphate for bakery thickening and water holding.",
    pricePerKg: 1.95,
    category: "modified-starch",
    imageSrc: img.sweetPotato,
    packaging: "25 kg moisture-proof paper bags",
  }),
  product({
    id: "stabiflo-ts-cws-mv700-e1442",
    name: "E 1442 - STABIFLO TS CWS MV700",
    shortName: "STABIFLO TS CWS MV700 (E1442)",
    summary: "Cold-water soluble E1442 tapioca starch for instant viscosity and stability.",
    pricePerKg: 2.45,
    category: "modified-starch",
    imageSrc: img.tapioca,
    packaging: "25 kg moisture-proof paper bags",
  }),
];

export const shopCatalogLocal: ShopCatalog = {
  categories: [
    {
      id: "native-starch",
      title: "Native Starch",
      description:
        "Native tapioca, potato, and sweet potato starches including Angel CWS TS and Potato Starch 13M for clean-label food applications.",
      products: nativeStarchProducts,
    },
    {
      id: "organic-products",
      title: "Organic Products",
      description:
        "Organic cassava flour grades across medium, high, and low viscosity ranges (MV, HV, and LV) for gluten-free bakery and specialty foods.",
      products: organicProducts,
    },
    {
      id: "sweetener",
      title: "Sweetener",
      description:
        "MALTOX maize and tapioca maltodextrins (LD, MD, HD) plus dextrose monohydrate for bulking, sweetness, and solubility.",
      products: sweetenerProducts,
    },
    {
      id: "clean-label-starch",
      title: "Clean Label Starch",
      description:
        "Clean-label performance starches including CLATAP PRIMA, CLEATION, WHITRIN F, CHIKMAT, TEXTURAMYL, and ANGEL_CWS systems.",
      products: cleanLabelProducts,
    },
    {
      id: "modified-starch",
      title: "Modified Starch",
      description:
        "Modified tapioca starches across E1414, E1420, E1422, E1440, and E1442 chemistries for process-tolerant bakery, sauces, and frozen foods.",
      products: modifiedStarchProducts,
    },
  ],
};

export const shopProductsFlat: ShopProduct[] =
  shopCatalogLocal.categories.flatMap((category) => category.products);
