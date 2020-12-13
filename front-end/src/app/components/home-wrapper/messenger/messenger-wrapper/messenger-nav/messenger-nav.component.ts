import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { ChatDTO } from 'src/app/models/ChatDTO.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messenger-nav',
  templateUrl: './messenger-nav.component.html',
  styleUrls: ['./messenger-nav.component.scss'],
})
export class MessengerNavComponent implements OnInit {
  male_avatar_photo_url: string;
  loading: boolean;

  myChats: ChatDTO[];

  @Output() eventClicked = new EventEmitter<ChatDTO>();

  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.loading = true;
    this.messageService
      .getMyChats()
      .toPromise()
      .then((response) => {
        this.myChats = response;
        this.loading = false;
      });
  }

  onClick(chat: ChatDTO): void {
    if (
      chat.lastMessage &&
      chat.lastMessage.senderId == chat.secondUser.id &&
      chat.isLastMessageSeen == 0
    ) {
      this.messageService
        .setConversationLastMessageToSeen(chat.id)
        .toPromise()
        .then((result) => {
          if (result) {
            let indexOfChat = this.myChats.findIndex((x) => x.id == chat.id);
            this.myChats[indexOfChat].isLastMessageSeen = 1;
            console.log(this.myChats[indexOfChat].isLastMessageSeen);

            this.eventClicked.emit(chat);
          } else console.log('check the conditions ');
        });
    } else {
      this.eventClicked.emit(chat);
    }
  }
}
