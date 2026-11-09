import { CopyButton } from "@/client/components/copy-button";
import { hslToCssValue } from "@/client/lib/hsl-to-variable-value";
import { type getMoreThemes } from "@/server/get-more-themes";
import { routes } from "@/shared/routes";
import { type Theme, type ThemeConfig } from "@/shared/theme-config";
import { configToCss } from "@/shared/theme-css";
import {
  describeTheme,
  getContrastChecks,
  hslToColorName,
  hslToHex,
  type ContrastCheck,
} from "@/shared/theme-insights";

const paletteTokens: { key: keyof Theme; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "foreground", label: "Foreground" },
  { key: "card", label: "Card" },
  { key: "cardForeground", label: "Card foreground" },
  { key: "popover", label: "Popover" },
  { key: "popoverForeground", label: "Popover foreground" },
  { key: "primary", label: "Primary" },
  { key: "primaryForeground", label: "Primary foreground" },
  { key: "secondary", label: "Secondary" },
  { key: "secondaryForeground", label: "Secondary foreground" },
  { key: "muted", label: "Muted" },
  { key: "mutedForeground", label: "Muted foreground" },
  { key: "accent", label: "Accent" },
  { key: "accentForeground", label: "Accent foreground" },
  { key: "destructive", label: "Destructive" },
  { key: "destructiveForeground", label: "Destructive foreground" },
  { key: "border", label: "Border" },
  { key: "input", label: "Input" },
  { key: "ring", label: "Ring" },
];

type Props = {
  name: string;
  config: ThemeConfig;
  moreThemes: Awaited<ReturnType<typeof getMoreThemes>>;
};

export const ThemeDetails = ({ name, config, moreThemes }: Props) => {
  const css = configToCss(config);

  return (
    <section className="container flex flex-col gap-12 py-16">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold lg:text-3xl">{name} for shadcn/ui</h2>
        <p className="max-w-3xl text-muted-foreground">
          {describeTheme(name, config)}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Color palette</h3>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Token</th>
                <th className="px-4 py-2 font-medium">Light</th>
                <th className="px-4 py-2 font-medium">Dark</th>
              </tr>
            </thead>
            <tbody>
              {paletteTokens.map(({ key, label }) => (
                <tr key={key} className="border-t">
                  <td className="px-4 py-2">{label}</td>
                  <PaletteCell theme={config.light} token={key} />
                  <PaletteCell theme={config.dark} token={key} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Contrast</h3>
        <p className="text-sm text-muted-foreground">
          WCAG 2 contrast ratios between each background and its foreground
          color.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <ContrastTable
            title="Light mode"
            checks={getContrastChecks(config.light)}
          />
          <ContrastTable
            title="Dark mode"
            checks={getContrastChecks(config.dark)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">CSS variables</h3>
        <p className="text-sm text-muted-foreground">
          Paste this into your <code>globals.css</code> to use {name} in your
          shadcn/ui project.
        </p>
        <div className="relative rounded-md border bg-muted">
          <CopyButton value={css} />
          <pre className="max-h-96 overflow-auto">
            <code className="block px-4 py-3 font-mono text-xs lg:text-sm">
              {css}
            </code>
          </pre>
        </div>
      </div>

      {moreThemes.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">More shadcn/ui themes</h3>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {moreThemes.map((theme) => (
              <li key={theme.id}>
                {/* Plain anchor: theme pages hydrate their atoms once, so they need a full page load */}
                <a
                  href={routes.theme(theme.id)}
                  className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm hover:bg-accent/40"
                >
                  <span className="flex shrink-0">
                    {(["primary", "secondary", "accent"] as const).map(
                      (key) => (
                        <span
                          key={key}
                          className="-ml-1 size-4 rounded-full border first:ml-0"
                          style={{
                            backgroundColor: hslToCssValue(
                              theme.config.light[key],
                            ),
                          }}
                        />
                      ),
                    )}
                  </span>
                  <span className="truncate">{theme.name || "Untitled"}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

const PaletteCell = ({
  theme,
  token,
}: {
  theme: Theme;
  token: keyof Theme;
}) => {
  const hsl = theme[token];

  return (
    <td className="px-4 py-2">
      <div className="flex items-center gap-2">
        <span
          className="size-4 shrink-0 rounded border"
          style={{ backgroundColor: hslToCssValue(hsl) }}
        />
        <span className="font-mono">{hslToHex(hsl)}</span>
        <span className="text-muted-foreground max-md:hidden">
          {hslToColorName(hsl)}
        </span>
      </div>
    </td>
  );
};

const ContrastTable = ({
  title,
  checks,
}: {
  title: string;
  checks: ContrastCheck[];
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <caption className="bg-muted px-4 py-2 text-left font-medium">
          {title}
        </caption>
        <tbody>
          {checks.map((check) => (
            <tr key={check.label} className="border-t">
              <td className="px-4 py-2">{check.label}</td>
              <td className="px-4 py-2 text-right font-mono">
                {check.ratio.toFixed(2)}:1
              </td>
              <td className="px-4 py-2 text-right">{check.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
