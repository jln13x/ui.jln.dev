import Script from "next/script";

export const Umami = () => {
  if (process.env.NODE_ENV === "development") return null;

  return (
    <Script
      async
      data-website-id="dfa86d8e-b2dd-4025-a09f-982fca6e0ef9"
      src="/u/script.js"
    />
  );
};
