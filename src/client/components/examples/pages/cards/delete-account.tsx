// Big shoutout to https://x.com/shadcn/ for creating this component or is the inspiration for this component

"use client";

import { useEffect } from "react";

import { Alert } from "@/client/components/customizable/alert";
import { Badge } from "@/client/components/customizable/badge";
import { Button } from "@/client/components/customizable/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/client/components/customizable/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/customizable/form";
import { Input } from "@/client/components/customizable/input";

import { useZodForm } from "@jlns/hooks";
import { z } from "zod";

export const DeleteAccount = () => {
  const form = useZodForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      deleteConfirmation: "delete my",
    },
    schema: z.object({
      deleteConfirmation: z.string().refine(
        (val) => {
          return val === "delete my account";
        },
        {
          message: "Invalid confirmation",
        },
      ),
    }),
  });

  const { trigger } = form;

  // Trigger validation on mount so we can showcase the error message
  useEffect(() => {
    void trigger();
  }, [trigger]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          This will remove your account from the system.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert variant="destructive">
          <p className="text-sm font-medium">
            Please be absolutely sure you want to delete your account. You will
            not be able to recover your account after this.
          </p>
        </Alert>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              return;
            })}
            className="flex flex-col gap-8 py-4"
          >
            <FormField
              control={form.control}
              name="deleteConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Please type{" "}
                    <Badge variant="outline" className="font-mono">
                      delete my account
                    </Badge>{" "}
                    to confirm.
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter confirmation here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset({
                    deleteConfirmation: "",
                  });
                }}
              >
                Cancel
              </Button>

              <Button type="submit" variant="destructive">
                Delete Account
              </Button>
            </div>
            <p className="text-right text-xs text-muted-foreground">
              Don&apos;t worry, nothing will happen if you click the button
              above.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
