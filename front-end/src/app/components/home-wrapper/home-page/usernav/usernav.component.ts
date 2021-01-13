import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.scss'],
})
export class UsernavComponent implements OnInit {
  navIconClicked: boolean;
  constructor() {}

  ngOnInit(): void {
    this.navIconClicked = true;
  }

  openAndCloseTheTab() {
    this.navIconClicked = !this.navIconClicked;
  }
}
