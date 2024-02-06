"use client";

import { useState } from "react";
import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import { Alert } from "@/client/components/ui/alert";
import { Button } from "@/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { Input } from "@/client/components/ui/input";
import { Switch } from "@/client/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { useActiveTheme, useThemeConfig } from "@/client/lib/use-theme-config";
import { routes } from "@/shared/routes";
import { SaveThemeSchema } from "@/shared/save-theme-schema";
import { type Theme } from "@/shared/theme-config";
import { api } from "@/trpc/react";

import { useIsMobile, useZodForm } from "@jlns/hooks";
import colorNameList from "color-name-list";
import { Colord } from "colord";
import nearestColor from "nearest-color";
import { useSession } from "next-auth/react";
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const Save = () => {
  const [open, setOpen] = useState(false);

  const sesh = useSession();

  const isMobile = useIsMobile();

  if (!sesh.data) {
    return (
      <MenuButton asChild>
        <Link href={routes.signin}>
          <Icons.Save className="size-4 flex-shrink-0" />
          <span className="sr-only">Save</span>
        </Link>
      </MenuButton>
    );
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <MenuButton>
            <Icons.Save className="size-4 flex-shrink-0" />
            <span className="sr-only">Save</span>
          </MenuButton>
        </DrawerTrigger>
        <DrawerContent>
          <RemoveScroll className="max-h-[80svh] overflow-auto p-4 scrollbar-thin">
            <DrawerHeader>
              <DrawerTitle>Save theme</DrawerTitle>
            </DrawerHeader>
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <MenuButton>
              <Icons.Save className="size-4 flex-shrink-0" />
              <span className="sr-only">Save</span>
            </MenuButton>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>Save theme</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save theme</DialogTitle>
        </DialogHeader>

        <Content setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

const colors: Record<string, string> = colorNameList.reduce(
  (o, { name, hex }) => ({
    ...o,
    [name]: hex,
  }),
  {},
);

const getNearestedColor = nearestColor.from(colors);

const createDefaultName = (theme: Theme | null) => {
  if (!theme) return "";

  const primary = new Colord({
    h: theme.primary.h,
    s: theme.primary.s,
    l: theme.primary.l,
  }).toHex();

  const primaryNearestColor = getNearestedColor(primary)?.name ?? "";

  const dicts = [[primaryNearestColor]];

  Math.random() > 0.5 ? dicts.push(animals) : dicts.unshift(adjectives);

  return uniqueNamesGenerator({
    separator: " ",
    length: 2,
    style: "capital",
    dictionaries: dicts,
  });
};

const Content = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
  const config = useThemeConfig();
  const activeTheme = useActiveTheme();

  const form = useZodForm({
    schema: SaveThemeSchema,
    defaultValues: {
      name: createDefaultName(activeTheme),
      isPublic: true,
    },
  });

  const { mutate, isLoading } = api.theme.save.useMutation({
    onSuccess: ({ id }) => {
      toast.success("Theme saved");

      window.location.href = routes.theme(id);
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          id={form.formId}
          onSubmit={form.handleSubmit((data) => {
            mutate({
              ...data,
              config: config,
            });
          })}
          className="flex flex-col gap-4"
        >
          <Alert variant="info" size="sm">
            This will save the current theme as new theme.
          </Alert>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Share with Community</FormLabel>
                  <FormDescription>
                    This will make it available to other users.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                form.reset();
                setOpen?.(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" isLoading={isLoading} form={form.formId}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
