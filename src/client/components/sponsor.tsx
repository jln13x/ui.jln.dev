import * as Icons from "@/client/components/icons";
import { Button } from "@/client/components/ui/button";

const contactUrl = "https://dm.new/jln";
export const SponsorContact = () => {
  return (
    <div>
      <a
        href={contactUrl}
        className="flex items-center justify-between gap-4 rounded-lg border px-4 py-6 text-sm hover:bg-accent/20"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await umami.track("Sponsor Click");
          } catch (error) {}

          window.location.href = contactUrl;
        }}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex flex-col">
            <p className="font-medium">Promote your product</p>
            <p>Get in touch with me to promote your product here</p>
          </div>
        </div>

        <Button size="xs" variant="secondary">
          <Icons.ChevronRight className="size-4 sm:hidden" />
          <span className="max-sm:sr-only">Contact</span>
        </Button>
      </a>
    </div>
  );
};

const affiliateUrl = "https://www.shadcnblocks.com?via=uijlndev";
export const Sponsor = () => {
  return (
    <div>
      <a
        href={affiliateUrl}
        className="relative flex items-center justify-between gap-4 rounded-lg border px-2 py-6 text-sm hover:bg-accent/20"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await umami.track("ShadcnBlocks Affiliate Click");
          } catch (error) {}

          window.location.href = affiliateUrl;
        }}
      >
        <div className="flex items-center gap-2">
          <ShadcnBlocksLogo />
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">Shadcnblocks.com</p>
            <p className="font-medium">500+ Premium blocks for shadcn/ui</p>
          </div>
        </div>

        <Button size="xs" variant="secondary">
          <Icons.ChevronRight className="size-4 sm:hidden" />
          <span className="max-sm:sr-only">Explore</span>
        </Button>
        <p className="absolute bottom-0 left-2 pr-2 pt-1 text-end text-[8px] text-muted-foreground/50 sm:text-[10px]">
          Affiliate
        </p>
      </a>
    </div>
  );
};

const ShadcnBlocksLogo = () => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 invert"
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
