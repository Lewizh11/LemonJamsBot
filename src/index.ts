import { bot } from './bot';
import { initHandlers } from './handlers';

(async () => {
	initHandlers();
	bot.catch(() => console.log('Mim derrubaram ali oh'))
	await bot.launch();
  console.log(`@${bot.botInfo?.username} online...`);
})();
