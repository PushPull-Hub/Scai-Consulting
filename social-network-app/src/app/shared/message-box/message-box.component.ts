import { Component, OnInit, Input } from '@angular/core';

import { Conversation } from 'src/app/models/Conversation.model';
import { FriendsService } from 'src/app/services/friends.service';
import { MessagesService } from 'src/app/services/messages.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  @Input() conversation: Conversation;
  @Input() friendId: string;
  loggedUserId: string = this.authService.loggedUser.id;
  text: string;
  clicked: boolean = false;

  constructor(
    private friendsService: FriendsService,
    private messagesService: MessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  showConversation() {
    this.clicked = !this.clicked;
  }
  hideMessageBox() {
    // this.messageIconClicked = false;
    console.log('cancel button clicked ');
  }

  getFriendProperty = (id: string, property: string) => {
    return this.friendsService.getaFriendProperty(id, property);
  };

  sendMessage(sender: string, reciever: string, text: string) {
    this.messagesService.sendMessage(sender, reciever, text);
    this.text = '';
  }
}
