import { env } from "@/env";

throw new Error("Uncomment to continue");

const webhookClient = {
  send: async (message: string) => {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
  },
};

export const discord = {
  webhook: webhookClient,
  format: {
    bold: (str: string) => "**" + str + "**",
    codeBlock: (str: string) => "```" + str + "```",
  },
};
