"use client";

import { Body } from "@/components";
import "./styles/app.css";
import "./styles/globals.css";
import Link from "next/link";
import { ROUTES } from "./lib";

export default function GlobalNotFoundPage() {
  return (
    <html lang="en">
      <Body>
        <div className="grid min-h-screen place-content-center">
          <div className="card bg-background p-10 text-center">
            <h1 className="mb-2 text-6xl font-extrabold text-red-500">404</h1>
            <h2 className="text-foreground mb-4 text-2xl font-semibold">
              Page Not Found
            </h2>
            <p className="text-foreground/60 mb-6">
              Sorry, the page you are looking for does not exist.
            </p>
            <Link
              href={ROUTES.workspace.dashboard}
              className="bg-primary hover:bg-primary/80 rounded-sm px-3 py-2 text-white duration-100"
            >
              Go Home
            </Link>
          </div>
        </div>
      </Body>
    </html>
  );
}
