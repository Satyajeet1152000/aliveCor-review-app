import React from "react";

export function ReviewsNoResultsState(): React.ReactElement {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <p className="text-lg font-medium">No reviews match your filters</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Try adjusting the product, rating, or date range to see more results.
      </p>
    </div>
  );
}
