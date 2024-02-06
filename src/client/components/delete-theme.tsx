"use client";

import * as Icons from "@/client/components/icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/client/components/ui/alert-dialog";
import { Button } from "@/client/components/ui/button";
import { type DatabaseTheme } from "@/server/db/schema";
import { api } from "@/trpc/react";

export const DeleteTheme = ({ theme }: { theme: DatabaseTheme }) => {
  const { mutate, isPending: isLoading } = api.theme.delete.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <span className="sr-only">Delete theme</span>
          <Icons.Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete theme</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this theme? This action cannot be
            undone.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              isLoading={isLoading}
              onClick={() => {
                mutate({
                  id: theme.id,
                });
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
