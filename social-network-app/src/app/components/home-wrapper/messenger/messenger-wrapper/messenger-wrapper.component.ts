import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger-wrapper',
  templateUrl: './messenger-wrapper.component.html',
  styleUrls: ['./messenger-wrapper.component.scss'],
})
export class MessengerWrapperComponent implements OnInit {
  public clickedEvent: Event;
  constructor() {}

  ngOnInit(): void {}

  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }
}
