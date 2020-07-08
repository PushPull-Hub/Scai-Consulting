import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserServices
  ) {}
  loggedUserId = this.userService.loggedUserId;
  loggedUserName = this.userService.loggedUserName;
  urlParam = `${this.loggedUserName}/${this.loggedUserId}`;
  ngOnInit(): void {}
  logOut = () => this.authService.logOut();
}
