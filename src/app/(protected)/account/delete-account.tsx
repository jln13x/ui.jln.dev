"use client";

import { useState } from "react";

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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import { Form, FormControl, FormField } from "@/client/components/ui/form";
import { Input } from "@/client/components/ui/input";
import { useAuth } from "@/client/lib/use-auth";
import { api } from "@/trpc/react";

import { useZodForm } from "@jlns/hooks";
import { toast } from "sonner";
import { z } from "zod";

export const DeleteAccount = () => {
  const ctx = api.useUtils();
  const { signOut } = useAuth();

  const { mutate, isPending: isLoading } = api.user.delete.useMutation({
    onSuccess: () => {
      void ctx.invalidate();
      void signOut();
    },
    onError: () => {
      toast.error(
        "Failed to delete account. Please contact support if this issue persists.",
      );
    },
  });

  const form = useZodForm({
    mode: "onChange",
    reValidateMode: "onChange",
    schema: z.object({
      deleteConfirmation: z.string().refine(
        (val) => {
          return val === "delete my account";
        },
        {
          message: "Please type 'delete my account' to confirm.",
        },
      ),
    }),
  });

  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          This will remove your account from the system. You will not be able to
          recover your account after this.
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end border-t pt-6">
        <AlertDialog
          open={open}
          onOpenChange={(openChange) => {
            setOpen(openChange);
            form.reset();
          }}
        >
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => {
                  mutate();
                })}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-4 py-6">
                  <p className="text-sm">
                    Please type{" "}
                    <span className="inline-block rounded-pill bg-muted px-2 py-0.5 font-mono font-medium">
                      delete my account
                    </span>{" "}
                    to confirm.
                  </p>
                  <FormField
                    control={form.control}
                    name="deleteConfirmation"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter confirmation here..."
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!form.formState.isValid}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
