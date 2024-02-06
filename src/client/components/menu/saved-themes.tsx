"use client";

import { Fragment } from "react";
import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import { ThemeLink } from "@/client/components/theme-link";
import { Alert } from "@/client/components/ui/alert";
import { Button } from "@/client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import { Skeleton } from "@/client/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";
import { routes } from "@/shared/routes";
import { api } from "@/trpc/react";

import { useIsMobile } from "@jlns/hooks";
import { useSession } from "next-auth/react";
import { RemoveScroll } from "react-remove-scroll";
import { range } from "remeda";
import { toast } from "sonner";

export const SavedThemes = () => {
  const sesh = useSession();

  const isMobile = useIsMobile();

  if (!sesh.data) {
    return (
      <MenuButton asChild>
        <Link
          href={routes.signin}
          onClick={() => {
            toast.error("You must be logged in to view your saved themes.");
          }}
        >
          <Icons.Palette className="size-4 lg:mr-2" />
          <span className="max-lg:sr-only">Saved</span>
        </Link>
      </MenuButton>
    );
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <MenuButton>
            <Icons.Palette className="size-4 lg:mr-2" />
            <span className="max-lg:sr-only">Saved</span>
          </MenuButton>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="max-h-[80svh] overflow-auto p-4 scrollbar-thin">
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return <Saved />;
};

const Saved = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuButton>
          <Icons.Palette className="size-4 lg:mr-2" />
          <span className="max-lg:sr-only">Saved</span>
        </MenuButton>
      </PopoverTrigger>

      <PopoverContent className="max-h-[75vh] w-screen max-w-screen-lg overflow-auto scrollbar-thin">
        <Content />
      </PopoverContent>
    </Popover>
  );
};

const Content = () => {
  return (
    <div>
      <div className="flex flex-col gap-1.5">
        <p className="text-lg font-semibold leading-none tracking-tight">
          Your Themes
        </p>
        <p className="text-sm text-muted-foreground">
          Themes you have saved or starred.
        </p>
      </div>

      <Tabs defaultValue="saved" className="pt-4">
        <TabsList>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>
        <TabsContent value="saved">
          <Themes />
        </TabsContent>
        <TabsContent value="starred">
          <StarredThemes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Themes = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    api.theme.allFromUser.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const themes = data?.pages.flatMap((page) => page.themes) ?? [];

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-2 py-6">
      {themes.length === 0 && !isLoading && (
        <Alert variant="warning" size="sm">
          You don&apos;t have any saved themes.
        </Alert>
      )}
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-5">
        {isLoading ? (
          <Fragment>
            {range(0, 10).map((i) => (
              <Skeleton className="h-28" key={`explore-skeleton-${i}`} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {themes.map((theme) => (
              <ThemeLink theme={theme} key={theme.id} />
            ))}
          </Fragment>
        )}
      </div>

      {hasNextPage && (
        <Button
          onClick={() => {
            void fetchNextPage();
          }}
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

const StarredThemes = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    api.theme.allStarredFromUser.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const themes = data?.pages.flatMap((page) => page.themes) ?? [];

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-2 py-6">
      {themes.length === 0 && !isLoading && (
        <Alert variant="warning" size="sm">
          You don&apos;t have any starred themes.
        </Alert>
      )}
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-5">
        {isLoading ? (
          <Fragment>
            {range(0, 10).map((i) => (
              <Skeleton className="h-28" key={`starred-skeleton-${i}`} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {themes.map((theme) => (
              <ThemeLink
                theme={{
                  ...theme,
                  stars: undefined,
                }}
                key={theme.id}
              />
            ))}
          </Fragment>
        )}
      </div>

      {hasNextPage && (
        <Button
          onClick={() => {
            void fetchNextPage();
          }}
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          Load more
        </Button>
      )}
    </div>
  );
};
