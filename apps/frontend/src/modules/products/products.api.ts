import type {
  ApiResponse,
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "@task-forge/shared/types";

import { apiClient } from "@/lib/axios";

export async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<Product[]>>("/products");
  return response.data.data ?? [];
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const response = await apiClient.post<ApiResponse<Product>>("/products", input);
  if (!response.data.data) {
    throw new Error("Failed to create product");
  }
  return response.data.data;
}

export async function updateProduct(id: number, input: UpdateProductInput): Promise<Product> {
  const response = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, input);
  if (!response.data.data) {
    throw new Error("Failed to update product");
  }
  return response.data.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
