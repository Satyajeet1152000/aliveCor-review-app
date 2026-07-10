"use client";

import { createProductBodySchema } from "@review-dash/shared/schemas";
import type { CreateProductInput, Product } from "@review-dash/shared/types";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFormDialogProps {
  open: boolean;
  product?: Product | null;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateProductInput) => void;
}

const EMPTY_FORM: CreateProductInput = {
  name: "",
  url: "",
};

const AMAZON_PRODUCT_URL_PLACEHOLDER = "https://www.amazon.in/dp/B07RQW6SD5";

export function ProductFormDialog({
  open,
  product,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps): React.ReactElement {
  const [form, setForm] = useState<CreateProductInput>(EMPTY_FORM);
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        url: product.url,
      });
      return;
    }

    setForm(EMPTY_FORM);
    setUrlError(null);
  }, [product, open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const result = createProductBodySchema.safeParse(form);
    if (!result.success) {
      const message = result.error.issues.find((issue) => issue.path[0] === "url")?.message;
      setUrlError(message ?? "Enter a valid Amazon product URL");
      return;
    }

    setUrlError(null);
    onSubmit(result.data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Edit product" : "Create product"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="product-name">Name</Label>
            <Input
              id="product-name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="KardiaMobile 6L"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-url">Amazon URL</Label>
            <Input
              id="product-url"
              type="url"
              value={form.url}
              onChange={(event) => {
                setForm({ ...form, url: event.target.value });
                if (urlError) {
                  setUrlError(null);
                }
              }}
              placeholder={AMAZON_PRODUCT_URL_PLACEHOLDER}
              aria-invalid={urlError ? true : undefined}
              required
            />
            {urlError ? <p className="text-sm text-destructive">{urlError}</p> : null}
            <p className="text-sm text-muted-foreground">
              Use the full product page URL with <code>/dp/ASIN</code>. Short links like{" "}
              <code>amzn.in</code> are not supported.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : product ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
