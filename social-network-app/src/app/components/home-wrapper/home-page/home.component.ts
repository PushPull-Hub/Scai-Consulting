import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  logOut = () => {
    this.auth.logOut();
  };
}
