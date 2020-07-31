import { Component, OnInit, Input } from '@angular/core';
import { Conversation } from 'src/app/models/Conversation.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/Message.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-messages-handler',
  templateUrl: './messages-handler.component.html',
  styleUrls: ['./messages-handler.component.scss'],
})
export class MessagesHandlerComponent implements OnInit {
  @Input() conversation: Conversation;
  loggedUserId: string;
  text: string;
  constructor(
    private authService: AuthService,
    private userService: UserServices,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.loggedUserId = this.authService.getLoggedUserId();
    console.log(this.conversation);
  }

  getFriendUsername(conversationId: string): string {
    return this.messageService.getTheFriend(conversationId).username;
  }

  getFriendId(id: string): string {
    return this.messageService.getTheFriendId(id);
  }
  sendMessage(reciever: string, text: string) {
    if (text !== '') {
      this.messageService.sendMessage(reciever, text);
      this.conversation = this.messageService.getConversation(reciever);
      this.text = '';
    } else {
      console.log('emptry input');
    }
  }
}
