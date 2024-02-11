"use client";

import { useState } from "react";

import * as Icons from "@/client/components/icons";
import { Button } from "@/client/components/ui/button";

import { useCopyToClipboard } from "@jlns/hooks";

export const CopyButton = ({ value }: { value: string }) => {
  const { copy } = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="sm"
      onClick={async () => {
        await copy(value);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? (
        <Icons.Check className="mr-2 size-3" />
      ) : (
        <Icons.Copy className="mr-2 size-3" />
      )}
      Copy
    </Button>
  );
};
