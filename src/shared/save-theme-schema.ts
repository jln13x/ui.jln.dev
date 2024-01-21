import { NonEmptyString } from "@jlns/zod";
import { z } from "zod";

export const SaveThemeSchema = z.object({
  name: NonEmptyString().max(50, {
    message: "Too long",
  }),
  isPublic: z.boolean(),
});
