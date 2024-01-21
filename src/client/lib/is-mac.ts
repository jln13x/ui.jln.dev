export const isMac = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
};
