import * as Icons from "@/client/components/icons";
import { Button } from "@/client/components/ui/button";

const url = "https://dm.new/jln";
export const Sponsor = () => {
  return (
    <div>
      <a
        href={url}
        className="flex items-center justify-between gap-4 rounded-lg border px-4 py-4 text-sm hover:bg-accent/20"
        onClick={async (e) => {
          e.preventDefault();
          try {
            await umami.track("Sponsor Click");
          } catch (error) {}

          window.location.href = url;
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
