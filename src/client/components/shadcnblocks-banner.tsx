import { ArrowUpRightIcon } from "lucide-react";

const SHADCNBLOCKS_URL = "https://link.jln.dev/shadcnblocks";
const STAR_GRADIENT = "radial-gradient(circle, #fcd34d, transparent 10%)";
const STAR_DURATION = "6s";

export const ShadcnblocksBanner = ({
  surface,
}: {
  surface: "homepage" | "theme-page";
}) => {
  return (
    <a
      href={SHADCNBLOCKS_URL}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-umami-event="affiliate-banner-click"
      data-umami-event-namespace="@shadcnblocks"
      data-umami-event-surface={surface}
      data-umami-event-campaign={`${surface}-banner`}
      className="group relative block w-full max-w-lg overflow-hidden rounded-lg py-0.5 text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-amber-400/60"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-[-11px] right-[-250%] h-1/2 w-[300%] animate-star-movement-bottom rounded-full"
        style={{ background: STAR_GRADIENT, animationDuration: STAR_DURATION }}
      />
      <span
        aria-hidden="true"
        className="absolute left-[-250%] top-[-10px] h-1/2 w-[300%] animate-star-movement-top rounded-full"
        style={{ background: STAR_GRADIENT, animationDuration: STAR_DURATION }}
      />
      <span className="relative flex items-center justify-between gap-4 rounded-[calc(var(--radius)-1px)] border bg-background p-4">
        <span className="flex min-w-0 items-center gap-3">
          <ShadcnblocksLogo className="size-9 shrink-0" />
          <span className="min-w-0">
            <span className="block text-base font-semibold leading-snug">
              Premium blocks for shadcn/ui
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Shadcnblocks.com · Affiliate
            </span>
          </span>
        </span>
        <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-gradient-to-b from-amber-200 to-amber-400 px-3 text-sm font-medium text-amber-950 shadow-sm transition-[filter] group-hover:brightness-110">
          <span className="sr-only sm:not-sr-only">Explore</span>
          <ArrowUpRightIcon aria-hidden="true" className="size-4" />
        </span>
      </span>
    </a>
  );
};

const ShadcnblocksLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g>
        <path d="m700.78 88.312-39.328-22.547v186.94l39.328 22.828z" />
        <path d="m780 134.39-39.375-22.781v187.18l39.375 22.594z" />
        <path d="m858.47 180.24-39.328-22.547v186.94l39.328 22.594z" />
        <path d="m185.53 360.71 39.328 22.594v-133.69l-39.328 22.547z" />
        <path d="m146.16 337.92v-42.469l-37.219 21.328z" />
        <path d="m1095.4 317.29-39.141-22.594v45.375l-39.375 22.547v-90.469l-39.094-22.547v135.1l-39.375 22.594v-181.22l-40.078-23.297v187.22l35.297 20.625v378.74l-1.9219 1.1719-33.375-19.172v38.625l-39.844 22.547v-85.172l-39.328-23.297v131.29l-39.141 23.25v-177.84l-39.375-23.25v223.69l-39.844 22.547v-269.53l-39.328-23.297v315.37l-39.375 23.531v-362.16l-19.219-12.75 0.75-376.08 18.469 11.297v-186.94l-20.625-12-16.594 9.3281v187.69l-39.797 22.547v-186.94l-39.375 22.547v186.98l-39.375 22.781v-186.47l-39.094 22.547v186.47l-40.078 22.594v-186.24l-39.141 23.25v185.76l-39.375 23.297v-186.52l-43.922 25.922v179.06l6 3.375 1.4531 381.32 36.469 21.375v-42.469l39.375-23.297v89.062l39.141 22.781v-135.14l40.078-24v181.69l39.094 23.297v-228.24l39.375-23.297v274.08l39.375 22.828v-320.44l39.797-23.25v366.94l18 10.594v-0.75 188.39l493.22-284.86 0.70312-568.55z" />
      </g>
    </svg>
  );
};
