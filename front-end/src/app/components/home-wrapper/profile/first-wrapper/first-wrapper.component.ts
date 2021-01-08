import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-first-wrapper',
  templateUrl: './first-wrapper.component.html',
  styleUrls: ['./first-wrapper.component.scss'],
})
export class FirstWrapperComponent implements OnInit {
  authenticatedUserProfilePicture: string;

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this._getAuthenticatedUserProfilePicture();
  }

  private _getAuthenticatedUserProfilePicture(): void {
    this.imagesService
      .getAuthenticatedUserProfilePicture()
      .then((pictureUrl) => {
        this.authenticatedUserProfilePicture = pictureUrl;
      });
  }
}
