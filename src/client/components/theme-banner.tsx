"use client";

import { useRouter } from "next/navigation";

import { DeleteTheme } from "@/client/components/delete-theme";
import * as Icons from "@/client/components/icons";
import { Public } from "@/client/components/menu/public";
import { Star } from "@/client/components/star";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { useSelectedTheme } from "@/client/lib/use-selected-theme";
import { useSetThemeConfig } from "@/client/lib/use-theme-config";
import { routes } from "@/shared/routes";
import { api } from "@/trpc/react";

import { useCopyToClipboard } from "@jlns/hooks";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const ThemeBanner = () => {
  const sesh = useSession();
  const theme = useSelectedTheme();
  const setThemeConfig = useSetThemeConfig();
  const { copy } = useCopyToClipboard();

  if (!theme) return null;

  return (
    <div className="sticky inset-x-0 top-0 z-50  backdrop-blur-sm duration-300 animate-in slide-in-from-top-12">
      <div className="flex border-b border-accent bg-background/80 py-2">
        <div className="container flex items-center justify-between gap-6">
          <p className="truncate text-sm font-bold lg:text-xl">{theme.name}</p>

          <div className="flex items-center gap-2">
            {sesh.data?.user.id === theme.userId ? (
              <div className="flex items-center gap-2 px-2 py-1">
                <Star />
                <Badge variant="info">{theme.stars}</Badge>
              </div>
            ) : (
              <StarTheme
                themeId={theme.id}
                count={theme.stars}
                starred={theme.starred}
              />
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={async () => {
                    const host = "https://ui.jln.dev";

                    const url = host + routes.theme(theme.id);

                    await copy(url);
                    toast("Copied theme URL to clipboard", {
                      action: {
                        label: "View",
                        onClick: () => {
                          window.open(url);
                        },
                      },
                    });
                  }}
                >
                  <Icons.Share className="mr-2 size-4" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share this theme with others.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setThemeConfig(theme.config);
                  }}
                >
                  <Icons.Reset className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Reset the current theme to its default values.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      {sesh.data?.user.id === theme.userId && (
        <div className="border-b border-info-foreground/20 bg-info/80 py-1 text-info-foreground">
          <div className="container flex items-center justify-between gap-6">
            <p className="text-xs font-bold">This is your theme.</p>
            <div className="flex items-center gap-1 text-xs">
              <DeleteTheme theme={theme} />
              <Public theme={theme} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StarTheme = ({
  themeId,
  count,
}: {
  themeId: string;
  count: number;
  starred: boolean;
}) => {
  const utils = api.useUtils();

  const toggleStarred = () => {
    utils.theme.byId.setData({ id: themeId }, (theme) => {
      if (!theme) return undefined;

      return {
        ...theme,
        starred: !theme.starred,
        stars: theme.starred ? theme.stars - 1 : theme.stars + 1,
      };
    });
  };

  const { mutate } = api.theme.toggleStar.useMutation({
    onMutate: () => {
      void utils.theme.byId.cancel({ id: themeId });
      toggleStarred();
    },
    onSuccess: () => {
      void utils.theme.byId.invalidate({ id: themeId });
      void utils.theme.allStarredFromUser.invalidate();
    },
    onError: (error) => {
      if (error.data?.code === "TOO_MANY_REQUESTS") {
        toast.error("Too many requests, please try again later");
      }
      toggleStarred();
    },
  });

  const theme = useSelectedTheme();
  const sesh = useSession();
  const router = useRouter();

  if (!theme) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="flex items-center gap-2"
          size="sm"
          variant="secondary"
          onClick={() => {
            if (!sesh.data?.user) {
              toast.error("You must be logged in to star a theme");
              router.push(routes.signin);

              return;
            }

            mutate({
              themeId,
              starred: !theme.starred,
            });
          }}
        >
          <Star filled={theme.starred} />
          <span className="sr-only">Star</span>
          <Badge variant="info">{count}</Badge>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {theme.starred ? "Unstar this theme" : "Star this theme"}
      </TooltipContent>
    </Tooltip>
  );
};
