import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
  loading: boolean;
  authenticatedUser: User;

  navIconClicked: boolean;
  suggestionIconClicked: boolean;
  createPostButtonClicked: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.createPostButtonClicked = false;
    this.navIconClicked = false;
    this.getAuthenticatedUser();
  }

  private getAuthenticatedUser() {
    this.loading = true;
    this.authService.getAuthenticatedUser().then((user: User) => {
      this.authenticatedUser = user;
      this.loading = false;
    });
  }

  openAndCloseNavTab() {
    this.navIconClicked = !this.navIconClicked;
    this.suggestionIconClicked = false;
    this.createPostButtonClicked = false;
  }

  openAndCloseSuggestionsTab() {
    this.suggestionIconClicked = !this.suggestionIconClicked;
    this.createPostButtonClicked = false;
    this.navIconClicked = false;
  }
}
