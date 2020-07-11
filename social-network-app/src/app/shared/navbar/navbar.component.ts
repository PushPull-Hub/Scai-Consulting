import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedUserId = this.authService.loggedUserId;
  theLoggedUserName = this.authService.theLoggedUserName;
  urlParam = `${this.theLoggedUserName}/${this.loggedUserId}`;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
  logOut = () => this.authService.logOut();
}
