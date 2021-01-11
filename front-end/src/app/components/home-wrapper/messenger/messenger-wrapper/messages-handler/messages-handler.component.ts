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
import { ImagesService } from 'src/app/services/images.service';
import { Gender } from 'src/app/models/Gender.model';

@Component({
  selector: 'app-messages-handler',
  templateUrl: './messages-handler.component.html',
  styleUrls: ['./messages-handler.component.scss'],
})
export class MessagesHandlerComponent implements OnInit, OnChanges {
  @Input() chat: ChatDTO;

  authenticatedUserProfilePicture: string;
  male_avatar_photo_url: string;
  female_avatar_photo_url: string;

  friend_profile_picture: string;

  messages: Message[];
  doIhaveMessages: boolean;
  loading: boolean;

  text: string;
  Male;

  constructor(
    private messageService: MessagesService,
    private imageService: ImagesService
  ) {}

  ngOnInit(): void {
    this.friend_profile_picture = this._getFriendProfilePicture();
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.female_avatar_photo_url = environment.female_avatr_photo_url;
    this.messages = [];
    this.Male = Gender[0];
    this._getMyProfilePicture();
    this.loadMessages();
  }

  private loadMessages() {
    this.loading = true;
    this.doIhaveMessages = true;
    this.messageService
      .getMessagesByConversationId(this.chat.id)
      .toPromise()
      .then((result: Message[]) => {
        if (result) {
          this.doIhaveMessages = true;
          this.messages = result;
          this.loading = false;
        } else {
          this.doIhaveMessages = false;
          this.loading = false;
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

  moveConversationToTop(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chat.lastMessage) {
      this.loadMessages();
    } else {
      this.messages = [];
      this.doIhaveMessages = false;
    }
  }

  private _getFriendProfilePicture(): string {
    return this.imageService.getFriendProfilePictureUrl(this.chat.secondUser);
  }

  private _getMyProfilePicture() {
    this.imageService
      .getAuthenticatedUserProfilePicture()
      .then((url: string) => {
        this.authenticatedUserProfilePicture = url;
      });
  }
}
