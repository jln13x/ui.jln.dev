"use client";

import { useState } from "react";

import { Button } from "@/client/components/ui/button";
import { Spinner } from "@/client/components/ui/spinner";
import { useAuth } from "@/client/lib/use-auth";
import { authProviders } from "@/app/(auth)/auth-providers";

export const Providers = () => {
  const { signIn } = useAuth();

  const [loadingProvider, setLoadingProvider] = useState<string>();

  return (
    <div className="flex justify-center gap-4 rounded-lg border  border-dashed bg-secondary/10 px-4 py-12">
      {authProviders.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          onClick={() => {
            setLoadingProvider(provider.id);
            void signIn(provider.id);
          }}
          disabled={loadingProvider === provider.id}
        >
          {loadingProvider === provider.id ? (
            <Spinner className="mr-2 h-4 w-4" />
          ) : (
            <provider.icon className="mr-2 h-4 w-4" />
          )}

          {provider.label}
        </Button>
      ))}
    </div>
  );
};
