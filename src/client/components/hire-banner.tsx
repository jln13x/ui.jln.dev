import { ArrowRightIcon } from "lucide-react";

const BOOKING_URL = "https://cal.com/jlnlabs/chat";

// Keep this true: update or clear it once the month's slot is taken.
const AVAILABILITY = "1 slot open this month";

// Each variant needs literal class names so Tailwind can generate them.
const HIRE_BANNER_VARIANTS = [
  {
    id: "makers",
    className: "[[data-hire-variant=makers]_&]:block",
    mobile: "By the makers of ui.jln.dev",
    desktop: "We built ui.jln.dev. Now we build your product.",
    mobileCta: "Book a call",
    desktopCta: "Check availability",
  },
  {
    id: "ai",
    className: "[[data-hire-variant=ai]_&]:block",
    mobile: "AI features?",
    desktop: "We build AI features into your product.",
    mobileCta: "Book a call",
    desktopCta: "Check availability",
  },
  {
    id: "slop-police",
    className: "[[data-hire-variant=slop-police]_&]:block",
    mobile: "🚨 Slop police",
    desktop: "🚨 Slop police: we clean up vibe-coded apps.",
    mobileCta: "Report it",
    desktopCta: "Report your app",
  },
] as const;

const HIRE_VARIANT_IDS = HIRE_BANNER_VARIANTS.map((variant) => variant.id);

/**
 * Picks a banner variant per full page load before first paint, without
 * cookies or storage. Client-side navigation keeps the same variant.
 */
export const HireBannerVariantScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var v=${JSON.stringify(HIRE_VARIANT_IDS)};document.documentElement.dataset.hireVariant=v[Math.floor(Math.random()*v.length)]})()`,
      }}
    />
  );
};

export const HireBanner = () => {
  return HIRE_BANNER_VARIANTS.map((variant) => (
    <a
      key={variant.id}
      href={`${BOOKING_URL}?utm_source=ui.jln.dev&utm_medium=banner&utm_content=${variant.id}`}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="hire-banner-click"
      data-umami-event-variant={variant.id}
      className={`group hidden bg-blue-600 text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-blue-300 ${variant.className}`}
    >
      <div className="container flex h-9 items-center justify-center gap-3 text-center text-sm">
        {AVAILABILITY ? (
          <span className="flex shrink-0 items-center gap-1.5 md:rounded-full md:border md:border-white/25 md:bg-white/15 md:px-2.5 md:py-0.5 md:text-xs md:font-medium">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-green-400 ring-[3px] ring-green-400/25"
            />
            <span className="sr-only md:not-sr-only">{AVAILABILITY}</span>
          </span>
        ) : null}
        <span className="truncate">
          <span className="sm:hidden">{variant.mobile}</span>
          <span className="hidden sm:inline">{variant.desktop}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 font-semibold underline-offset-4 group-hover:underline">
          <span className="sm:hidden">{variant.mobileCta}</span>
          <span className="hidden sm:inline">{variant.desktopCta}</span>
          <ArrowRightIcon
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  ));
};
