import { z } from "zod";

const HslSchema = z.object({
  h: z.number(),
  s: z.number(),
  l: z.number(),
});

export type Hsl = z.infer<typeof HslSchema>;

export const ThemeSchema = z.object({
  background: HslSchema,
  foreground: HslSchema,
  card: HslSchema,
  cardForeground: HslSchema,
  popover: HslSchema,
  popoverForeground: HslSchema,
  primary: HslSchema,
  primaryForeground: HslSchema,
  secondary: HslSchema,
  secondaryForeground: HslSchema,
  muted: HslSchema,
  mutedForeground: HslSchema,
  accent: HslSchema,
  accentForeground: HslSchema,
  destructive: HslSchema,
  destructiveForeground: HslSchema,
  border: HslSchema,
  input: HslSchema,
  ring: HslSchema,
});

export type Theme = z.infer<typeof ThemeSchema>;

export const ThemeConfigSchema = z.object({
  light: ThemeSchema,
  dark: ThemeSchema,
});

export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;
