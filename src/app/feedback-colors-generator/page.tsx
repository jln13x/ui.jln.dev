"use client";

import { useState } from "react";

import { Alert } from "@/client/components/customizable/alert";
import { Logo } from "@/client/components/logo";
import { cn } from "@/client/lib/cn";
import { createContrast } from "@/client/lib/create-contrast";
import { hslToVariableValue } from "@/client/lib/hsl-to-variable-value";

import { colord } from "colord";

const Page = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center">
        <Logo className="size-10" />
        <h1
          className={cn(
            "relative flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl",
          )}
        >
          Generate Feedback Colors for shadcn/ui
        </h1>
      </div>

      <Feedback
        name="Success"
        range={{
          h: { min: 90, max: 170 },
          s: { min: 40, max: 100 },
          l: { min: 40, max: 60 },
        }}
      />
      <Feedback
        name="Destructive"
        range={{
          h: { min: 0, max: 15 },
          s: { min: 40, max: 100 },
          l: { min: 20, max: 45 },
        }}
      />
      <Feedback
        name="Warning"
        range={{
          h: { min: 15, max: 55 },
          s: { min: 40, max: 100 },
          l: { min: 40, max: 60 },
        }}
      />
      <Feedback
        name="Info"
        range={{
          h: { min: 180, max: 240 },
          s: { min: 40, max: 100 },
          l: { min: 40, max: 60 },
        }}
      />
    </div>
  );
};

const Feedback = ({
  name,
  range,
}: {
  name: string;
  range: {
    h: { min: number; max: number };
    s: { min: number; max: number };
    l: { min: number; max: number };
  };
}) => {
  const [pair, setPair] = useState(generate());

  function generate() {
    const base = colord({
      h: randomNumberInRange(range.h.min, range.h.max),
      s: randomNumberInRange(range.s.min, range.s.max),
      l: randomNumberInRange(range.l.min, range.l.max),
    });

    const foreground = createContrast(base);

    return {
      bg: base.toHsl(),
      fg: foreground.toHsl(),
    };
  }

  return (
    <div style={{}}>
      <div className="flex items-center gap-2">
        <Alert
          className="bg-[hsl(var(--bg))] text-[hsl(var(--fg))]"
          style={{
            // @ts-expect-error idc
            "--bg": hslToVariableValue(pair.bg),
            "--fg": hslToVariableValue(pair.fg),
          }}
        >
          {name}
        </Alert>
        <button
          className="rounded-lg bg-background text-foreground invert"
          onClick={() => setPair(generate())}
        >
          Generate
        </button>
        Contrast: {colord(pair.bg).contrast(colord(pair.fg))}
      </div>
    </div>
  );
};

const randomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export default Page;
