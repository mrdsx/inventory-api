"use client";

import { Body } from "@/components";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <Body>
        <div className="grid min-h-screen place-content-center">
          <Card className="border-destructive/50 w-[400px] text-center shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-2">
              <AlertCircle className="text-destructive size-12" />
              <CardTitle className="text-destructive text-2xl font-bold">
                Something went wrong
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground grid gap-2 text-sm">
                Error message:
                <pre className="bg-muted text-destructive rounded-md p-3 font-mono whitespace-pre-wrap">
                  {error.message}
                  <br />
                </pre>
              </p>
            </CardContent>

            <CardFooter className="mx-auto">
              <Button variant="destructive" onClick={() => reset()}>
                Try again
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Body>
    </html>
  );
}
