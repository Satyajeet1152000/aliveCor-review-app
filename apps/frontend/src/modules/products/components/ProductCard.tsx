import type { Product } from "@review-dash/shared/types";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isDeleting: boolean;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  isDeleting,
}: ProductCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">{product.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{product.status}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Edit ${product.name}`}
            onClick={() => onEdit(product)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Delete ${product.name}`}
            disabled={isDeleting}
            onClick={() => onDelete(product)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <a
          href={product.url}
          target="_blank"
          rel="noreferrer"
          className="break-all text-sm text-primary hover:underline"
        >
          {product.url}
        </a>
      </CardContent>
    </Card>
  );
}
