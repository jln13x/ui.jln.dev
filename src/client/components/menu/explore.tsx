"use client";

import { Fragment } from "react";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import { ThemeButton, ThemeLink } from "@/client/components/theme-link";
import { Button } from "@/client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import { Label } from "@/client/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/client/components/ui/radio-group";
import { Skeleton } from "@/client/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";
import { shadcnThemes } from "@/client/lib/shadcn-themes";
import { api } from "@/trpc/react";

import { useIsMobile } from "@jlns/hooks";
import { atom, useAtom } from "jotai";
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
          <RemoveScroll className="max-h-[80svh] overflow-auto p-4 scrollbar-thin">
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
      <PopoverContent className="max-h-[50vh] w-screen max-w-screen-lg overflow-auto scrollbar-thin">
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
      <Tabs>
        <TabsList defaultValue="community">
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="shadcn">shadcn</TabsTrigger>
        </TabsList>
        <TabsContent value="community">
          <Themes />
        </TabsContent>
        <TabsContent value="shadcn">
          <ShadcnDefaultThemes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const sortOptions = [
  {
    label: "Latest",
    value: "createdAt",
  },
  {
    label: "Stars",
    value: "stars",
  },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

const sortAtom = atom<SortOption>("createdAt");

const Themes = () => {
  const [sortBy, setSortBy] = useAtom(sortAtom);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    api.theme.allPublic.useInfiniteQuery(
      {
        sortBy,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const themes = data?.pages.flatMap((page) => page.themes) ?? [];

  return (
    <div>
      {!isLoading && (
        <div className="flex items-center gap-2 rounded-lg border border-dotted p-4 py-2">
          <p className="text-sm font-bold">Sort by:</p>
          <RadioGroup
            defaultValue="comfortable"
            className="flex items-center gap-4"
            value={sortBy}
            onValueChange={(val) => {
              setSortBy(val as SortOption);
            }}
          >
            {sortOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option.value}>
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
      <div className="flex flex-col gap-4 px-2 py-6">
        <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-5">
          {isLoading ? (
            <Fragment>
              {range(0, 5).map((i) => (
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
    </div>
  );
};

const ShadcnDefaultThemes = () => {
  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-5">
        {shadcnThemes.map((theme) => (
          <ThemeButton
            config={theme.config}
            name={theme.name}
            key={theme.name}
          />
        ))}
      </div>
    </div>
  );
};
