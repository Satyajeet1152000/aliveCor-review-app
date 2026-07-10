export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Product {
  id: number;
  name: string;
  url: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  url: string;
}

export interface UpdateProductInput {
  name?: string;
  url?: string;
  status?: ProductStatus;
}
