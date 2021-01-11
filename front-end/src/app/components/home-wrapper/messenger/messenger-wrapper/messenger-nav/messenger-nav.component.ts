import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { ChatDTO } from 'src/app/models/ChatDTO.model';
import { environment } from 'src/environments/environment';
import { ImagesService } from 'src/app/services/images.service';
import { Gender } from 'src/app/models/Gender.model';

@Component({
  selector: 'app-messenger-nav',
  templateUrl: './messenger-nav.component.html',
  styleUrls: ['./messenger-nav.component.scss'],
})
export class MessengerNavComponent implements OnInit {
  loading: boolean;

  profile_picture_url: string;
  male_avatar_photo_url: string;
  female_avatar_photo_url: string;

  myChats: ChatDTO[];
  Female;

  @Output() eventClicked = new EventEmitter<ChatDTO>();

  constructor(
    private messageService: MessagesService,
    private imageService: ImagesService
  ) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.female_avatar_photo_url = environment.female_avatr_photo_url;
    this.Female = Gender[1];
    this._loadChats();
    this._getProfilePicture();
  }

  private _loadChats() {
    this.loading = true;
    this.messageService
      .getMyChats()
      .toPromise()
      .then((response) => {
        this.myChats = response;
        this.loading = false;
      });
  }

  private _getProfilePicture() {
    this.imageService
      .getAuthenticatedUserProfilePicture()
      .then((url: string) => {
        this.profile_picture_url = url;
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
