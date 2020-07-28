import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger-nav',
  templateUrl: './messenger-nav.component.html',
  styleUrls: ['./messenger-nav.component.scss'],
})
export class MessengerNavComponent implements OnInit {
  isMessageReaded: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
