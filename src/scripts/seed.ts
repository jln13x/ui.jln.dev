import { db } from "@/server/db";
import { themes } from "@/server/db/schema";
import { createThemeConfig } from "@/shared/create-theme-config";

import { intro, select, text } from "@clack/prompts";
import { faker } from "@faker-js/faker";
import { capitalize } from "@jlns/utils";
import { eq } from "drizzle-orm";
import pMap from "p-map";

intro(`Seed`);

const createThemeName = () => {
  const names = [faker.word.noun(), faker.word.adjective()];

  return capitalize(faker.helpers.arrayElement(names));
};

const value = (await select({
  message: "What do you want to do?",
  options: [
    {
      label: "Seed themes",
      value: "themes",
    },
    {
      label: "Delete themes",
      value: "delete",
    },
  ],
})) as "themes" | "delete";

if (value === "themes") {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await void 0;

  const count = await text({
    message: "How many themes do you want to seed?",
    defaultValue: "10",
  });

  await pMap(Array.from({ length: Number(count) }), async () => {
    const config = createThemeConfig();
    await db.insert(themes).values({
      name: createThemeName(),
      userId: "system",
      isPublic: true,
      config,
    });
  });
}

if (value === "delete") {
  await db.delete(themes).where(eq(themes.userId, "system"));
}
