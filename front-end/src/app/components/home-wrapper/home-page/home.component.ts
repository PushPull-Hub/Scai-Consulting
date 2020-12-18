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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loading = true;

    this.authService.getAuthenticatedUser().then((user: User) => {
      this.authenticatedUser = user;
      this.loading = false;
    });
  }
}
