import Script from "next/script";

export const Umami = () => {
  if (process.env.NODE_ENV === "development") return null;

  return (
    <Script
      async
      data-website-id="ef03c35e-3c54-4306-bafd-53f208b3ad8e"
      src="/u/script.js"
    />
  );
};
