"use client";

import { Body, ErrorCard } from "@/components";

export default function GlobalError(props: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <Body>
        <div className="grid min-h-screen place-content-center">
          <div className="w-[400px]">
            <ErrorCard
              title="Uncaught error"
              message="Oops! Something went wrong!"
              centerContent
              {...props}
            />
          </div>
        </div>
      </Body>
    </html>
  );
}
