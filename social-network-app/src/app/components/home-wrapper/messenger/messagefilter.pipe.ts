import { Pipe, PipeTransform } from '@angular/core';
// import { Conversation } from 'src/app/models/Conversation.model';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Message } from 'src/app/models/Message.model';

@Pipe({
  name: 'messagefilter',
})
export class MessagefilterPipe implements PipeTransform {
  transform(messages: Message[], filter: string) {
    if (!messages || !filter) {
      return messages;
    }

    return messages.filter((message) => message.sender === filter);
  }
}
