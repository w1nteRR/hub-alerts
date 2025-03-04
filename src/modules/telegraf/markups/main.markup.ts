import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

export class MainMarkup {
  public startupMarkupButtons() {
    return Markup.inlineKeyboard([
      Markup.button.callback('Start App', 'callback'),
    ]);
  }
}
