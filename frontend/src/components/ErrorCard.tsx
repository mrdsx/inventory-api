"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button, Card, CardContent, CardHeader, CardTitle } from "./ui";

export function ErrorCard({
  title,
  message,
  error,
  reset,
}: {
  title: string;
  message: string;
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    toast.error("Dashboard failed to load.");
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle className="size-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-3 text-sm">{message}</p>
        <pre className="bg-muted text-destructive rounded-md p-3 font-mono text-xs whitespace-pre-wrap">
          {error.message}
        </pre>
        <Button onClick={() => reset()} variant="destructive" className="mt-4">
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
