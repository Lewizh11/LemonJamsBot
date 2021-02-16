import {bot} from '../bot';

import { playHandler } from './play';
import { queueHandler } from './queue';
import { pauseHandler } from './pause';
import { skipHandler } from './skip';
import {playByNameHandler} from './palyByName';
import {mainCallback} from '../callbacks/main';
import { playByUrlHandler } from './playByUrl'

export const initHandlers = (): void => {

  bot.use(playHandler);
  bot.use(queueHandler);
  bot.use(pauseHandler);
  bot.use(skipHandler);
  bot.use(playByNameHandler);
  bot.use(mainCallback);
  bot.use(playByUrlHandler);

};
