import {Composer} from 'telegraf'
import searchVideo from '../utils/searchVideoByName'

export const playByNameHandler = Composer.command('search', async ctx => {
  const {chat} = ctx.message

  if (chat.type != 'supergroup') {
    await ctx.reply('Sou um bot que é funcional apenas em grupos!')
    return
  }

  const isAdm = await ctx.tg.getChatAdministrators(chat.id);
  const foundAdm = isAdm.find(adm => adm.user.id == ctx.from?.id)

  if (foundAdm) {
    const [commandEntity] = ctx.message.entities!
    const text = ctx.message.text.slice(commandEntity.length + 1)

    if (!text) {
      await ctx.reply('Você precisa especificar o título do vídeo!')
      return
    }

    const query = await searchVideo(text)
    const keyboard = query.map((i: any) => [{text: i.title, callback_data: i.videoId}])

    ctx.reply(`Aqui estão os resultados da busca:`, {reply_markup: {inline_keyboard: keyboard}})

  }
})
