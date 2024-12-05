import * as Icons from "@/client/components/icons";
import { cn } from "@/client/lib/cn";

export const Spinner = ({ className }: { className?: string }) => {
  return <Icons.Loader className={cn("animate-spin", className)} />;
};
