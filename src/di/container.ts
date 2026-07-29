import { AboutRepositoryImpl } from "@/data/repositories/about.repository.impl";
import { ApplicationRepositoryImpl } from "@/data/repositories/application.repository.impl";
import { ContactRepositoryImpl } from "@/data/repositories/contact.repository.impl";
import { HomeContentRepositoryImpl } from "@/data/repositories/home-content.repository.impl";
import { ProductRepositoryImpl } from "@/data/repositories/product.repository.impl";
import { ShopRepositoryImpl } from "@/data/repositories/shop.repository.impl";
import { GetAboutContentUseCase } from "@/domain/usecases/get-about-content.usecase";
import { GetApplicationDetailUseCase } from "@/domain/usecases/get-application-detail.usecase";
import { GetContactContentUseCase } from "@/domain/usecases/get-contact-content.usecase";
import { GetHomeContentUseCase } from "@/domain/usecases/get-home-content.usecase";
import { GetProductDetailUseCase } from "@/domain/usecases/get-product-detail.usecase";
import { GetShopCatalogUseCase } from "@/domain/usecases/get-shop-catalog.usecase";
import { GetShopProductUseCase } from "@/domain/usecases/get-shop-product.usecase";

const homeContentRepository = new HomeContentRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const applicationRepository = new ApplicationRepositoryImpl();
const shopRepository = new ShopRepositoryImpl();
const aboutRepository = new AboutRepositoryImpl();
const contactRepository = new ContactRepositoryImpl();

export const getHomeContentUseCase = new GetHomeContentUseCase(
  homeContentRepository,
);

export const getProductDetailUseCase = new GetProductDetailUseCase(
  productRepository,
);

export const getApplicationDetailUseCase = new GetApplicationDetailUseCase(
  applicationRepository,
);

export const getShopCatalogUseCase = new GetShopCatalogUseCase(shopRepository);

export const getShopProductUseCase = new GetShopProductUseCase(shopRepository);

export const getAboutContentUseCase = new GetAboutContentUseCase(
  aboutRepository,
);

export const getContactContentUseCase = new GetContactContentUseCase(
  contactRepository,
);
