import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-friends',
  templateUrl: './active-friends.component.html',
  styleUrls: ['./active-friends.component.scss'],
})
export class ActiveFriendsComponent implements OnInit {
  clicked: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  showActiveFriends = () => (this.clicked = !this.clicked);
}
