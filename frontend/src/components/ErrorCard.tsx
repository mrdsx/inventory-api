"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button, Card, CardContent, CardHeader, CardTitle } from "./ui";

export function ErrorCard({
  title = "Uncaught Error",
  message = "Oops! Something went wrong!",
  centerContent = false,
  error,
  reset,
}: Partial<{
  title: string;
  message: string;
  centerContent: boolean;
}> &
  ErrorBoundaryProps) {
  useEffect(() => {
    toast.error("Dashboard failed to load.");
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <Card
      className={`border-destructive ${centerContent ? "text-center" : ""}`}
    >
      <CardHeader>
        <CardTitle
          className={`text-destructive flex items-center gap-2 ${centerContent ? "mx-auto" : ""}`}
        >
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
