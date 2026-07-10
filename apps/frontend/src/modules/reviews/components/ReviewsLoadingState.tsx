import { Icon } from "@iconify/react";
import React from "react";

export function ReviewsLoadingState(): React.ReactElement {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
      <Icon icon="mdi:loading" className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="sr-only">Loading reviews</span>
    </div>
  );
}
