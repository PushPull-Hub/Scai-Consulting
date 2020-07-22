import { Component, OnInit, Input } from '@angular/core';

import { Conversation } from 'src/app/models/Conversation.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  @Input() conversation: Conversation;
  @Input() friendId: string;
  loggedUserId: string = this.friendsService.theLoggedUserId;
  clicked: boolean = false;

  constructor(private friendsService: FriendsService) {}

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
}
