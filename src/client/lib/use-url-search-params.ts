import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return {
    searchParams,
    setSearchParam: (key: string, value?: string) => {
      const urlParams = new URLSearchParams(Array.from(searchParams.entries()));

      value ? urlParams.set(key, value) : urlParams.delete(key);

      const search = urlParams.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
  };
};
