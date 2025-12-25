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
export const Shadcnblocks = () => {
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

const shadcnStudioUrl =
  "https://shadcnstudio.com/?utm_source=uijlndev&utm_medium=banner&utm_campaign=sponsor";

export const ShadcnStudio = () => {
  return (
    <div>
      <a
        href={shadcnStudioUrl}
        className="relative flex items-center justify-between gap-4 rounded-lg border px-2 py-6 text-sm hover:bg-accent/20"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await umami.track("ShadcnStudio Affiliate Click");
          } catch (error) {}

          window.location.href = shadcnStudioUrl;
        }}
      >
        <div className="flex items-center gap-2">
          <ShadcnStudioLogo />
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">Shadcnstudio.com</p>
            <p className="font-medium">shadcn blocks & templates</p>
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

const ShadcnStudioLogo = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 328 329"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-8"
    >
      <rect
        y="0.5"
        width="328"
        height="328"
        rx="164"
        fill="black"
        className="dark:fill-white"
      />
      <path
        d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
        stroke="white"
        strokeWidth="20"
        className="dark:stroke-black"
      />
      <path
        d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
        stroke="white"
        strokeWidth="20"
        className="dark:stroke-black"
      />
      <line
        x1="238.136"
        y1="98.8184"
        x2="196.76"
        y2="139.707"
        stroke="white"
        strokeWidth="20"
        className="dark:stroke-black"
      />
      <line
        x1="135.688"
        y1="200.957"
        x2="94.3128"
        y2="241.845"
        stroke="white"
        strokeWidth="20"
        className="dark:stroke-black"
      />
      <line
        x1="133.689"
        y1="137.524"
        x2="92.5566"
        y2="96.3914"
        stroke="white"
        strokeWidth="20"
        className="dark:stroke-black"
      />
      <line
        x1="237.679"
        y1="241.803"
        x2="196.547"
        y2="200.671"
        stroke="white"
        strokeWidth="20"
        className="dark:stroke-black"
      />
    </svg>
  );
};
