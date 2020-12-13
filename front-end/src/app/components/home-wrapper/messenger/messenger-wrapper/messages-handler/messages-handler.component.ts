import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/models/Message.model';
import { ChatDTO } from 'src/app/models/ChatDTO.model';
import { MessageDTO } from 'src/app/models/MessageDTO.model';

@Component({
  selector: 'app-messages-handler',
  templateUrl: './messages-handler.component.html',
  styleUrls: ['./messages-handler.component.scss'],
})
export class MessagesHandlerComponent implements OnInit, OnChanges {
  male_avatar_photo_url: string;
  messages: Message[];
  doIhaveMessages: boolean;

  @Input() chat: ChatDTO;
  text: string;

  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.doIhaveMessages = true;
    this.messages = [];
    this.loadMessages();
  }

  private loadMessages() {
    this.messageService
      .getMessagesByConversationId(this.chat.id)
      .toPromise()
      .then((result: Message[]) => {
        if (result) {
          this.doIhaveMessages = true;
          this.messages = result;
        } else {
          this.doIhaveMessages = false;
        }
      });
  }

  sendMessage() {
    if (this.text && this.text.trim() !== '') {
      let myMessage = new MessageDTO();
      myMessage.conversionId = this.chat.id;
      myMessage.receiverId = this.chat.secondUser.id;
      myMessage.text = this.text;
      this.messageService
        .sendMessage(myMessage)
        .toPromise()
        .then((result: Message) => {
          if (result) {
            this.chat.lastMessage = result;
            this.chat.isLastMessageSeen = 0;
            this.messages.push(result);
            this.doIhaveMessages = true;
            this.text = '';
          } else {
            console.log('check conditions ');
          }
        })
        .catch((err) => console.log(err));
    } else
      console.log(
        'messaggio vuoto, " message will pop up as a notification to the user " '
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chat.lastMessage) {
      this.loadMessages();
    } else {
      this.messages = [];
      this.doIhaveMessages = false;
    }
  }
}
