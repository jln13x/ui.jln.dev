// Big shoutout to https://x.com/shadcn/ for creating this component or is the inspiration for this component

import { BadgeDemo } from "@/client/components/examples/badge";
import { ButtonsDemo } from "@/client/components/examples/buttons";
import { CommandDemo } from "@/client/components/examples/command";
import { Chat } from "@/client/components/examples/pages/cards/chat";
import { CookieSettings } from "@/client/components/examples/pages/cards/cookie-settings";
import { CreateAccount } from "@/client/components/examples/pages/cards/create-account";
import { CreateProject } from "@/client/components/examples/pages/cards/create-project";
import { DeleteAccount } from "@/client/components/examples/pages/cards/delete-account";
import { Invoices } from "@/client/components/examples/pages/cards/invoices";
import { Notifications } from "@/client/components/examples/pages/cards/notifications";
import { PaymentMethod } from "@/client/components/examples/pages/cards/payment-method";
import { ReportIssue } from "@/client/components/examples/pages/cards/report-issue";
import { ShareDocument } from "@/client/components/examples/pages/cards/share-document";
import { PopoverDemo } from "@/client/components/examples/popover";
import { TabsDemo } from "@/client/components/examples/tabs";
import { cn } from "@/client/lib/cn";

export const Cards = () => {
  return (
    <div>
      <div className="mx-auto flex max-w-screen-md flex-col gap-2 pb-8 text-center text-sm"></div>
      <div className="items-start gap-6 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-6">
          <DemoContainer>
            <Notifications />
          </DemoContainer>
          <DemoContainer>
            <ButtonsDemo />
          </DemoContainer>
          <DemoContainer>
            <CookieSettings />
          </DemoContainer>
          <DemoContainer>
            <DeleteAccount />
          </DemoContainer>
          <DemoContainer>
            <CreateAccount />
          </DemoContainer>
        </div>

        <div className="flex flex-col gap-6">
          <DemoContainer>
            <ShareDocument />
          </DemoContainer>
          <DemoContainer>
            <CommandDemo />
          </DemoContainer>
          <DemoContainer>
            <ReportIssue />
          </DemoContainer>
          <DemoContainer>
            <CreateProject />
          </DemoContainer>
          <DemoContainer className="py-12">
            <PopoverDemo />
          </DemoContainer>
        </div>
        <div className="flex flex-col gap-6">
          <DemoContainer>
            <Chat />
          </DemoContainer>
          <DemoContainer>
            <BadgeDemo />
          </DemoContainer>
          <DemoContainer>
            <TabsDemo />
          </DemoContainer>
          <DemoContainer>
            <PaymentMethod />
          </DemoContainer>
          <DemoContainer>
            <Invoices />
          </DemoContainer>
        </div>
      </div>
    </div>
  );
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className,
      )}
      {...props}
    />
  );
}
