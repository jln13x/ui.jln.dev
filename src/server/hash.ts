import crypto from "crypto";

export const hash = (value: string) => {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
};
