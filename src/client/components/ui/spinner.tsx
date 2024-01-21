import { cn } from "@/client/lib/cn";

import * as Icons from "@/client/components/icons";

export const Spinner = ({ className }: { className?: string }) => {
  return <Icons.Loader className={cn("animate-spin", className)} />;
};
