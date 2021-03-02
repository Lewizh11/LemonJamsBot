import {Composer} from 'telegraf'
import {addToQueue} from '../tgcalls'

export const mainCallback = Composer.on('callback_query', async ctx => {
  
  const getAdms = await ctx.getChatAdministrators()
  const isAdm = getAdms.find(adm => adm.user.id === ctx.from?.id)

  if (ctx.chat?.type != 'supergroup') {
    await ctx.reply('Bot só é funcional em grupo');
    return
  }

  if (isAdm && 'data' in ctx.callbackQuery) {
    const {data} = ctx.callbackQuery
    const index = await addToQueue(ctx.chat, `https://www.youtube.com/watch?v=${data}`);

    ctx.answerCbQuery(index === 0 ? 'Tocando música...' : `Posição na lista: ${index}`);
    ctx.deleteMessage();

  } else {
    ctx.answerCbQuery('Você não é um adm!');
  }

})
