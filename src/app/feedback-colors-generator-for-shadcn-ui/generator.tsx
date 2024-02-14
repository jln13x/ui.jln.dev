"use client";

import { useState } from "react";

import { CopyButton } from "@/client/components/copy-button";
import { Alert } from "@/client/components/customizable/alert";
import * as Icons from "@/client/components/icons";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { Alert as MyAlert } from "@/client/components/ui/alert";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { Label } from "@/client/components/ui/label";
import { Skeleton } from "@/client/components/ui/skeleton";
import { Switch } from "@/client/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { cn } from "@/client/lib/cn";
import { createContrast } from "@/client/lib/create-contrast";
import {
  hslToCssValue,
  hslToVariableValue,
} from "@/client/lib/hsl-to-variable-value";
import { useResolvedTheme } from "@/client/lib/use-resolved-theme";

import { useCopyToClipboard } from "@jlns/hooks";
import { colord, type HslaColor } from "colord";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Info } from "lucide-react";
import { keys, mapValues, range } from "remeda";
import { toast } from "sonner";

export const Generate = () => {
  const theme = useResolvedTheme();
  const { setColors } = useColors();
  const styles = useStyles();

  const [checked, setChecked] = useState(true);

  const oppositeTheme = theme === "light" ? "dark" : "light";

  return (
    <div>
      <Step step={1} title="Generate Colors" />
      <div className="flex justify-between py-4">
        <ThemeSwitch />
        <CopyButton value={styles} />
      </div>

      {theme ? (
        <div>
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <Feedback name="destructive" />
            <Feedback name="success" />
            <Feedback name="warning" />
            <Feedback name="info" />
            <div className="flex flex-col gap-2 pt-6">
              <div className="flex items-center gap-1">
                <Switch
                  id="randomize-all"
                  checked={checked}
                  onCheckedChange={setChecked}
                />
                <Label htmlFor="randomize-all">
                  Overwrite {oppositeTheme} theme
                </Label>
              </div>
              <Button
                className="w-full"
                variant="secondary"
                size="lg"
                onClick={() => {
                  const randomColors = randomizeAll();

                  // @ts-expect-error idc
                  setColors((colors) => {
                    return {
                      destructive: colors.destructive.isLocked
                        ? colors.destructive
                        : {
                            colors: {
                              [theme]: randomColors.destructive[theme],
                              [oppositeTheme]: checked
                                ? randomColors.destructive[oppositeTheme]
                                : colors.destructive.colors[oppositeTheme],
                            },
                            isLocked: false,
                          },
                      success: colors.success.isLocked
                        ? colors.success
                        : {
                            colors: {
                              [theme]: randomColors.success[theme],
                              [oppositeTheme]: checked
                                ? randomColors.success[oppositeTheme]
                                : colors.success.colors[oppositeTheme],
                            },
                            isLocked: false,
                          },
                      warning: colors.warning.isLocked
                        ? colors.warning
                        : {
                            colors: {
                              [theme]: randomColors.warning[theme],
                              [oppositeTheme]: checked
                                ? randomColors.warning[oppositeTheme]
                                : colors.warning.colors[oppositeTheme],
                            },
                            isLocked: false,
                          },
                      info: colors.info.isLocked
                        ? colors.info
                        : {
                            colors: {
                              [theme]: randomColors.info[theme],
                              [oppositeTheme]: checked
                                ? randomColors.info[oppositeTheme]
                                : colors.info.colors[oppositeTheme],
                            },
                            isLocked: false,
                          },
                    };
                  });
                }}
              >
                <Icons.Dices className="mr-2 size-4" />
                Randomize All
              </Button>
            </div>
          </div>
          <Examples />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {range(0, 4).map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      )}
    </div>
  );
};

const Examples = () => {
  const theme = useResolvedTheme();
  const { setColors } = useColors();
  const [open, setOpen] = useState(false);

  const createExamples = () => {
    if (!theme) return null;
    return range(0, 100).map(() => {
      return randomizeAll();
    });
  };
  const [examples, setExamples] = useState(createExamples());

  if (!examples || !theme) return null;

  return (
    <div className="flex flex-col gap-4 py-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-lg font-bold">Need inspiration? I got you!</div>
        {!open ? (
          <Button onClick={() => setOpen(true)}>Show 100 examples</Button>
        ) : (
          <div className="flex  gap-2 max-sm:flex-col sm:items-center">
            <Button
              onClick={() => {
                setExamples(createExamples());
              }}
              size="sm"
            >
              Generate 100 new examples
            </Button>

            <Button size="sm" onClick={() => setOpen(false)} variant="outline">
              Hide examples
            </Button>
          </div>
        )}
      </div>
      {open && (
        <div className="rounded-lg border bg-muted/40">
          <div className="flex h-[600px] max-h-[50vh] flex-wrap justify-center gap-4 overflow-y-auto py-8 scrollbar-thin">
            {examples.map((example, index) => (
              <button
                className="flex h-16 items-center gap-0.5 rounded-lg px-4 py-2 hover:bg-accent"
                key={index}
                onClick={() => {
                  setColors({
                    destructive: {
                      colors: example.destructive,
                      isLocked: false,
                    },
                    success: {
                      colors: example.success,
                      isLocked: false,
                    },
                    warning: {
                      colors: example.warning,
                      isLocked: false,
                    },
                    info: {
                      colors: example.info,
                      isLocked: false,
                    },
                  });
                }}
              >
                <div
                  className="grid h-full w-8 flex-1 flex-shrink-0 place-items-center rounded border"
                  style={{
                    backgroundColor: hslToCssValue(
                      example.destructive[theme].background,
                    ),
                    color: hslToCssValue(example.destructive[theme].foreground),
                  }}
                >
                  D
                </div>
                <div
                  className="grid h-full w-8 flex-1 flex-shrink-0 place-items-center rounded border"
                  style={{
                    backgroundColor: hslToCssValue(
                      example.success[theme].background,
                    ),
                    color: hslToCssValue(example.success[theme].foreground),
                  }}
                >
                  S
                </div>
                <div
                  className="grid h-full w-8 flex-1 flex-shrink-0 place-items-center rounded border"
                  style={{
                    backgroundColor: hslToCssValue(
                      example.warning[theme].background,
                    ),
                    color: hslToCssValue(example.warning[theme].foreground),
                  }}
                >
                  W
                </div>
                <div
                  className="grid h-full w-8 flex-1 flex-shrink-0 place-items-center rounded border"
                  style={{
                    backgroundColor: hslToCssValue(
                      example.info[theme].background,
                    ),
                    color: hslToCssValue(example.info[theme].foreground),
                  }}
                >
                  I
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Tailwind = () => {
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

      <div className="py-2">
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
      </div>

      <p className="pb-4 pt-6 text-sm lg:text-base">
        Add the colors to your config file. (Nested under theme ➡︎ extend ➡︎
        colors). Just search for{" "}
        <span className="font-medium">destructive</span> in your current config
        and insert it below.
      </p>
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          tailwind.config.js
        </p>

        <CodeBlock code={codeString} />
      </div>
    </div>
  );
};

export const Styles = () => {
  const codeString = useStyles();

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

export const Variants = () => {
  const variantKeys = keys.strict(variants);

  return (
    <div>
      <Step step={4} title="Optional: Add Variants" />
      <p className="pb-4">Add new variants to your components.</p>

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
        <div className="h-full w-full overflow-scroll">{code}</div>
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

const ranges = {
  destructive: {
    light: {
      h: { min: 0, max: 15 },
      s: { min: 40, max: 100 },
      l: { min: 40, max: 90 },
    },
    dark: {
      h: { min: 0, max: 15 },
      s: { min: 40, max: 100 },
      l: { min: 5, max: 25 },
    },
  },

  success: {
    light: {
      h: { min: 90, max: 160 },
      s: { min: 40, max: 100 },
      l: { min: 40, max: 90 },
    },
    dark: {
      h: { min: 90, max: 160 },
      s: { min: 40, max: 100 },
      l: { min: 5, max: 25 },
    },
  },

  warning: {
    light: {
      h: { min: 20, max: 55 },
      s: { min: 40, max: 100 },
      l: { min: 40, max: 90 },
    },
    dark: {
      h: { min: 15, max: 55 },
      s: { min: 40, max: 100 },
      l: { min: 5, max: 25 },
    },
  },

  info: {
    light: {
      h: { min: 180, max: 240 },
      s: { min: 40, max: 100 },
      l: { min: 40, max: 90 },
    },
    dark: {
      h: { min: 180, max: 240 },
      s: { min: 40, max: 100 },
      l: { min: 5, max: 25 },
    },
  },
};

type Feedback = keyof typeof ranges;

const Feedback = ({ name }: { name: Feedback }) => {
  const theme = useResolvedTheme();
  const { copy } = useCopyToClipboard();

  const { colors, generateColor: generate, lock } = useColors();

  if (!theme) return null;

  const pair = colors[name].colors[theme];
  const locked = colors[name].isLocked;

  const contrast = colord(pair.background).contrast(colord(pair.foreground));

  return (
    <div>
      <div className="flex h-full w-full flex-wrap justify-between gap-1">
        <Alert
          className="min-w-[200px] flex-1 bg-[hsl(var(--bg))] capitalize text-[hsl(var(--fg))]"
          style={{
            // @ts-expect-error idc
            "--bg": hslToVariableValue(pair.background),
            "--fg": hslToVariableValue(pair.foreground),
          }}
        >
          <div className="flex justify-between gap-4">
            {name}
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="flex items-center gap-2 bg-muted text-muted-foreground"
                >
                  {contrast > 4.5 ? (
                    <Icons.Check className="size-3 text-success-foreground" />
                  ) : (
                    <Icons.X className="size-3 text-destructive-foreground" />
                  )}
                  {contrast.toFixed(2)}
                  <Info className="size-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Contrast ratio:{" "}
                {colord(pair.background).contrast(colord(pair.foreground))}
              </TooltipContent>
            </Tooltip>
          </div>
        </Alert>
        <div className="flex flex-shrink-0  gap-2">
          <Button
            variant="secondary"
            className="h-auto flex-1 rounded-lg border text-foreground"
            onClick={() => generate(name)}
            disabled={locked}
          >
            <span className="sr-only">Randomize</span>
            <Icons.Dices className="size-4" />
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  lock(name);
                }}
                variant="outline"
                className={cn("h-full flex-1 flex-shrink-0", {
                  "border border-warning-border bg-warning text-warning-foreground":
                    locked,
                })}
              >
                {locked ? (
                  <Icons.Lock className="size-4" />
                ) : (
                  <Icons.Unlock className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{locked ? "Unlock" : "Lock"}</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-full flex-1 flex-shrink-0 max-lg:hidden"
              >
                <Icons.Copy className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Background</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {
                      const variable = hslToVariableValue(pair.background);
                      copy(`--${name}: ${variable};`);
                      toast("Copied to clipboard");
                    }}
                  >
                    Variable
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const hex = colord(pair.background).toHex();

                      copy(hex);
                      toast("Copied to clipboard");
                    }}
                  >
                    Hex
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const hsl = colord(pair.background).toHslString();

                      copy(hsl);
                      toast("Copied to clipboard");
                    }}
                  >
                    HSL
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Foreground</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {
                      const variable = hslToVariableValue(pair.foreground);
                      copy(`--${name}-foreground: ${variable};`);
                      toast("Copied to clipboard");
                    }}
                  >
                    Variable
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const hex = colord(pair.foreground).toHex();

                      copy(hex);
                      toast("Copied to clipboard");
                    }}
                  >
                    Hex
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const hsl = colord(pair.foreground).toHslString();

                      copy(hsl);
                      toast("Copied to clipboard");
                    }}
                  >
                    HSL
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const random = randomizeAll();

const atom = atomWithStorage("colors", {
  destructive: {
    colors: {
      light: random.destructive.light,
      dark: random.destructive.dark,
    },
    isLocked: false,
  },
  success: {
    colors: {
      light: random.success.light,
      dark: random.success.dark,
    },
    isLocked: false,
  },
  warning: {
    colors: {
      light: random.warning.light,
      dark: random.warning.dark,
    },
    isLocked: false,
  },
  info: {
    colors: {
      light: random.info.light,
      dark: random.info.dark,
    },
    isLocked: false,
  },
});

const useColors = () => {
  const [colors, setColors] = useAtom(atom);
  const theme = useResolvedTheme();

  const generateColor = (name: Feedback) => {
    if (!theme) return;
    const range = ranges[name];
    const pair = generate(range[theme]);

    const isLocked = colors[name].isLocked;

    if (isLocked) {
      return;
    }

    setColors((prev) => ({
      ...prev,
      [name]: {
        colors: {
          ...prev[name].colors,
          [theme]: pair,
        },
        isLocked: false,
      },
    }));
  };

  const lock = (name: Feedback) => {
    setColors((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isLocked: !prev[name].isLocked,
      },
    }));
  };

  return { colors, generateColor, lock, setColors };
};

function generate(range: {
  h: { min: number; max: number };
  s: { min: number; max: number };
  l: { min: number; max: number };
}) {
  const base = colord({
    h: randomNumberInRange(range.h.min, range.h.max),
    s: randomNumberInRange(range.s.min, range.s.max),
    l: randomNumberInRange(range.l.min, range.l.max),
  });

  const foreground = createContrast(base);

  return {
    background: base.toHsl(),
    foreground: foreground.toHsl(),
  };
}

function randomizeAll() {
  const destructive = ranges.destructive;
  const lightBaseSaturation = randomNumberInRange(
    destructive.light.s.min,
    destructive.light.s.max,
  );
  const lightBaseLightness = randomNumberInRange(
    destructive.light.l.min,
    destructive.light.l.max,
  );

  const darkBaseSaturation = lightBaseSaturation;

  const darkBaseLightness = randomNumberInRange(
    destructive.dark.l.min,
    destructive.dark.l.max,
  );

  return mapValues(ranges, (value) => {
    const light = colord({
      h: randomNumberInRange(value.light.h.min, value.light.h.max),
      s: lightBaseSaturation,
      l: lightBaseLightness,
    });

    const lightForeground = createContrast(light);

    const dark = colord({
      h: randomNumberInRange(value.dark.h.min, value.dark.h.max),
      s: darkBaseSaturation,
      l: darkBaseLightness,
    });

    const darkForeground = createContrast(dark);

    return {
      light: {
        background: light.toHsl(),
        foreground: lightForeground.toHsl(),
      },
      dark: {
        background: dark.toHsl(),
        foreground: darkForeground.toHsl(),
      },
    };
  });
}

const useStyles = () => {
  const { colors } = useColors();
  const space = `      `;

  const pairs = Object.entries(colors);

  const toOutput = (
    key: string,
    background: HslaColor,
    foreground: HslaColor,
  ) => {
    return `${space}--${key}: ${hslToVariableValue(
      background,
    )};\n${space}--${key}-foreground: ${hslToVariableValue(foreground)};`;
  };

  const light = pairs
    .map(([key, value]) =>
      toOutput(
        key,
        value.colors.light.background,
        value.colors.light.foreground,
      ),
    )
    .join("\n");

  const dark = pairs
    .map(([key, value]) =>
      toOutput(key, value.colors.dark.background, value.colors.dark.foreground),
    )
    .join("\n");

  const codeString = `@layer base {
    :root {
${light}
    }
  
    .dark {
${dark}
    }
  }
`;

  return codeString;
};
