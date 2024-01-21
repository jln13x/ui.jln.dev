"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/client/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container grid flex-1 place-items-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold">Oh no!</h1>
        <p className="text-lg text-muted-foreground">
          Something must have gone wrong. Please try again or contact support if
          the problem persists.
        </p>
        <div className="flex gap-2 pt-12">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <Button variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh the page
          </Button>
        </div>
      </div>
    </div>
  );
}
