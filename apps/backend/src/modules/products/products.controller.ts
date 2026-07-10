import { messageResponse, successResponse } from "@lib/api-response";
import type { CreateProductInput, UpdateProductInput } from "@task-forge/shared/types";
import type { FastifyReply, FastifyRequest } from "fastify";

import ProductService from "./products.service";

export class ProductsController {
  list = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const products = await ProductService.listAll();
    return reply.status(200).send(successResponse(products));
  };

  create = async (
    request: FastifyRequest<{ Body: CreateProductInput }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const product = await ProductService.create(request.body);
    return reply.status(201).send(successResponse(product, "Product created successfully"));
  };

  update = async (
    request: FastifyRequest<{ Params: { id: number }; Body: UpdateProductInput }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const product = await ProductService.update(request.params.id, request.body);
    return reply.status(200).send(successResponse(product, "Product updated successfully"));
  };

  delete = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ): Promise<void> => {
    await ProductService.delete(request.params.id);
    return reply.status(200).send(messageResponse("Product deactivated successfully"));
  };
}
