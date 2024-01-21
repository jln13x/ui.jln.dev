import { ConnectedAccounts } from "@/app/(protected)/account/connected-accounts";
import { DeleteAccount } from "@/app/(protected)/account/delete-account";

const Page = () => {
  return (
    <div className="container flex flex-col gap-8 pt-24">
      <ConnectedAccounts />
      <DeleteAccount />
    </div>
  );
};

export default Page;
