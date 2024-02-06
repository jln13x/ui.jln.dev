import { useState } from "react";

import { Switch } from "@/client/components/customizable/switch";
import * as Icons from "@/client/components/icons";
import { Button } from "@/client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/client/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { type DatabaseTheme } from "@/server/db/schema";
import { SaveThemeSchema } from "@/shared/save-theme-schema";
import { api } from "@/trpc/react";

import { useIsMobile, useZodForm } from "@jlns/hooks";
import { toast } from "sonner";

export const Public = ({ theme }: { theme: DatabaseTheme }) => {
  const Icon = theme.isPublic ? Icons.Globe : Icons.Lock;
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Icon className="h-4 w-4 text-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Content theme={theme} onSuccess={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              <Icon className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>Change visibility</TooltipContent>
      </Tooltip>
      <PopoverContent side="bottom" align="end" className="w-auto max-w-lg p-0">
        <Content theme={theme} onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

const Content = ({
  theme,
  onSuccess,
}: {
  theme: DatabaseTheme;
  onSuccess: () => void;
}) => {
  const form = useZodForm({
    schema: SaveThemeSchema.pick({
      isPublic: true,
    }),
    defaultValues: {
      isPublic: theme.isPublic,
    },
  });

  const utils = api.useUtils();

  const { mutate, isPending: isLoading } =
    api.theme.changeVisiblity.useMutation({
      onSuccess: (_, { isPublic }) => {
        onSuccess();
        toast.success(`Theme is now ${isPublic ? "public" : "private"}.`);
        void utils.theme.byId.invalidate({ id: theme.id });
        void utils.theme.allPublic.invalidate();
      },
      onError: (error) => {
        if (error.data?.code === "TOO_MANY_REQUESTS") {
          toast.error("Too many requests, please try again later");
        }
      },
    });

  return (
    <div className="flex flex-col gap-2 px-4 py-6">
      <p className="text-lg font-semibold leading-none tracking-tight">
        Change visibility
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            mutate({
              themeId: theme.id,
              isPublic: data.isPublic,
            });
          })}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-6 rounded-lg border p-3 shadow-sm">
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
          <div>
            <Button isLoading={isLoading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
