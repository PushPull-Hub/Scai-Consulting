import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Conversation } from 'src/app/models/Conversation.model';

@Component({
  selector: 'app-messenger-nav',
  templateUrl: './messenger-nav.component.html',
  styleUrls: ['./messenger-nav.component.scss'],
})
export class MessengerNavComponent implements OnInit {
  isMessageReaded: boolean = false;
  loggedUserId: string;
  conversations: Conversation[];
  @Output() eventClicked = new EventEmitter<Event>();

  constructor(
    private authService: AuthService,
    private userService: UserServices,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.conversations = this.messageService.getUserConversations();
    this.loggedUserId = this.authService.getLoggedUserId();
  }

  getFriendUsername(conversationId: string): string {
    return this.messageService.getTheFriend(conversationId).username;
  }

  onClick(conversation): void {
    this.eventClicked.emit(conversation);
    if (conversation.messages.length > 0) {
      // this.messageService.updateMessage(conversation.id, conversation.messages.slice(-1)[0].id, "is_readed", true)
    }
  }
}
