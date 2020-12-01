import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  urlParam: string;
  authenticatedUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().then((user: User) => {
      this.authenticatedUser = user;
      this.urlParam = `${this.authenticatedUser.firstName}.${this.authenticatedUser.lastName}/${this.authenticatedUser.id}`;
    });
  }

  logOut = () => {
    this.urlParam = null;
    this.authService.logOut();
  };
}
