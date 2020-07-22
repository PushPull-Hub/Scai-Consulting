import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  clicked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showConversation() {
    this.clicked = !this.clicked;
  }
  hideConversation() {
    this.clicked = false;
  }
}
