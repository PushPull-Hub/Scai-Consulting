import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  urlParam: string;
  authenticatedUser: User;
  profilePictureUrl: string = null;

  constructor(
    private authService: AuthService,
    private imageService: ImagesService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().then((user: User) => {
      this.authenticatedUser = user;
      this.urlParam = `${this.authenticatedUser.firstName}.${this.authenticatedUser.lastName}/${this.authenticatedUser.id}`;
      this.loadProfilePicture();
    });
  }

  logOut = () => {
    this.urlParam = null;
    this.authService.logOut();
  };

  private loadProfilePicture() {
    this.authenticatedUser.profilePictureUrl
      ? (this.profilePictureUrl = this.authenticatedUser.profilePictureUrl)
      : this.authenticatedUser.gender.toString() == 'male'
      ? (this.profilePictureUrl = environment.male_avatar_photo_url)
      : (this.profilePictureUrl = environment.female_avatr_photo_url);
  }
}
