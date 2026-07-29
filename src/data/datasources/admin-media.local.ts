export const ADMIN_MEDIA_PRESETS = [
  "/images/banner/banners_1.png",
  "/images/banner/banners_2.png",
  "/images/banner/01-banner-native-modified-starch.webp",
  "/images/banner/02-banner-custom-formulation.webp",
  "/images/banner/03-banner-us-distribution-supply.webp",
  "/images/shop_banner/shop_banner_1.png",
  "/images/shop_banner/shop_banner_2.png",
  "/images/product/product1.png",
  "/images/product/product2.png",
  "/images/product/product3.png",
  "/images/product/product4.png",
  "/images/product/product5.png",
  "/images/product/product6.png",
  "/images/product_starch/tapioca_starch.webp",
  "/images/product_starch/tapioca_starch1.webp",
  "/images/product_starch/cassavaflourbag.webp",
  "/images/product_starch/cassava_flour_pack.webp",
  "/images/product_starch/cornmaltodextrinpack.webp",
  "/images/product_starch/sweet_potato_starch.webp",
  "/images/product_starch/orangesweetpotatoflour.webp",
  "/images/product_starch/potato_s.webp",
  "/images/product_starch/8f2a6eb2-7454-4db1-a202-1a1d5c815168.webp",
  "/images/about/angel-starch-factory.png",
  "/images/logo/angel-starch-logo.webp",
] as const;

export const ADMIN_CONTENT_CHANGED_EVENT = "angel-admin-content-changed";

export function notifyAdminContentChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ADMIN_CONTENT_CHANGED_EVENT));
}
