"use client";

import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";

export const Pitch = () => {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted px-4 py-2 max-sm:flex-col max-sm:text-center max-sm:text-sm">
      <Badge variant="success">New</Badge>

      <p>Lets work together on your next project.</p>

      <div className="flex items-center gap-1">
        <Button className="whitespace-nowrap" size="xs" asChild>
          <a
            href="https://cal.com/jlndev/intro"
            target="_blank"
            rel="noreferrer"
          >
            Book a Call
          </a>
        </Button>

        <Button size="xs" variant="secondary">
          <a href="https://dm.new/jln" target="_blank" rel="noreferrer">
            Write me
          </a>
        </Button>
      </div>
    </div>
  );
};
