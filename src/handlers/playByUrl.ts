import { Composer } from 'telegraf'
import { addToQueue } from '../tgcalls';

function isYoutube (url: string): boolean {
  const rex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  return (url.match(rex)) ? true : false
}


export const playByUrlHandler = Composer.on('text', async ctx => {
	const { chat } = ctx.message;
  
  if (chat.type !== 'supergroup') {
		await ctx.reply('Sou funcional apenas em grupo.');
    return;
  }
  const isAdm = await ctx.getChatAdministrators();
  const found = await isAdm.find(adm => adm.user.id === ctx.from?.id);

  if (isYoutube(ctx.message.text) && found) {
		
		const index = await addToQueue(chat, ctx.message.text);
		
		await ctx.reply(index === 0 ? 'Música tocando....' : `Posição ${index}.`);
  
	}
    
});
