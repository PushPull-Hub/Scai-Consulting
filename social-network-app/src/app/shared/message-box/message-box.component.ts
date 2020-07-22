import { Component, OnInit, Input } from '@angular/core';

import { Conversation } from 'src/app/models/Conversation.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  @Input() conversation: Conversation;
  clicked: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  showConversation() {
    this.clicked = !this.clicked;
  }
  hideMessageBox() {
    // this.messageIconClicked = false;
    console.log('cancel button clicked ');
  }
}
