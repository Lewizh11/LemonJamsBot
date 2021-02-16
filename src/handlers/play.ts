import { Composer } from 'telegraf';
import { addToQueue } from '../tgcalls';

export const playHandler = Composer.command('play', async ctx => {
	const { chat } = ctx.message;
  const isAdm = await ctx.getChatAdministrators();
  const found = await isAdm.find(adm => adm.user.id === ctx.from?.id);

  if (chat.type !== 'supergroup') {
		await ctx.reply('Sou um bot que funciona apenas em grupo');
    return;
  }

  if (found) {
		const [commandEntity] = ctx.message.entities!;
    const text = ctx.message.text.slice(commandEntity.length + 1);
		if (!text) {
      await ctx.reply('Você precisa especificiar o link do YouTube!.');
      return;
    }
		const index = await addToQueue(chat, text);
		
		await ctx.reply(index === 0 ? 'Música tocando....' : `Posição ${index}.`);
  
	} else {
		await ctx.reply('Somente adms podem usar este bot!')
		return;
	}
    
});
