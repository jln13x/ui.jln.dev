"use client";

import { useState } from "react";

import { CopyButton } from "@/client/components/copy-button";
import { Alert } from "@/client/components/customizable/alert";
import { Support } from "@/client/components/headline";
import { Logo } from "@/client/components/logo";
import { Alert as MyAlert } from "@/client/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";
import { cn } from "@/client/lib/cn";
import { createContrast } from "@/client/lib/create-contrast";
import { hslToVariableValue } from "@/client/lib/hsl-to-variable-value";

import { colord } from "colord";
import { keys } from "remeda";

const Page = () => {
  return (
    <div className="container py-24">
      <div className="flex flex-col items-center gap-6">
        <Logo className="size-10" />
        <h1
          className={cn(
            "relative flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl",
          )}
        >
          Generate
          <span className="rounded-lg bg-primary px-2 py-1  tabular-nums text-primary-foreground lg:px-4 lg:py-2">
            Feedback Colors
          </span>
          for shadcn/ui
        </h1>

        <div className="pt-6">
          <Support />
        </div>
      </div>

      <div className="flex flex-col gap-20">
        <Generate />
        <Tailwind />
        <Styles />
        <Variants />
      </div>
    </div>
  );
};

const Generate = () => {
  return (
    <div>
      <Step step={1} title="Generate Colors" />

      <Feedback
        name="Success"
        range={{
          h: { min: 90, max: 160 },
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

const Tailwind = () => {
  const codeString = `destructive: {
  DEFAULT: "hsl(var(--destructive))",
  foreground: "hsl(var(--destructive-foreground))",
},
success: {
  DEFAULT: "hsl(var(--success))",
  foreground: "hsl(var(--success-foreground))",
},
warning: {
  DEFAULT: "hsl(var(--warning))",
  foreground: "hsl(var(--warning-foreground))",
},
info: {
  DEFAULT: "hsl(var(--info))",
  foreground: "hsl(var(--info-foreground))",
}
`;

  return (
    <div>
      <Step step={2} title="Add to Tailwind Config" />

      <MyAlert variant="warning" size="sm">
        Make sure you followed the{" "}
        <a
          href="https://ui.shadcn.com/docs/installation/manual"
          className="font-bold underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          installation guide
        </a>{" "}
        for shadcn/ui.
      </MyAlert>

      <p className="pb-4 pt-6">
        Add the colors to your config file. (Nested under theme ➡︎ extend ➡︎
        colors). Just search for{" "}
        <span className="font-medium">destructive</span> in your current config
        and insert it below.
      </p>
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          tailwind.config.js
        </p>

        <pre>
          <code className="relative block max-h-[800px] rounded bg-muted px-2 py-3 font-mono text-xs lg:text-sm">
            {codeString}
            <div className="absolute right-2 top-2">
              <CopyButton value={codeString} />
            </div>
          </code>
        </pre>
      </div>
    </div>
  );
};

const Styles = () => {
  const light = `--destructive: 0 100% 50%`;
  const dark = `--destructive: 0 100% 50%`;

  const codeString = `@layer base {
    :root {
${light}
    }
  
    .dark {
${dark}
    }
  }
`;

  return (
    <div>
      <Step step={3} title="Add Styles" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">globals.css</p>

        <pre>
          <code className="relative block max-h-[800px] rounded bg-muted px-2 py-3 font-mono text-xs lg:text-sm">
            {codeString}
            <div className="absolute right-2 top-2">
              <CopyButton value={codeString} />
            </div>
          </code>
        </pre>
      </div>
    </div>
  );
};

const Variants = () => {
  const variantKeys = keys.strict(variants);

  return (
    <div>
      <Step step={4} title="Add Variants" />
      <p className="pb-4">Add those variants to your component.</p>

      <Tabs defaultValue="button">
        <TabsList>
          {variantKeys.map((variant) => (
            <TabsTrigger key={variant} value={variant} className="capitalize">
              {variant}
            </TabsTrigger>
          ))}
        </TabsList>
        {variantKeys.map((variant) => (
          <TabsContent key={variant} value={variant}>
            <VariantTabContent variant={variant} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const variants = {
  button: [
    'destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive-foreground/10"',
    'success: "bg-success text-success-foreground hover:bg-success/90 border border-success-foreground/10"',
    'warning: "bg-warning text-warning-foreground hover:bg-warning/90 border border-warning-foreground/10"',
    'info: "bg-info text-info-foreground hover:bg-info/90 border border-info-foreground/10"',
  ],
  badge: [
    'destructive: "bg-destructive text-destructive-foreground border border-destructive-foreground/10"',
    'success: "bg-success text-success-foreground border border-success-foreground/10"',
    'warning: "bg-warning text-warning-foreground border border-warning-foreground/10"',
    'info: "bg-info text-info-foreground border border-info-foreground/10"',
  ],
  alert: [
    'destructive: "bg-destructive text-destructive-foreground border border-destructive-foreground/10"',
    'success: "bg-success text-success-foreground border border-success-foreground/10"',
    'warning: "bg-warning text-warning-foreground border border-warning-foreground/10"',
    'info: "bg-info text-info-foreground border border-info-foreground/10"',
  ],
};

const VariantTabContent = ({ variant }: { variant: keyof typeof variants }) => {
  const code = variants[variant];
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{`@/components/ui/${variant}.tsx`}</p>
      <CodeBlock code={code.join(",\n")} />
    </div>
  );
};

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre>
      <code className="relative block max-h-[800px] rounded bg-muted px-2 py-3 font-mono text-xs lg:text-sm">
        {code}
        <div className="absolute right-2 top-2">
          <CopyButton value={code} />
        </div>
      </code>
    </pre>
  );
};

const Step = ({ step, title }: { step: number; title: string }) => {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="grid size-12 place-items-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
        {step}
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
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
