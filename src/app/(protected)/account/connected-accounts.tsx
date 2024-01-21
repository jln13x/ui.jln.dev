import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import { authProviders } from "@/app/(auth)/auth-providers";
import { api } from "@/trpc/server";

export const ConnectedAccounts = async () => {
  const accounts = await api.user.accounts.query();

  const availableProviders = accounts.map((a) => a.provider);

  const connectedProvider = authProviders.filter((p) =>
    availableProviders.includes(p.id),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Those are the accounts you used to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 && (
          <p className="text-sm">You have no connected accounts.</p>
        )}
        <div className="flex items-center gap-4 py-2">
          {connectedProvider.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-muted-foreground"
            >
              <p.icon className="size-4" />
              <p className="text-sm font-medium">{p.label} </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
