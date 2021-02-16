import { Composer } from 'telegraf';
import { pause } from '../tgcalls';

export const pauseHandler = Composer.command(['pause', 'resume'], async ctx => {
	const { chat } = ctx.message;

	if (chat.type !== 'supergroup') {
		return;
	}

	const isAdm = await ctx.getChatAdministrators();
	const found = isAdm.find(adm => adm.user.id === ctx.from?.id);

	if (found) {
		const paused = await pause(chat.id);
		const message = paused === null ? "Nenhuma música tocando.." : paused ? 'Pausada.' : 'Continuando.';

		await ctx.reply(message);
	} else {
		await ctx.reply('Somente adms podem usar este bot');
	}
});
