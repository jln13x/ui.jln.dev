import * as Icons from "@/client/components/icons";
import { cn } from "@/client/lib/cn";

export const Star = ({
  filled,
  className,
}: {
  filled?: boolean;
  className?: string;
}) => {
  return (
    <Icons.Star
      className={cn("size-4", className, {
        "fill-yellow-500 stroke-yellow-500": filled,
      })}
    />
  );
};
