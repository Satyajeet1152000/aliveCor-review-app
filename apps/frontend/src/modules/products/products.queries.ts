import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpdateProductInput } from "@task-forge/shared/types";
import { toast } from "sonner";

import { createProduct, deleteProduct, getProducts, updateProduct } from "./products.api";

export const productsQueryKey = ["products"] as const;

export function useProductsQuery() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: getProducts,
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
      toast.success("Product created");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create product");
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateProductInput }) =>
      updateProduct(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
      toast.success("Product updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update product");
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
      toast.success("Product deactivated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to deactivate product");
    },
  });
}
