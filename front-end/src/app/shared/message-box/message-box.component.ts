import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { MessagesService } from 'src/app/services/messages.service';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/Message.model';
import { ChatDTO } from 'src/app/models/ChatDTO.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { MessageDTO } from 'src/app/models/MessageDTO.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  @Input() friendProfile: MiniProfile;
  @Output() exit: EventEmitter<any> = new EventEmitter();

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  male_avatar_photo_url: string;

  loading: boolean;
  messages: Message[];
  isThereMessages: boolean;

  myId: number;
  text: string;

  chat: ChatDTO;

  clicked: boolean;

  constructor(
    private messagesService: MessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.messages = [];
    console.log(this.messages);
    this.clicked = true;
    this.loadConversation();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private loadConversation() {
    if (this.messages.length <= 0) {
      this.loading = true;
      setTimeout(() => {
        this.messagesService
          .getChatByUsersIds(this.friendProfile.id)
          .toPromise()
          .then(async (result: ChatDTO) => {
            console.log(result);

            if (result) {
              this.chat = result;
              await this.messagesService
                .getMessagesByConversationId(result.id)
                .toPromise()
                .then((result) => {
                  this.authService.getAuthenticatedUser().then((user) => {
                    this.myId = user.id;
                    this.chat.messages = [...result];
                    this.messages = [...result];
                  });
                });

              this.loading = false;
              this.isThereMessages = true;
            } else {
              this.isThereMessages = false;
              this.loading = false;
            }
          });
      }, 900);
    } else return null;
  }

  showConversation() {
    this.clicked = !this.clicked;
  }

  closeMessageBox() {
    console.log('clicked ');
    this.exit.emit('1');
  }

  sendMessage() {
    if (this.text && this.text.trim() !== '') {
      let myMessage = new MessageDTO();
      myMessage.receiverId = this.chat.secondUser.id;
      myMessage.text = this.text;
      this.messagesService
        .sendMessage(myMessage)
        .toPromise()
        .then((result: Message) => {
          if (result) {
            this.chat.lastMessage = result;
            this.chat.isLastMessageSeen = 0;
            this.messages.push(result);
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

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
