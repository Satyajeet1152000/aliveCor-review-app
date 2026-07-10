import React from "react";

import { Button } from "@/components/ui/button";

interface ReviewsErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ReviewsErrorState({ message, onRetry }: ReviewsErrorStateProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert">
      <p className="font-medium text-destructive">Could not load reviews</p>
      <p className="mt-1 text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
