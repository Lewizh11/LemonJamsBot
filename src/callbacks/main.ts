import {Composer} from 'telegraf';
import {addToQueue} from '../tgcalls';

export const mainCallback = Composer.on('callback_query', async ctx => {
  const chatId = String(ctx.chat?.id); // ignore a gambiarra, é apenas para burlar a porra do "compilador"
  const isAdm = await ctx.tg.getChatAdministrators(chatId);
  const found = isAdm.find((adm: any) => adm.user.id === ctx.from?.id);

  if (ctx.chat?.type != 'supergroup') {
    await ctx.reply('Bot só é funcional em grupo');
    return;
  }

  if (found) {
    const index = await addToQueue(ctx.chat, `https://www.youtube.com/watch?v=${ctx.callbackQuery.data}`);

    ctx.answerCbQuery(index === 0 ? 'Tocando música...' : `Posição na lista: ${index}`);
    ctx.deleteMessage();

  } else {
    ctx.answerCbQuery('Você não é um adm!');
  }

})
