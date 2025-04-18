"use client";

import * as Icons from "@/client/components/icons";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";

export const Pitch = () => {
  return (
    <div className="flex items-center justify-between gap-6 rounded-lg  border-2 border-primary px-8 py-4 max-sm:flex-col max-sm:text-center">
      <div className="flex items-center gap-1 max-sm:flex-col max-sm:gap-4">
        <Badge variant="warning">2 spots left</Badge>
        <p>Get a MVP of your project idea within 2 weeks. Guaranteed.</p>
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
            <Icons.Xcom className="size-3" />
          </a>
        </Button>

        <Button size="sm" variant="secondary">
          <a href="mailto:ui@jln.dev" target="_blank" rel="noreferrer">
            <Icons.Mail className="size-3" />
          </a>
        </Button>
      </div>
    </div>
  );
};
