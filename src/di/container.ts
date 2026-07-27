import { ApplicationRepositoryImpl } from "@/data/repositories/application.repository.impl";
import { HomeContentRepositoryImpl } from "@/data/repositories/home-content.repository.impl";
import { ProductRepositoryImpl } from "@/data/repositories/product.repository.impl";
import { GetApplicationDetailUseCase } from "@/domain/usecases/get-application-detail.usecase";
import { GetHomeContentUseCase } from "@/domain/usecases/get-home-content.usecase";
import { GetProductDetailUseCase } from "@/domain/usecases/get-product-detail.usecase";

const homeContentRepository = new HomeContentRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const applicationRepository = new ApplicationRepositoryImpl();

export const getHomeContentUseCase = new GetHomeContentUseCase(
  homeContentRepository,
);

export const getProductDetailUseCase = new GetProductDetailUseCase(
  productRepository,
);

export const getApplicationDetailUseCase = new GetApplicationDetailUseCase(
  applicationRepository,
);
