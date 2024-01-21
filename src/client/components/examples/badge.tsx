import { Badge } from "@/client/components/customizable/badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge className="bg-accent text-accent-foreground  hover:bg-accent/80">
        Accent
      </Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}
