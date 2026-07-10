import type { Product } from "@review-dash/shared/types";
import { ProductStatus } from "@review-dash/shared/types";

import { ProductNotFoundError } from "../products.error";

import ProductRepository from "./product.repository";
import { serializeProduct } from "./product.serializer";

export default class ProductReader {
  public static async listAll(): Promise<Product[]> {
    const products = await ProductRepository.find({
      where: { status: ProductStatus.ACTIVE },
      order: { createdAt: "DESC" },
    });

    return products.map(serializeProduct);
  }

  public static async listActive(): Promise<Product[]> {
    const products = await ProductRepository.find({
      where: { status: ProductStatus.ACTIVE },
      order: { createdAt: "ASC" },
    });

    return products.map(serializeProduct);
  }

  public static async listActiveUrls(): Promise<string[]> {
    const products = await ProductRepository.find({
      where: { status: ProductStatus.ACTIVE },
      order: { createdAt: "ASC" },
    });

    return products.map((product) => product.url);
  }

  public static async getById(productId: number): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${productId} not found`);
    }

    return serializeProduct(product);
  }
}
