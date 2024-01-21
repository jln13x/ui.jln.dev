import { cn } from "@/client/lib/cn";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-md border border-border/60 bg-foreground/5 shadow-xl shadow-black/5 will-change-transform before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-foreground/10 before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent",
        className,
      )}
    />
  );
};
