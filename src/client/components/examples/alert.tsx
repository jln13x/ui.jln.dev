import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/client/components/customizable/alert";
import * as Icons from "@/client/components/icons";

export function AlertDemo() {
  return (
    <Alert variant="destructive">
      <Icons.Check className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
