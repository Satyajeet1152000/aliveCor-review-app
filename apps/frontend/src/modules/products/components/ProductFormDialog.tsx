"use client";

import type { CreateProductInput, Product } from "@task-forge/shared/types";
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

export function ProductFormDialog({
  open,
  product,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps): React.ReactElement {
  const [form, setForm] = useState<CreateProductInput>(EMPTY_FORM);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        url: product.url,
      });
      return;
    }

    setForm(EMPTY_FORM);
  }, [product, open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(form);
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
              onChange={(event) => setForm({ ...form, url: event.target.value })}
              placeholder="https://amzn.in/d/..."
              required
            />
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
