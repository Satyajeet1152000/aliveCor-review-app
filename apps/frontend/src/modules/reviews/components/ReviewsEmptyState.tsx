import React from "react";

import { Button } from "@/components/ui/button";

interface ReviewsEmptyStateProps {
  onSync: () => void;
  isSyncing: boolean;
}

export function ReviewsEmptyState({
  onSync,
  isSyncing,
}: ReviewsEmptyStateProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <p className="text-lg font-medium">No reviews yet</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Sync mock Amazon reviews into PostgreSQL to populate the dashboard.
      </p>
      <Button className="mt-4" onClick={onSync} disabled={isSyncing}>
        {isSyncing ? "Syncing..." : "Sync reviews"}
      </Button>
    </div>
  );
}
