import { Spinner } from "@/client/components/ui/spinner";

const Loading = () => {
  return (
    <div className="container grid min-h-screen place-items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
