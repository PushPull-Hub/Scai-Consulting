import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  urlParam: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.urlParam = `${this.authService.getLoggedUser().username}/${
      this.authService.getLoggedUser().id
    }`;
  }

  logOut = () => this.authService.logOut();
}
