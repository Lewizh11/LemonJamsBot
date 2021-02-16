import { Composer } from "telegraf";
import { skip } from "../tgcalls";

export const skipHandler = Composer.command("skip", async (ctx) => {
  const { chat } = ctx.message;

  if (chat.type !== "supergroup") {
    return;
  }

  const isAdm = await ctx.getChatAdministrators();
  const found = isAdm.find(adm => adm.user.id === ctx.from?.id);

  if (found) {
    const skipped = skip(chat.id);
    ctx.reply(skipped ? "Pulada." : "Nenhuma música tocando.");
  } else {
    ctx.reply("Somente adms podem usar este bot");
  }
});
