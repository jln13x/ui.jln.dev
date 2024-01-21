import { cn } from "@/client/lib/cn";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex size-12 items-center gap-2 stroke-black dark:stroke-white",
        className,
      )}
    >
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M36.213 36.7732C36.933 38.5866 37.333 40.5866 37.333 42.6666C37.333 47.3866 35.2797 51.6532 31.9997 54.5599C29.0805 57.2108 25.2762 58.6755 21.333 58.6666C12.5063 58.6666 5.33301 51.4932 5.33301 42.6666C5.33301 35.3066 10.3463 29.0666 17.1197 27.2266"
          strokeWidth="3.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M46.88 27.2266C53.6533 29.0666 58.6667 35.3066 58.6667 42.6666C58.6667 51.4932 51.4933 58.6666 42.6667 58.6666C38.7235 58.6755 34.9192 57.2108 32 54.5599"
          strokeWidth="3.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 21.3333C16 25.5767 17.6857 29.6464 20.6863 32.647C23.6869 35.6475 27.7565 37.3333 32 37.3333C36.2435 37.3333 40.3131 35.6475 43.3137 32.647C46.3143 29.6464 48 25.5767 48 21.3333C48 17.0898 46.3143 13.0201 43.3137 10.0195C40.3131 7.01896 36.2435 5.33325 32 5.33325C27.7565 5.33325 23.6869 7.01896 20.6863 10.0195C17.6857 13.0201 16 17.0898 16 21.3333Z"
          strokeWidth="3.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
