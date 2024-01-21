export const TABLE_NAME = "shadcn_themes";

if (!TABLE_NAME) {
  throw new Error("Please set TABLE_NAME in app.config.ts");
}
