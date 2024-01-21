"use client";

import { Fragment } from "react";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import { ThemeLink } from "@/client/components/theme-link";
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
import { api } from "@/trpc/react";

import { useIsMobile } from "@jlns/hooks";
import { RemoveScroll } from "react-remove-scroll";
import { range } from "remeda";

export const Explore = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <MenuButton>
            <Icons.Globe className="size-4 lg:mr-2" />
            <span className="max-lg:sr-only">Explore</span>
          </MenuButton>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="scrollbar-thin max-h-[80svh] overflow-auto p-4">
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuButton>
          <Icons.Globe className="size-4 lg:mr-2" />
          <span className="max-lg:sr-only">Explore</span>
        </MenuButton>
      </PopoverTrigger>
      <PopoverContent className="scrollbar-thin max-h-[50vh] w-screen max-w-screen-lg overflow-auto">
        <Content />
      </PopoverContent>
    </Popover>
  );
};

const Content = () => {
  return (
    <div>
      <div className="flex flex-col gap-1.5 pb-4">
        <p className="text-lg font-semibold leading-none tracking-tight">
          Explore
        </p>
        <p className="text-sm text-muted-foreground">
          Find themes from other users that have been shared with the community.
        </p>
      </div>
      <Themes />
    </div>
  );
};

const Themes = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    api.theme.allPublic.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const themes = data?.pages.flatMap((page) => page.themes) ?? [];

  return (
    <div className="flex flex-col gap-4 px-2 py-6">
      <div className="grid w-full  grid-cols-2 gap-6 lg:grid-cols-5">
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
