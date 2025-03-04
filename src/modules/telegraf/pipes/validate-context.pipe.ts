import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Context } from 'telegraf';

@Injectable()
export class ValidateContextPipe implements PipeTransform {
  transform(value: Context): Context {
    if (!value?.from) {
      throw new BadRequestException(
        'Invalid Telegram context: ctx.from is missing',
      );
    }
    return value;
  }
}
