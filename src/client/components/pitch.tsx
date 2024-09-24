"use client";

import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";

export const Pitch = () => {
  return (
    <div className="flex items-center gap-6 rounded-lg  border-2 border-primary px-8 py-4 max-sm:flex-col max-sm:text-center max-sm:text-sm">
      <div className="flex items-center gap-1">
        <Badge variant="success">New</Badge>
        <p className="font-medium">Wanna work with me?</p>
      </div>

      <div className="flex items-center gap-2">
        <Button className="whitespace-nowrap" size="sm" asChild>
          <a
            href="https://cal.com/jlndev/intro"
            target="_blank"
            rel="noreferrer"
          >
            Book a Call
          </a>
        </Button>

        <Button size="sm" variant="secondary">
          <a href="https://dm.new/jln" target="_blank" rel="noreferrer">
            Write me
          </a>
        </Button>
      </div>
    </div>
  );
};
