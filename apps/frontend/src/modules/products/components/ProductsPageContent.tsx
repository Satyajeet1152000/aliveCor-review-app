"use client";

import { Icon } from "@iconify/react";
import { Routes } from "@task-forge/shared/constant";
import type { CreateProductInput, Product } from "@task-forge/shared/types";
import Link from "next/link";
import React, { useState } from "react";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useProductsQuery,
  useUpdateProductMutation,
} from "../products.queries";

import { ProductCard } from "./ProductCard";
import { ProductFormDialog } from "./ProductFormDialog";

import { Button } from "@/components/ui/button";

export function ProductsPageContent(): React.ReactElement {
  const { data: products = [], isLoading, isError } = useProductsQuery();
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const deleteMutation = useDeleteProductMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openCreateDialog = (): void => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product): void => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleSubmit = (input: CreateProductInput): void => {
    if (editingProduct) {
      updateMutation.mutate(
        { id: editingProduct.id, input },
        {
          onSuccess: () => {
            setDialogOpen(false);
            setEditingProduct(null);
          },
        },
      );
      return;
    }

    createMutation.mutate(input, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const handleDelete = (product: Product): void => {
    const confirmed = window.confirm(`Deactivate "${product.name}"?`);
    if (!confirmed) {
      return;
    }
    deleteMutation.mutate(product.id);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage Amazon product URLs used for review sync.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href={Routes.HOME}>Back to dashboard</Link>
          </Button>
          <Button onClick={openCreateDialog}>Create product</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Icon icon="mdi:loading" className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Could not load products.
        </div>
      ) : null}

      {!isLoading && !isError && products.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-lg font-medium">No products yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a product with its Amazon URL to start syncing reviews.
          </p>
          <Button className="mt-4" onClick={openCreateDialog}>
            Create product
          </Button>
        </div>
      ) : null}

      {!isLoading && !isError && products.length > 0 ? (
        <section className="grid gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </section>
      ) : null}

      <ProductFormDialog
        open={dialogOpen}
        product={editingProduct}
        isSubmitting={isSubmitting}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
