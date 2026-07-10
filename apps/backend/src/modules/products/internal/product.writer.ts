import type { CreateProductInput, Product, UpdateProductInput } from "@task-forge/shared/types";
import { ProductStatus } from "@task-forge/shared/types";

import { ProductNotFoundError } from "../products.error";

import { ProductEntity } from "./product.entity";
import ProductRepository from "./product.repository";
import { serializeProduct } from "./product.serializer";

export default class ProductWriter {
  public static async create(input: CreateProductInput): Promise<Product> {
    const entity = new ProductEntity();
    entity.name = input.name.trim();
    entity.url = input.url.trim();
    entity.status = ProductStatus.ACTIVE;

    const saved = await ProductRepository.save(entity);
    return serializeProduct(saved);
  }

  public static async update(productId: number, input: UpdateProductInput): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${productId} not found`);
    }

    if (input.name !== undefined) {
      product.name = input.name.trim();
    }
    if (input.url !== undefined) {
      product.url = input.url.trim();
    }
    if (input.status !== undefined) {
      product.status = input.status;
    }

    const saved = await ProductRepository.save(product);
    return serializeProduct(saved);
  }

  public static async delete(productId: number): Promise<void> {
    const product = await ProductRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${productId} not found`);
    }

    product.status = ProductStatus.INACTIVE;
    await ProductRepository.save(product);
  }
}
