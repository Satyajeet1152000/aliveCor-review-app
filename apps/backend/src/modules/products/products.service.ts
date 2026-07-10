import type { CreateProductInput, Product, UpdateProductInput } from "@task-forge/shared/types";

import ProductReader from "./internal/product.reader";
import ProductWriter from "./internal/product.writer";

export default class ProductService {
  public static async listAll(): Promise<Product[]> {
    return ProductReader.listAll();
  }

  public static async listActiveUrls(): Promise<string[]> {
    return ProductReader.listActiveUrls();
  }

  public static async create(input: CreateProductInput): Promise<Product> {
    return ProductWriter.create(input);
  }

  public static async update(productId: number, input: UpdateProductInput): Promise<Product> {
    await ProductReader.getById(productId);
    return ProductWriter.update(productId, input);
  }

  public static async delete(productId: number): Promise<void> {
    await ProductReader.getById(productId);
    await ProductWriter.delete(productId);
  }
}
