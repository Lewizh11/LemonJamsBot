import { Composer } from "telegraf";
import { getQueue } from "../tgcalls";

export const queueHandler = Composer.command("musicas", async (ctx) => {
  const { chat } = ctx.message;

  if (chat.type !== "supergroup") {
    return;
  }

  const isAdm = await ctx.getChatAdministrators();
  const found = isAdm.find(adm => adm.user.id === ctx.from?.id);

  if (found) {
    const queue = getQueue(chat.id);
    const message =
      queue && queue.length > 0
        ? queue.map((url, index) => `${index + 1}. ${url}`).join("\n")
        : "Lista vázia.";

    ctx.reply(message);
  } else {
		await ctx.reply('Somente adms podem usar este bot!')
	}
});
